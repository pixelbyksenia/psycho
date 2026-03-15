import fs from "fs";
import path from "path";
import crypto from "crypto";
import { Resend } from "resend";

export const runtime = "nodejs"; // ensure Node runtime so fs is available

type WayForPayBody = {
  merchantSignature?: string;
  merchantAccount?: string;
  orderReference?: string;
  amount?: string | number;
  currency?: string;
  transactionStatus?: string;
  clientEmail?: string;
  client_email?: string;
  email?: string;
  [key: string]: any;
};

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const WFP_SECRET = process.env.WFP_SECRET || "";

if (!RESEND_API_KEY) {
  console.warn(
    "RESEND_API_KEY is not set. Emails will fail until it's provided in env."
  );
}

if (!WFP_SECRET) {
  console.warn(
    "WFP_SECRET is not set. Webhook signature verification will fail."
  );
}

const resend = new Resend(RESEND_API_KEY || "");

function hmacMd5(secret: string, payload: string) {
  return crypto.createHmac("md5", secret).update(payload).digest("hex");
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as WayForPayBody;

    console.log("/api/payment-webhook received:", body);

    const incomingSignature = body.merchantSignature || body.merchant_signature;
    if (!incomingSignature) {
      console.error("No merchantSignature in callback");
      return new Response(
        JSON.stringify({ success: false, reason: "no_signature" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Recreate expected signature. The exact fields used must match the
    // signing algorithm used when creating the payment. We use a compact
    // canonical string and HMAC MD5 (per project requirement).
    const signaturePayload = [
      body.merchantAccount || "",
      body.orderReference || "",
      String(body.amount || ""),
      body.currency || "",
      body.transactionStatus || "",
    ].join(";");

    const expectedSignature = hmacMd5(WFP_SECRET, signaturePayload);

    if (expectedSignature !== incomingSignature) {
      console.error("Invalid merchantSignature", {
        expectedSignature,
        incomingSignature,
      });
      return new Response(
        JSON.stringify({ success: false, reason: "invalid_signature" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Only proceed on Approved
    if (body.transactionStatus !== "Approved") {
      console.log(
        "Payment not approved, ignoring. transactionStatus=",
        body.transactionStatus
      );
      return new Response(
        JSON.stringify({ success: false, reason: "not_approved" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Extract customer email from common fields
    const customerEmail =
      body.clientEmail ||
      body.client_email ||
      body.email ||
      (body.client && body.client.email) ||
      "";

    if (!customerEmail) {
      console.error("No customer email found in webhook payload.");
      return new Response(
        JSON.stringify({ success: false, reason: "no_email" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY missing — cannot send email.");
      return new Response(
        JSON.stringify({ success: false, reason: "resend_api_key_missing" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const from = "noreply@domain.com";
    const to = customerEmail;
    const subject = "Your guide";

    // Build a download link for the user (orderReference included)
    const origin =
      req.headers.get("x-forwarded-host") ||
      req.headers.get("host") ||
      "localhost:3000";
    const proto = req.headers.get("x-forwarded-proto") || "https";
    const base = origin.includes("localhost")
      ? `http://${origin}`
      : `${proto}://${origin}`;
    const downloadUrl = `${base}/api/download?orderReference=${encodeURIComponent(body.orderReference || "")}`;

    const html = `
      <div style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; line-height:1.4;">
        <h2>Thank you for your purchase</h2>
        <p>Your payment was successful. You can download your guide here:</p>
        <p><a href="${downloadUrl}">Download guide</a></p>
        <p>If you have any questions, reply to this email.</p>
      </div>
    `;

    await resend.emails.send({
      from,
      to,
      subject,
      html,
    } as any);

    console.log(`Sent download link to ${to}`);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("/api/payment-webhook error:", err);
    return new Response(
      JSON.stringify({ success: false, error: "internal_error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

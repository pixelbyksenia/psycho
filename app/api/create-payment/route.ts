import { NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

type CreatePaymentReq = {
  name?: string;
  email?: string;
};

function getOrigin(req: Request) {
  const host =
    req.headers.get("x-forwarded-host") ||
    req.headers.get("host") ||
    "localhost:3000";
  const proto = req.headers.get("x-forwarded-proto") || "https";
  if (host.includes("localhost")) return `http://${host}`;
  return `${proto}://${host}`;
}

function hmacMd5(secret: string, payload: string) {
  return crypto.createHmac("md5", secret).update(payload).digest("hex");
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as CreatePaymentReq;

    const name = body.name || "Customer";
    const email = body.email;

    if (!email) {
      return NextResponse.json({ error: "missing_email" }, { status: 400 });
    }

    const origin = getOrigin(req);

    const merchantAccount = process.env.WFP_MERCHANT || "";
    const secret = process.env.WFP_SECRET || "";

    if (!merchantAccount || !secret) {
      return NextResponse.json({ error: "missing_config" }, { status: 500 });
    }

    const orderReference = `order_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    const orderDate = Math.floor(Date.now() / 1000);

    // Payment details — adjust amount/currency/product as needed
    const amount = "9.99";
    const currency = "USD";
    const productName = "Guide PDF";
    const productPrice = "9.99";
    const productCount = "1";

    const serviceUrl = `${origin}/api/payment-webhook`;
    const returnUrl = `${origin}/payment/success`;

    // Build the canonical string for signature. This is intentionally
    // simple HMAC MD5 over a joined set of required fields. Match this
    // logic in the webhook verification.
    const signatureFields = [
      merchantAccount,
      process.env.NEXT_PUBLIC_MERCHANT_DOMAIN || merchantAccount,
      orderReference,
      String(orderDate),
      amount,
      currency,
      productName,
      productCount,
      productPrice,
    ];

    const signaturePayload = signatureFields.join(";");
    const merchantSignature = hmacMd5(secret, signaturePayload);

    const paymentData = {
      merchantAccount,
      merchantDomainName:
        process.env.NEXT_PUBLIC_MERCHANT_DOMAIN || merchantAccount,
      orderReference,
      orderDate,
      amount,
      currency,
      productName: [productName],
      productPrice: [productPrice],
      productCount: [productCount],
      clientFirstName: name,
      clientLastName: "",
      clientEmail: email,
      serviceUrl,
      returnUrl,
      merchantSignature,
    } as const;

    return NextResponse.json({ paymentData });
  } catch (err) {
    console.error("/api/create-payment error:", err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}

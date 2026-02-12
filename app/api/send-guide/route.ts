import { Resend } from "resend";
import fs from "fs";
import path from "path";

// Серверный API-роут для отправки гайда покупателю и уведомления владельцу через Resend
// Ожидает POST JSON с полями: client_email | email, orderReference, amount
// Env:
// - TEXTRESEND_API_KEY  — ключ Resend (обязательно)
// - RESEND_FROM_EMAIL   — (опционально) адрес отправителя
// - OWNER_EMAIL         — (опционально) email владельца для уведомлений

const API_KEY = process.env.TEXTRESEND_API_KEY;
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "no-reply@psiholoboginia.com";
const OWNER_EMAIL = process.env.OWNER_EMAIL || "owner@example.com";

if (!API_KEY) {
  console.warn(
    "TEXTRESEND_API_KEY is not set. Email sending will fail until you add it to .env.local"
  );
}

const resend = new Resend(API_KEY || "");

type ReqBody = {
  client_email?: string;
  email?: string;
  orderReference?: string;
  amount?: string | number;
};

export async function POST(req: Request) {
  try {
    if (!API_KEY) {
      return new Response(
        JSON.stringify({
          error: "Resend API key is not configured on the server",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const body: ReqBody = await req.json();
    const purchaser = (body.client_email || body.email || "").toString().trim();

    if (!purchaser) {
      return new Response(
        JSON.stringify({ error: "Missing purchaser email" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Путь к PDF в public
    const pdfPath = path.join(process.cwd(), "public", "guid.pdf");
    if (!fs.existsSync(pdfPath)) {
      console.error("PDF not found at", pdfPath);
      return new Response(
        JSON.stringify({ error: "Guide PDF not found on server" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const pdfBuffer = await fs.promises.readFile(pdfPath);
    const pdfBase64 = pdfBuffer.toString("base64");

    // Отправляем письмо покупателю с вложением
    await resend.emails.send({
      from: FROM_EMAIL,
      to: purchaser,
      subject: "Спасибо за покупку — вот ваш гайд",
      // Небольшое HTML-тело. Можно заменить на react-представление при желании.
      html: `
        <div style="font-family: Arial, sans-serif; color: #111">
          <h2>Спасибо за покупку!</h2>
          <p>Пожалуйста, найдите ваш гайд во вложении. Если возникнут проблемы — ответьте на это письмо.</p>
          <p>Также вы можете скачать гайд напрямую: <a href="${process.env.NEXT_PUBLIC_SITE_URL || ""}/guid.pdf">скачать гайд</a></p>
        </div>
      `,
      attachments: [
        {
          filename: "guid.pdf",
          data: pdfBase64,
          type: "application/pdf",
        } as any,
      ],
    });

    // Отправляем уведомление владельцу
    const ownerHtml = `
      <div style="font-family: Arial, sans-serif; color: #111">
        <h3>Новая покупка</h3>
        <p><strong>Email покупателя:</strong> ${purchaser}</p>
        <p><strong>Сумма:</strong> ${body.amount ?? "-"}</p>
        <p><strong>Номер заказа:</strong> ${body.orderReference ?? "-"}</p>
      </div>
    `;

    await resend.emails.send({
      from: FROM_EMAIL,
      to: OWNER_EMAIL,
      subject: `Новая покупка — заказ ${body.orderReference ?? "-"}`,
      html: ownerHtml,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("/api/send-guide error:", error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

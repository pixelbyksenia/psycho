// app/api/wfp/route.ts  ← полностью замени содержимое этого файла
// app/api/wfp/route.ts

import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const EMAIL_USER = "psiholoboginia.bot@gmail.com"; // твой email
const EMAIL_PASS = "psiholoboginia"; // пароль приложения
const OWNER_EMAIL = "kseniabki2703@gmail.com"; // или email заказчицы ksenavasilenko89@gmail.com

// Создаём транспортер один раз (для Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail", // или 'yandex', 'mail.ru' и т.д.
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export async function POST(request: Request) {
  try {
    const bodyText = await request.text();
    console.log("WAYFORPAY CALLBACK:", bodyText);

    // Парсим параметры
    const params: Record<string, string> = {};
    bodyText.split(";").forEach(pair => {
      const [key, value] = pair.split("=");
      if (key && value !== undefined) {
        params[key.trim()] = value.trim();
      }
    });

    // Проверка подписи
    const SECRET_KEY = process.env.WAYFORPAY_SECRET_KEY!;
    const signatureString = [
      params.orderReference || "",
      params.transactionStatus || "",
      params.amount || "",
      params.currency || "",
    ].join(";");

    const calculatedSignature = crypto
      .createHmac("md5", SECRET_KEY)
      .update(signatureString)
      .digest("hex");

    if (calculatedSignature !== params.merchantSignature) {
      console.error("❌ Неверная подпись!");
      return new Response("Invalid signature", { status: 400 });
    }

    // Успешная оплата
    if (
      params.transactionStatus === "Approved" ||
      params.transactionStatus === "Success"
    ) {
      const buyerEmail = params.email?.toLowerCase() || "no-email@provided.com";
      const orderReference = params.orderReference || "unknown";
      const amount = params.amount || "0";
      const currency = params.currency || "UAH";

      // Читаем PDF
      const pdfPath = path.join(process.cwd(), "public", "presentation.pdf");
      const pdfBuffer = await fs.promises.readFile(pdfPath);

      const mailOptionsToBuyer = {
        from: `"Психолобогиня" <${EMAIL_USER}>`,
        to: buyerEmail,
        subject: "Спасибо за покупку! 🎉 Ваша презентация",
        html: `
          <h2>Оплата прошла успешно!</h2>
          <p><strong>Заказ:</strong> ${orderReference}</p>
          <p><strong>Сумма:</strong> ${amount} ${currency}</p>
          <p>Спасибо, что выбрали меня 💜</p>
          <p>Во вложении — ваша презентация в PDF.</p>
          <br>
          <p>Обнимаю,<br>Ксения</p>
        `,
        attachments: [
          {
            filename: "Psiholoboginia_Презентация.pdf",
            content: pdfBuffer,
          },
        ],
      };

      const mailOptionsToOwner = {
        from: `"Система продаж" <${EMAIL_USER}>`,
        to: OWNER_EMAIL,
        subject: `НОВАЯ ПОКУПКА! Заказ ${orderReference}`,
        html: `
          <h2>Успешная продажа!</h2>
          <p><strong>Покупатель:</strong> ${buyerEmail}</p>
          <p><strong>Сумма:</strong> ${amount} ${currency}</p>
          <p><strong>Заказ №:</strong> ${orderReference}</p>
          <p>PDF отправлен покупателю автоматически.</p>
        `,
      };

      // Отправляем оба письма
      await transporter.sendMail(mailOptionsToBuyer);
      await transporter.sendMail(mailOptionsToOwner);

      console.log(`✅ Письма отправлены: покупателю ${buyerEmail} и владельцу`);
    }

    // Ответ WayForPay
    return new Response(
      '<?xml version="1.0" encoding="UTF-8"?><response><reason>Ok</reason><reasonCode>1100</reasonCode></response>',
      { headers: { "Content-Type": "application/xml" } }
    );
  } catch (error) {
    console.error("Ошибка:", error);
    return new Response("Error", { status: 500 });
  }
}

import emailjs from "@emailjs/nodejs";

export async function POST(req: Request) {
  const body = await req.json();
  console.log("PAYMENT CALLBACK:", body);

  if (body.transactionStatus === "Approved") {
    const templateParams = {
      user_name: body.clientName || body.clientFirstName || "Друг",
      user_email: body.email, // должно быть обязательно!
      guide_link:
        "https://drive.google.com/uc?export=download&id=1VKxL3s8GNuKfTuARGgnDKSalIbJeSC-H",
      // добавь сюда другие переменные шаблона, если нужно
    };

    try {
      const response = await emailjs.send(
        "service_1zi26m8", // твой Service ID
        "template_5xmptsj", // твой Template ID
        templateParams,
        {
          publicKey: "8FRzm_KxXgz_n_pZp", // твой Public Key
          privateKey: "GG8hne-cSe0JJZJ8F11Ag", // ← добавь это в .env!
          // privateKey — очень рекомендуется для сервера (больше безопасности)
        }
      );

      console.log("EMAILJS SUCCESS!", response.status, response.text);
    } catch (error) {
      console.error("EMAILJS ОШИБКА:", error);
    }
  }

  const time = Math.floor(Date.now() / 1000);
  const response = {
    orderReference: body.orderReference,
    status: "accept", // или "refuse" при ошибке
    time,
    // signature: ... (если требуется по документации WayForPay — добавь HMAC)
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

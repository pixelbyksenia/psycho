import { Resend } from "resend";

const resend = new Resend("re_Lu3onVAq_DwWpwuAw5kagNX4CAFtptUiP");
export async function POST(req: Request) {
  const body = await req.json(); // тип any
  console.log("PAYMENT CALLBACK:", body);

  /* const data = {
    merchantAccount: "www_psihologoginia_com",
    orderReference: "WFP-BTN-11535539-6933469d1b6cf",
    merchantSignature: "167f0dab3b833fb994b288e6d2dd7fc8",
    amount: 2,
    currency: "UAH",
    authCode: "858383",
    email: "ksenavasilenko89@gmail.com",
    phone: "380938193285",
    createdDate: 1764968093,
    processingDate: 1764968109,
    cardPan: "53****6041",
    cardType: "MasterCard",
    issuerBankCountry: "Poland",
    issuerBankName: "mBank S.A.",
    recToken: "",
    transactionStatus: "Approved",
    reason: "Ok",
    reasonCode: 1100,
    fee: 0.04,
    paymentSystem: "applePay",
    acquirerBankName: "WayForPay",
    cardProduct: "debit",
    clientName: null,
    products: [{ name: "Гайд", price: 2, count: 1 }],
    rrn: "533922360480",
    terminal: "E0171229",
    acquirer: 'AT "Райффайзен Банк Аваль"',
  }; */

  if (body.transactionStatus === "Approved") {
    try {
      await resend.emails.send({
        from: "psiholoboginia.bot@gmail.com <no-reply@psiholoboginia.bot@gmail.com>",
        to: ["kseniabki2703@gmail.com"], // email владельца (можно несколько)
        subject: `Новая успешная оплата! Order: ${body.orderReference}`,
        html: `
          <h2>Новая оплата получена</h2>
          <p><strong>Заказ:</strong> ${body.orderReference}</p>
          <p><strong>Сумма:</strong> ${body.amount} ${body.currency}</p>
          <p><strong>Товары:</strong> Гайд психологии</p>
          
          <p><strong>Покупатель:</strong> ${body.email || "не указан"} (${body.phone || "не указан"})</p>
          <p><strong>Карта:</strong> ${body.cardPan} (${body.cardType})</p>
          <p><strong>Способ оплаты:</strong> ${body.paymentSystem}</p>
          <p><strong>Время:</strong> ${new Date(body.processingDate * 1000).toLocaleString("ru-UA")}</p>
        `,
      });

      console.log("Email отправлен успешно");
    } catch (error) {
      console.error("Ошибка отправки email через Resend:", error);
    }
  }

  const response = {
    orderReference: body.orderReference,
    status: "accept",
    time: Math.floor(Date.now() / 1000),
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

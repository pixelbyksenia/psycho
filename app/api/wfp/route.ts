import { Resend } from "resend";
import emailjs from "@emailjs/browser";

const resend = new Resend(process.env.RESEND_KEY!);
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
    const templateParams = {
      user_name: body.clientName || "Друг", // ← имя покупателя
      user_email: body.email,
      guide_link:
        "https://drive.google.com/uc?export=download&id=1VKxL3s8GNuKfTuARGgnDKSalIbJeSC-H", // ← твоя прямая ссылка
      // если в шаблоне есть другие переменные — добавь их сюда
    };

    try {
      await emailjs.send(
        "service_1zi26m8",
        "template_5xmptsj",
        templateParams,
        "8FRzm_KxXgz_n_pZp"
      );
    } catch (error) {
      console.error("Ошибка отправки:", error);
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

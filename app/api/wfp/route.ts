import { NextResponse } from "next/server";

const processWayForPay = async (data: any) => {
  const { orderReference, transactionStatus, rrn } = data;

  if (transactionStatus !== "Approved") return;
};

export async function POST(req: Request) {
  const body = await req.json(); // тип any
  console.log("PAYMENT CALLBACK:", body);

  const ackResponse = new NextResponse("OK", {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
  setImmediate(() => {
    try {
      processWayForPay(body);
    } catch (e) {
      console.error("WFP processing error", e);
    }
  });
  const data = {
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
  };
  setImmediate(() => {
    processWayForPay(body).catch(e => console.error("WFP error", e));
  });

  return ackResponse;
}

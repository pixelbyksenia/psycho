import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json(); // тип any
  console.log("PAYMENT CALLBACK:", body);

  return NextResponse.json({
    orderReference: body.orderReference || "",
    status: "accept",
    time: Date.now(),
  });
}

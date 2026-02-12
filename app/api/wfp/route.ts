// Route: WayForPay callback
// Убрана интеграция с EmailJS — теперь отправка писем выполняется в `app/api/send-guide/route.ts`
export async function POST(req: Request) {
  const body = await req.json();
  console.log("PAYMENT CALLBACK (wfp):", body);

  // Здесь мы просто принимаем callback от WayForPay и возвращаем принятие.
  // Если нужно — можно расширить логику (HMAC-проверка, запись в БД и т.д.).

  const time = Math.floor(Date.now() / 1000);
  const response = {
    orderReference: body.orderReference,
    status: "accept", // или "refuse" при ошибке
    time,
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

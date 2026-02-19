// Minimal /api/send-guide route
// This handler intentionally does not rely on external email services (Resend)
// to avoid build/runtime issues on platforms like Vercel. The success page in
// the app already provides a direct download link to /guid.pdf, so this route
// simply accepts POST requests from the client (for logging or future use)
// and returns a concise JSON response.

type ReqBody = {
  client_email?: string;
  email?: string;
  orderReference?: string;
  amount?: string | number;
};

export async function POST(req: Request) {
  try {
    const body: ReqBody = await req.json().catch(() => ({}) as ReqBody);

    // Log minimal purchase info for server-side records (no external services)
    console.log("/api/send-guide called with:", {
      email: body.client_email || body.email,
      orderReference: body.orderReference,
      amount: body.amount,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("/api/send-guide error:", err);
    return new Response(JSON.stringify({ error: "internal_error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

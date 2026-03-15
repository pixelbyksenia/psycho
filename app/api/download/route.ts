import fs from "fs";
import path from "path";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    // orderReference may be used for logging/authorization in future
    const orderReference = url.searchParams.get("orderReference") || "";

    const guidePath = path.join(process.cwd(), "public", "guide.pdf");
    if (!fs.existsSync(guidePath)) {
      return new Response("Not found", { status: 404 });
    }

    const data = fs.readFileSync(guidePath);

    return new Response(data, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="guide.pdf"`,
      },
    });
  } catch (err) {
    console.error("/api/download error:", err);
    return new Response("Internal error", { status: 500 });
  }
}

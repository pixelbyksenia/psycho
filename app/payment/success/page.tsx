"use client";

import { useEffect, useRef, useState } from "react";

export default function SuccessPage() {
  // We avoid `useSearchParams()` here because it can cause a prerender error
  // during the build if the page is statically prerendered. Instead we read
  // the params from `window.location.search` inside useEffect (client-only).
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const invokedRef = useRef(false);
  const [downloadLoading, setDownloadLoading] = useState(false);

  async function handleDownload() {
    try {
      setDownloadLoading(true);

      const res = await fetch("/guid.pdf");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      // На большинстве мобильных браузеров window.open с _blank лучше срабатывает
      const newWindow = window.open(url, "_blank");

      // Если окно не открылось (блокировщик попапов) — fallback на a.click
      if (
        !newWindow ||
        newWindow.closed ||
        typeof newWindow.closed === "undefined"
      ) {
        const a = document.createElement("a");
        a.href = url;
        a.download = "guid.pdf";
        a.rel = "noopener noreferrer";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }

      // Чистим через 3–5 секунд (чтобы blob не висел в памяти)
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 5000);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Не удалось скачать гайд. Попробуйте ещё раз.");
    } finally {
      setDownloadLoading(false);
    }
  }

  useEffect(() => {
    // Вызываем API один раз после монтирования
    if (invokedRef.current) return;
    invokedRef.current = true;

    const params = new URLSearchParams(
      typeof window !== "undefined" ? window.location.search : ""
    );
    const client_email = params.get("client_email") || params.get("email");
    const orderReference = params.get("orderReference");
    const amount = params.get("amount");

    const payload = {
      client_email,
      orderReference,
      amount,
    } as const;

    // Не блокируем UI — отображаем статус
    (async () => {
      if (!client_email) {
        setStatus("Email покупателя не найден в параметрах URL.");
        return;
      }

      setLoading(true);
      setStatus("Отправляем гайд на указанный email...");

      try {
        const res = await fetch("/api/send-guide", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const json = await res.json();
        if (!res.ok) {
          console.error("send-guide failed:", json);
          setStatus("Не удалось отправить письмо — попробуйте позже.");
        } else {
          setStatus("Гайд отправлен на ваш email. Спасибо за покупку! 🎉");
        }
      } catch (err) {
        console.error(err);
        setStatus("Ошибка при отправке. Попробуйте ещё раз.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-[#EBDEFC]">
      <div className="flex flex-col items-center justify-center gap-6 px-6 text-center text-[#7131DB]">
        <h1 className="font-montserrat text-[26px] font-medium leading-tight">
          Оплата успешна 🎉
        </h1>

        <p className="font-montserrat text-[20px] font-normal leading-tight max-w-md leading-[1.4]">
          {status ?? "Проверяем параметры платежа..."}
        </p>

        <div className="flex gap-4">
          <button
            onClick={handleDownload}
            disabled={downloadLoading}
            className="mt-4 rounded-full border-2 border-[#290446] bg-white px-6 py-3 text-base font-semibold text-[#290446] shadow transition-all hover:bg-[#F3EBFF] disabled:opacity-50"
          >
            {downloadLoading ? "Скачиваем..." : "Скачать гайд сразу"}
          </button>

          <button
            onClick={() => (window.location.href = "/")}
            className="mt-4 rounded-full border-2 border-[#290446] bg-[#F3EBFF] px-6 py-3 text-base font-semibold text-[#290446] shadow transition-all hover:bg-[#290446] hover:text-white"
          >
            На главную
          </button>
        </div>

        {loading && <p className="mt-2 text-sm text-gray-600">Отправка...</p>}
      </div>
    </section>
  );
}

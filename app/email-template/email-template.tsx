"use client";

import emailjs from "@emailjs/browser";
import { useState } from "react";

export default function SendGuideButton() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const sendGuideEmail = async () => {
    setLoading(true);
    setStatus("");

    const templateParams = {
      user_name: "Ksenia", // ← замени на реальное имя покупателя
      user_email: "kseniabki2703@gmail.com", // ← email покупателя (для Reply-To)
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

      setStatus("Письмо с гайдом успешно отправлено! 🎉");
    } catch (error) {
      console.error("Ошибка отправки:", error);
      setStatus("Не удалось отправить письмо. Попробуй позже.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={sendGuideEmail}
        disabled={loading}
        className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? "Отправка..." : "Отправить гайд на email"}
      </button>
      {status && <p className="mt-4 text-lg">{status}</p>}
    </div>
  );
}

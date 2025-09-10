"use client";

import { useState } from "react";

type Props = {
  onSuccess?: () => void;
};

export default function PaymentForm({ onSuccess }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [card, setCard] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function validateEmail(value: string) {
    return /.+@.+\..+/.test(value);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim()) return setError("Введите имя");
    if (!validateEmail(email)) return setError("Введите корректный email");
    if (card.replace(/\s/g, "").length < 16) return setError("Номер карты некорректен");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    onSuccess?.();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </div>
      )}
      <div className="space-y-1">
        <label className="text-sm text-foreground/80">Имя</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-black/10 dark:border-white/15 bg-white/90 dark:bg-black/20 px-3 py-2 outline-none focus:ring-2 focus:ring-primary/60"
          placeholder="Иван"
          required
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm text-foreground/80">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-black/10 dark:border-white/15 bg-white/90 dark:bg-black/20 px-3 py-2 outline-none focus:ring-2 focus:ring-primary/60"
          placeholder="you@example.com"
          required
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm text-foreground/80">Карта</label>
        <input
          inputMode="numeric"
          maxLength={19}
          value={card}
          onChange={(e) => {
            const digits = e.target.value.replace(/\D/g, "").slice(0, 16);
            const groups = digits.match(/.{1,4}/g) ?? [];
            setCard(groups.join(" "));
          }}
          className="w-full rounded-xl border border-black/10 dark:border-white/15 bg-white/90 dark:bg-black/20 px-3 py-2 tracking-wider outline-none focus:ring-2 focus:ring-primary/60"
          placeholder="1234 5678 9012 3456"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-primary text-black font-medium py-2.5 hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "Обработка..." : "Оплатить"}
      </button>
      <p className="text-xs text-foreground/60 text-center">Оплата-демо. Интеграция не подключена.</p>
    </form>
  );
}



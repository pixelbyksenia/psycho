"use client";

import React, { useEffect, useState } from "react";

type CreatePaymentResponse = {
  paymentData: Record<string, any>;
};

declare global {
  interface Window {
    Wayforpay?: any; // widget constructor provided by external script
  }
}

export default function BuyPopup() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Load WayForPay widget script once
  useEffect(() => {
    const src = "https://secure.wayforpay.com/server/pay-widget.js";
    if (document.querySelector(`script[src="${src}"]`)) return;
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    document.head.appendChild(s);
    return () => {
      // keep the script for the session; no cleanup required
    };
  }, []);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (!res.ok) throw new Error("Failed to create payment");

      const data: CreatePaymentResponse = await res.json();

      // Wait for widget to be available
      const waitForWidget = async (): Promise<any> => {
        if ((window as any).Wayforpay) return (window as any).Wayforpay;
        return new Promise(resolve => {
          const t = setInterval(() => {
            if ((window as any).Wayforpay) {
              clearInterval(t);
              resolve((window as any).Wayforpay);
            }
          }, 200);
        });
      };

      const WayforpayCtor = await waitForWidget();

      const wayforpay = new WayforpayCtor();

      const successCallback = (response: any) => {
        console.log("Payment success:", response);
        alert("Payment successful — check your email for the download link.");
        setLoading(false);
        closeModal();
      };

      const failCallback = (err: any) => {
        console.error("Payment failed:", err);
        alert("Payment failed or cancelled.");
        setLoading(false);
      };

      // Run widget as popup — paymentData should include merchantSignature
      wayforpay.run(data.paymentData, successCallback, failCallback);
    } catch (err) {
      console.error(err);
      alert("Could not start payment: " + (err as Error).message);
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={openModal}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Buy
      </button>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Buy Guide</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="mt-1 block w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="mt-1 block w-full border rounded px-3 py-2"
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-3 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  {loading ? "Loading…" : "Pay"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import Modal from "./Modal";
import PaymentForm from "./PaymentForm";

export default function CTAWithModal() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl bg-primary text-black font-semibold px-6 py-3 hover:opacity-90"
      >
        Купить/Скачать
      </button>
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Оплата">
        <PaymentForm onSuccess={() => setOpen(false)} />
      </Modal>
    </>
  );
}



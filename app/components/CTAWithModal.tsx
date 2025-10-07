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
        className="text-xl text-[#290446] border-2 border-[#290446] rounded-full px-20 py-3 my-4 hover:bg-[#290446] hover:text-white bg-[#F3EBFF] shadow-lg shadow-indigo-500/50"
      >
        КУПИТЬ
      </button>
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Оплата">
        <PaymentForm onSuccess={() => setOpen(false)} />
      </Modal>
    </>
  );
}

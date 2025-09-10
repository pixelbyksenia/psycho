"use client";

import { useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-background shadow-xl border border-black/10 dark:border-white/10">
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/10 dark:border-white/10">
          <h3 className="text-lg font-semibold text-foreground">{title ?? "Оплата"}</h3>
          <button
            onClick={onClose}
            aria-label="Закрыть модалку"
            className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-secondary/60"
          >
            <span className="sr-only">Закрыть</span>
            ×
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}



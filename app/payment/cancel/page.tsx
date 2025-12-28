"use client";
export default function CancelPage() {
  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-[#EBDEFC]">
      <div className="flex flex-col items-center justify-center gap-8 px-6 text-center text-[#7131DB]">
        <h1 className="font-montserrat text-[26px] font-medium leading-tight">
          Оплата не была завершена ❌
        </h1>

        <button
          onClick={() => {
            window.location.href = "https://www.psiholoboginia.com";
          }}
          className="mt-4 rounded-full border-2 border-[#290446] bg-[#F3EBFF] px-20 py-3 text-xl font-semibold text-[#290446] shadow-lg shadow-indigo-500/50 transition-all hover:bg-[#290446] hover:text-white active:bg-[#290446] active:text-white"
        >
          На главную
        </button>
      </div>
    </section>
  );
}

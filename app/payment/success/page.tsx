"use client";

export default function SuccessPage() {
  return (
    <section className="relative flex items-center justify-center bg-[#EBDEFC]">
      <div className="max-w-6xl mx-auto px-6 py-20 sm:py-28 flex flex-col leading-[150%] w-160 font-regular gap-8 text-[#7131DB] items-center">
        <div className="font-montserrat font-medium text-[26px] w-20 leading-[91%]">
          Оплата успешна 🎉
        </div>
        <div className="font-montserrat font-regular text-[24px] w-20 leading-[70%]">
          Ваш заказ успешно оплачен.
        </div>
        <button
          className="text-xl text-[#290446] font-semibold border-2 border-[#290446] rounded-full px-20 py-3 my-4 hover:bg-[#290446] hover:text-white bg-[#F3EBFF] active:text-white active:bg-[#290446] shadow-lg shadow-indigo-500/50"
          onClick={() => {
            window.location.href = "https://www.psiholoboginia.com";
          }}
        >
          На главную
        </button>
      </div>
    </section>
  );
}

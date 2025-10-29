import Image from "next/image";

export default function PsychologyGuideCard() {
  return (
    <div className="flex flex-col items-center p-6 w-full max-w-sm mx-auto">
      {/* Фото профиля */}
      <div className="flex flex-col items-center -mt-8 z-10">
        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md">
          <Image
            src="/author.jpg"
            alt="Author"
            width={80}
            height={80}
            className="object-cover w-full h-full"
          />
        </div>
        <h1 className="mt-3 text-[#290446] font-semibold text-lg text-[18px]">
          Оксана Василенко
        </h1>
        <p className="text-[#290446]/70 text-sm text-[16px] font-regular">
          психолог
        </p>
      </div>

      {/* Название гайда */}
      <div className="relative z-10 top-5 text-white rounded-full px-6 py-2 text-center text-sm font-medium border-6 border-[#EBDEFC] bg-[#290446]">
        гайд начинающего психолога
      </div>

      {/* Основное изображение */}
      <div className="relative w-full rounded-3xl overflow-hidden">
        <Image
          src="/author-giude.png"
          alt="Author"
          width={200}
          height={160}
          className="object-cover w-full h-full"
        />
        {/* Тексты поверх изображения */}
        <div className="absolute top-10 left-4 text-white text-sm leading-[100%] max-w-[25%]">
          четкое понимание ключевых принципов терапии
        </div>
        <div className="absolute top-32 right-4 text-white text-sm max-w-[50%] text-right leading-[100%]">
          практические шаги, которые можно применять сразу
        </div>
        <div className="absolute bottom-28 left-4 text-white text-sm max-w-[70%] leading-[100%]">
          уверенность в том, как вести диалог и поддерживать процесс
        </div>

        {/* Цена */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center font-montserrat">
          <div className="bg-[#290446ab] text-white rounded-xl w-28 py-1 text-lg font-semibold items-center flex justify-center">
            9 $
          </div>
          <div className="text-[#bababab3] text-sm mt-1 h-6 flex items-center justify-center">
            <div className="absolute">28 $</div>
            <div className="w-28 h-[1px] bg-[#bababab3]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

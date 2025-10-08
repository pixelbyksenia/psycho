import Image from "next/image";
import CTAWithModal from "./components/CTAWithModal";
export const dynamic = "force-static";
import HeaderAuthor from "./HeaderAuthor";
import Footer from "./Footer";

export default function Home() {
  const items = [
    "Дипломированный психолог с опытом практики более 5 лет",
    "Провела свыше 1000 индивидуальных консультаций",
    "Работаю с людьми не по формальности, а из искреннего интереса к их внутреннему миру",
    "Подход всегда персональный — без универсальных схем и шаблонов",
    "Мой опыт лег в основу этого гайда. В нем я собрала проверенные методы и принципы, которые помогают лучше понять себя и наладить процесс изменений.",
  ];
  return (
    <div className="font-montserrat min-h-screen bg-covertext-foreground">
      <section
        className="relative min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: "url('/public/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-20 sm:py-28 flex flex-col leading-[150%] text-white w-160 font-regular gap-8">
          <div className="font-montserrat font-medium text-left text-[42px] w-20 leading-[91%] tracking-[-2px]">
            Эффективная терапия: практическое руководство
          </div>

          <div className=" text-[24px] text-right text-foreground/80 w-40 self-end">
            Для тех, кто делает
            <span className="font-semibold"> первый шаг </span>в психологию
          </div>

          <div className=" text-[24px] text-left text-foreground/80 w-72">
            Этот гид <span className="font-semibold"> поможет понять, </span>
            как работает терапия и с чего начать.
          </div>
          <div className=" text-[24px] text-right text-foreground/80 w-88 self-end">
            Вы узнаете, что
            <span className="font-semibold"> важно в первых встречах, </span>
            как строятся
            <span className="font-semibold"> доверительные отношения </span> и
            почему именно они определяют
            <span className="font-semibold"> результат. </span>
          </div>
        </div>
      </section>
      <div className="flex flex-wrap items-center w-full justify-center bg-[#EBDEFC] sticky top-0 z-100">
        <CTAWithModal />
      </div>

      <div className="mx-auto bg-[#f3ebff4d] rounded-4xl h-120 flex justify-center items-center mt-10 text-[#7131DB] text-2xl w-[90%] sm:w-140">
        <div className="bg-[#F3EBFF] rounded-4xl h-100 flex justify-center items-center mt-10 mb-10 flex-col gap-10 w-full sm:w-128 mx-6 sm:mx-auto">
          <div>Что даст это руководство</div>
          <div className="flex-col gap-4">
            <div className="flex gap-2">
              <div>•</div>
              <div className="w-2xs">
                Четкое понимание ключевых принципов терапии
              </div>
            </div>
            <div className="flex gap-2">
              <div>•</div>
              <div className="w-2xs">
                Практические шаги, которые можно применять сразу
              </div>
            </div>
            <div className="flex gap-2">
              <div>•</div>
              <div className="w-2xs">
                Уверенность в том, как вести диалог и поддерживать процесс
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Author */}
      <div className="min-h-screen bg-gradient-to-br from-indigo-300 to-purple-400 flex flex-col items-center justify-center px-6 py-10 text-white">
        <HeaderAuthor />

        <div className="flex flex-col gap-6 w-full max-w-2xl">
          {items.map((text, index) => (
            <div
              key={index}
              className="flex items-center bg-purple-200/30 rounded-3xl px-6 py-5 backdrop-blur-md"
            >
              <span className="text-5xl text-yellow-100 font-light mr-6">
                0{index + 1}
              </span>
              <p className="text-base text-purple-900">{text}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

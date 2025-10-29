import Image from "next/image";
import CTAWithModal from "./components/CTAWithModal";
export const dynamic = "force-static";
import HeaderAuthor from "./HeaderAuthor";
import Footer from "./Footer";
import PsychologyGuideCard from "./PsychologyGuideCard";

export default function Home() {
  const items = [
    "Дипломированный психолог с опытом практики более 5 лет",
    "Провела свыше 1000 индивидуальных консультаций",
    "Работаю с людьми не по формальности, а из искреннего интереса к их внутреннему миру",
    "Подход всегда персональный — без универсальных схем и шаблонов",
    "Мой опыт лег в основу этого гайда. В нем я собрала проверенные методы и принципы, которые помогают лучше понять себя и наладить процесс изменений.",
  ];

  return (
    <div className="font-montserrat min-h-screen bg-covertext-foreground bg-[#EBDEFC]">
      <Image className="w-full h-20" src="/background-top.png" alt="Top" />
      <PsychologyGuideCard />
      <div className="flex flex-wrap items-center w-full justify-center bg-[#EBDEFC] sticky top-0 z-100">
        <CTAWithModal />
      </div>
      <section className="relative min-h-screen flex items-center justify-center bg-[#EBDEFC] ">
        <div className="max-w-6xl mx-auto px-6 py-20 sm:py-28 flex flex-col leading-[150%] w-160 font-regular gap-8 text-[#7131DB]">
          <div className="font-montserrat font-medium text-left text-[42px] w-20 leading-[91%] tracking-[-2px]">
            эффективная терапия: практическое руководство
          </div>

          <div className=" text-[24px] text-right text-foreground/80 w-64 self-end">
            для тех, кто делает
            <span className="font-semibold"> первый шаг </span>в психологию
          </div>

          <div className=" text-[24px] text-right text-foreground/80 w-72 self-end">
            этот гид <span className="font-semibold"> поможет понять, </span>
            как работает терапия и с чего начать.
          </div>
          <div className=" text-[24px] text-right text-foreground/80 w-88 self-end">
            вы узнаете, что
            <span className="font-semibold"> важно в первых встречах, </span>
            как строятся
            <span className="font-semibold"> доверительные отношения </span> и
            почему именно они определяют
            <span className="font-semibold"> результат. </span>
          </div>
        </div>
      </section>

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

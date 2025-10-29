import Image from "next/image";
import CTAWithModal from "./components/CTAWithModal";
export const dynamic = "force-static";
import Footer from "./Footer";
import PsychologyGuideCard from "./PsychologyGuideCard";
import YouTubeIcon from "@mui/icons-material/YouTube";

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
      <section className="relative min-h-screen-[80vh ] flex items-center justify-center bg-[#EBDEFC] ">
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

      <div className="flex flex-col items-center">
        <Image
          src="/image.png"
          alt="Author Section"
          width={400}
          height={430}
          className="object-cover w-88 h-full mx-auto"
        />

        <button
          className="bg-[#ededed80] hover:bg-black/60 px-8 py-3 rounded-full transition flex items-center justify-center relative bottom-16"
          aria-label="YouTube"
        >
          <YouTubeIcon style={{ color: "#EBDEFC", fontSize: 28 }} />
        </button>
      </div>

      <Footer />
    </div>
  );
}

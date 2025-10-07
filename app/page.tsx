import Image from "next/image";
import CTAWithModal from "./components/CTAWithModal";
export const dynamic = "force-static";

export default function Home() {
  return (
    <div className="font-montserrat min-h-screen bg-covertext-foreground">
      {/* Hero Section */}
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
      <div className="flex flex-wrap items-center w-full justify-center bg-[#EBDEFC] sticky top-0">
        <CTAWithModal />
      </div>

      <div className="w-140 mx-auto bg-[#f3ebff4d] rounded-4xl h-120 flex justify-center items-center mt-10 text-[#7131DB] text-2xl">
        <div className="w-120 mx-auto bg-[#F3EBFF] rounded-4xl h-100 flex justify-center items-center mt-10 mb-10 flex-col gap-10">
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

      {/* 3. About product */}
      <section className="max-w-6xl mx-auto px-6 py-16 sm:py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl sm:text-4xl font-extrabold">
              Что внутри гайда
            </h2>
            <ul className="mt-5 space-y-2 text-foreground/80">
              <li>— 6 модулей: эмоции, мыслительные ловушки, самоподдержка</li>
              <li>— Практические упражнения и шаблоны</li>
              <li>— Быстрые техники на 2–5 минут</li>
              <li>— Подходит для самостоятельной работы</li>
            </ul>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-secondary">
              <Image
                src="/author.jpg"
                alt="Автор"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Author */}
      <section className="max-w-6xl mx-auto px-6 py-16 sm:py-20">
        <div className="grid md:grid-cols-[160px_1fr] gap-6 items-start">
          <div className="relative w-40 h-40 rounded-2xl overflow-hidden bg-cover">
            <Image
              src="/author.jpg"
              alt="Автор"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold">Об авторе</h2>
            <p className="mt-3 text-foreground/80">
              Психолог, 8+ лет практики. Ценности: бережность, ясность,
              проверенные методы без драматизации. Помогаю создавать устойчивые
              привычки заботы о себе.
            </p>
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto rounded-3xl border border-black/10 dark:border-white/10 p-8 text-center bg-cover">
          <h3 className="text-2xl sm:text-3xl font-bold">Готовы начать?</h3>
          <p className="mt-2 text-foreground/80">
            Заберите гайд и сделайте первый шаг к спокойствию.
          </p>
          <div className="mt-6 inline-flex">
            <CTAWithModal />
          </div>
        </div>
      </section>
    </div>
  );
}

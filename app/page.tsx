import Image from "next/image";
import CTAWithModal from "./components/CTAWithModal";
export const dynamic = "force-static";

export default function Home() {
  return (
    <div className="font-sans min-h-screen bg-background text-foreground">
      {/* 1. Header + Offer */}
      <section className="relative overflow-hidden">
        <div className="absolute -z-10 inset-0 bg-secondary opacity-60" />
        <div className="max-w-6xl mx-auto px-6 py-20 sm:py-28">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
                Психологический гайд: как вернуть спокойствие и фокус
              </h1>
              <p className="mt-5 text-lg sm:text-xl text-foreground/80">
                Пошаговая система самоподдержки, проверки мыслей и навыков регулирования эмоций. Без лишней теории — только рабочие инструменты.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <CTAWithModal />
                <span className="text-sm text-foreground/60">PDF, 60+ страниц</span>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] w-full rounded-3xl bg-secondary border border-black/10 dark:border-white/10 flex items-center justify-center overflow-hidden">
                <Image src="/cover.png" alt="Обложка гайда" width={640} height={480} className="rounded-2xl object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Audience: cold/warm */}
      <section className="max-w-6xl mx-auto px-6 py-16 sm:py-20">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 bg-white/60 dark:bg-black/20">
            <h2 className="text-2xl font-bold">Если вы сначала сомневаетесь (&quot;холодные&quot;)</h2>
            <p className="mt-3 text-foreground/80">
              Узнайте, как работает тревога и почему она закрепляется. Получите безопасные упражнения, которые дадут быстрый эффект: ясность, ровное дыхание, больше контроля. Примеры из реальной практики и шаблоны действий.
            </p>
          </div>
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 bg-white/60 dark:bg-black/20">
            <h2 className="text-2xl font-bold">Если вы готовы действовать (&quot;тёплые&quot;)</h2>
            <p className="mt-3 text-foreground/80">
              Четкая структура: ежедневные шаги, чек-листы, трекеры. Поддерживающие фразы, когнитивные техники, дыхательные протоколы. Всё для самостоятельной практики уже сегодня.
            </p>
          </div>
        </div>
      </section>

      {/* 3. About product */}
      <section className="max-w-6xl mx-auto px-6 py-16 sm:py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl sm:text-4xl font-extrabold">Что внутри гайда</h2>
            <ul className="mt-5 space-y-2 text-foreground/80">
              <li>— 6 модулей: эмоции, мыслительные ловушки, самоподдержка</li>
              <li>— Практические упражнения и шаблоны</li>
              <li>— Быстрые техники на 2–5 минут</li>
              <li>— Подходит для самостоятельной работы</li>
            </ul>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-secondary">
              <Image src="/author.jpg" alt="Автор" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Author */}
      <section className="max-w-6xl mx-auto px-6 py-16 sm:py-20">
        <div className="grid md:grid-cols-[160px_1fr] gap-6 items-start">
          <div className="relative w-40 h-40 rounded-2xl overflow-hidden bg-secondary">
            <Image src="/author.jpg" alt="Автор" fill className="object-cover" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold">Об авторе</h2>
            <p className="mt-3 text-foreground/80">
              Психолог, 8+ лет практики. Ценности: бережность, ясность, проверенные методы без драматизации. Помогаю создавать устойчивые привычки заботы о себе.
            </p>
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto rounded-3xl border border-black/10 dark:border-white/10 p-8 text-center bg-secondary">
          <h3 className="text-2xl sm:text-3xl font-bold">Готовы начать?</h3>
          <p className="mt-2 text-foreground/80">Заберите гайд и сделайте первый шаг к спокойствию.</p>
          <div className="mt-6 inline-flex">
            <CTAWithModal />
          </div>
        </div>
      </section>
    </div>
  );
}

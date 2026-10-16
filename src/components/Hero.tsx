import { CoffeeBean, CoffeeCup } from './Illustrations';

const STATS = [
  { value: '5 кг', label: 'Максимальный батч обжарки' },
  { value: 'Чт', label: 'День обжарки под ноль' },
  { value: 'Пт', label: 'Курьер везет по Минску' },
  { value: '1–3 дня', label: 'Возраст кофе у вас дома' },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background px-4 pt-20 pb-16 md:pt-28 md:pb-24">
      {/* Декоративный фон */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-amber-200/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-coffee/10 blur-3xl"
      />
      <CoffeeBean
        className="animate-float pointer-events-none absolute top-24 left-[6%] hidden h-10 w-10 opacity-40 md:block [--rot:-20deg]"
      />
      <CoffeeBean
        className="animate-float pointer-events-none absolute bottom-20 right-[44%] hidden h-8 w-8 opacity-30 [animation-delay:2s] md:block [--rot:30deg]"
      />

      <div className="pointer-events-none absolute top-4 right-4 hidden rotate-12 select-none border-2 border-stone-950 p-2 text-right font-mono text-xs uppercase tracking-widest opacity-10 md:block">
        Кварта Минск
        <br />
        Лот: 2019-2026
        <br />
        Партии по 5 кг
      </div>

      <div className="relative mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[1.4fr_1fr]">
        <div>
          <span
            className="animate-fade-up inline-block rounded-full border border-coffee/30 bg-amber-50 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-coffee"
          >
            Ростер · Минск · с 2019
          </span>

          <h1
            className="animate-fade-up mt-6 max-w-3xl font-serif text-4xl font-black leading-tight tracking-tight text-foreground [animation-delay:100ms] sm:text-5xl md:text-6xl"
          >
            Кофе, который не лежал на складе.
          </h1>

          <p
            className="animate-fade-up mt-8 max-w-2xl text-base leading-relaxed text-stone-600 [animation-delay:200ms] sm:text-lg"
          >
            Мы — Аня и Дима. Раньше мы варили кофе за стойкой, а с 2019 года управляем маленьким ростером на 5 кг.
            У нас нет глянцевых упаковок и пафосного офиса. Зато есть жесткое правило:{' '}
            <span className="rounded bg-amber-100/70 px-1 font-semibold text-foreground">никакого старого зерна</span>.
            Вы получаете посылку на 1–3 день после того, как зерно побывало в барабане ростера.
          </p>

          <div
            className="animate-fade-up mt-10 flex flex-col items-center gap-4 [animation-delay:300ms] sm:flex-row"
          >
            <a
              href="#catalog"
              className="w-full rounded-xl bg-coffee px-8 py-3.5 text-center text-base font-medium text-white shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:bg-coffee-hover hover:shadow-md focus:outline-none focus:ring-2 focus:ring-coffee focus:ring-offset-2 active:translate-y-0 sm:w-auto"
            >
              Выбрать свежий лот
            </a>

            <span className="max-w-xs text-center text-xs italic text-stone-500 sm:text-left">
              * Самовывоз на ул. Короля, 9 доступен ежедневно, если не хотите ждать пятницу.
            </span>
          </div>
        </div>

        <div className="animate-fade-up mx-auto w-56 [animation-delay:250ms] md:w-full md:max-w-xs">
          <CoffeeCup className="h-auto w-full drop-shadow-xl" />
        </div>
      </div>

      <div className="relative mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-6 border-t border-card-border pt-8 sm:grid-cols-4">
        {STATS.map((stat, index) => (
          <div
            key={stat.value}
            className="animate-fade-up"
            style={{ animationDelay: `${400 + index * 100}ms` }}
          >
            <p className="font-serif text-3xl font-black text-coffee">{stat.value}</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-stone-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

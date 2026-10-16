'use client';

export default function Hero() {
  const handleScroll = () => {
    const catalogElement = document.getElementById('catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-background px-4 pt-20 md:pt-28 border-card-border">
      <div className="absolute top-4 right-4 md:block opacity-10 select-none pointer-events-none transform rotate-12 font-mono text-xs border-2 border-stone-950 p-2 uppercase tracking-widest text-right">
        Кварта Минск<br />
        Лот: 2019-2026<br />
        Партии по 5 кг
      </div>

      <div className="mx-auto max-w-4xl">
        <h1 className="mt-8 font-serif text-4xl font-black tracking-tight text-foreground sm:text-5xl md:text-6xl leading-tight max-w-3xl">
          Кофе, который не лежал на складе. <br />        
        </h1>

        <p className="mt-8 max-w-2xl text-base text-stone-600 sm:text-lg leading-relaxed">
          Мы — Аня и Дима. Раньше мы варили кофе за стойкой, а с 2019 года управляем маленьким ростером на 5 кг. 
          У нас нет глянцевых упаковок и пафосного офиса. Зато есть жесткое правило: <span className="text-foreground font-semibold bg-amber-100/70 px-1 rounded">никакого старого зерна</span>. 
          Вы получаете посылку на 1–3 день после того, как зерно побывало в барабане ростера. 
        </p>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 border-t border-card-border pt-8">
          <div>
            <p className="font-serif text-3xl font-black text-coffee">5 кг</p>
            <p className="mt-1 text-xs text-stone-500 uppercase tracking-wider">Максимальный батч обжарки</p>
          </div>
          <div>
            <p className="font-serif text-3xl font-black text-coffee">Чт</p>
            <p className="mt-1 text-xs text-stone-500 uppercase tracking-wider">День обжарки под ноль</p>
          </div>
          <div>
            <p className="font-serif text-3xl font-black text-coffee">Пт</p>
            <p className="mt-1 text-xs text-stone-500 uppercase tracking-wider">Курьер везет по Минску</p>
          </div>
          <div>
            <p className="font-serif text-3xl font-black text-coffee">1–3 дня</p>
            <p className="mt-1 text-xs text-stone-500 uppercase tracking-wider">Возраст кофе у вас дома</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <button 
            onClick={handleScroll}
            className="w-full sm:w-auto rounded-xl bg-coffee px-8 py-3.5 text-base font-medium text-white shadow-xs hover:bg-coffee-hover transition-all focus:outline-none focus:ring-2 focus:ring-coffee"
          >
            Выбрать свежий лот
          </button>
          
          <span className="text-xs text-stone-500 italic max-w-xs text-center sm:text-left">
            * Самовывоз на ул. Короля, 9 доступен ежедневно, если не хотите ждать пятницу.
          </span>
        </div>
      </div>
    </section>
  );
}

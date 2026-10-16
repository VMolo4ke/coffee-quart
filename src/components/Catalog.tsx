'use client';

const COFFEE_ITEMS = [
  {
    id: 'ethiopia',
    name: 'Эфиопия Иргачеффе',
    description: 'цветочный, бергамот, светлая обжарка',
    weight: '250 г',
    price: '32 BYN',
  },
  {
    id: 'colombia',
    name: 'Колумбия Уила',
    description: 'карамель, красное яблоко',
    weight: '250 г',
    price: '29 BYN',
  },
  {
    id: 'brazil',
    name: 'Бразилия Серрадо',
    description: 'орех, шоколад, под эспрессо',
    weight: '250 г',
    price: '26 BYN',
  },
  {
    id: 'drips',
    name: 'Дрип-пакеты, ассорти',
    description: 'Удобное заваривание в чашке · 10 штук',
    weight: '10 шт',
    price: '18 BYN',
  },
];

export default function Catalog() {
  const handleOrderClick = (productName: string) => {
    const formElement = document.getElementById('order-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
      
      const selectElement = document.getElementById('interest-select') as HTMLSelectElement;
      if (selectElement) {
        if (productName.includes('Подписка')) {
          selectElement.value = 'subscription';
        } else {
          selectElement.value = 'single';
        }
        selectElement.dispatchEvent(new Event('change', { bubbles: true }));
      }

      const commentElement = document.getElementById('comment-textarea') as HTMLTextAreaElement;
      if (commentElement && !productName.includes('Подписка')) {
        commentElement.value = `Интересует лот: ${productName}`;
      }
    }
  };

  return (
    <section id="catalog" className="mx-auto max-w-5xl px-4 py-16 md:py-24">
      <div className="text-center md:text-left md:flex md:items-end md:justify-between border-b border-card-border pb-6">
        <div>
          <h2 className="font-serif text-3xl font-black text-foreground sm:text-4xl">
            Свежие лоты этой недели
          </h2>
          <p className="mt-2 text-sm text-stone-500 max-w-md">
            Жарим строго по четвергам партиями по 5 кг. Каждая пачка снабжена датой обжарки вручную.
          </p>
        </div>
        <div className="mt-4 md:mt-0 text-xs text-stone-500 font-mono hidden md:block">
          [ Батч №{new Date().getWeek() || 42} · Октябрь 2026 ]
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {COFFEE_ITEMS.map((item) => (
          <div 
            key={item.id} 
            className="flex flex-col justify-between rounded-2xl border border-card-border bg-card p-6 shadow-2xs transition-all hover:border-stone-300 hover:shadow-xs"
          >
            <div>
              <div className="flex items-start justify-between">
                <h3 className="font-serif text-lg font-bold text-foreground leading-tight">
                  {item.name}
                </h3>
                <span className="ml-2 inline-block shrink-0 rounded-md bg-stone-100 px-2 py-0.5 text-xs text-stone-600 font-medium">
                  {item.weight}
                </span>
              </div>
              <p className="mt-2 text-xs text-stone-500 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-stone-100">
              <span className="text-xl font-black text-foreground">{item.price}</span>
              <button
                onClick={() => handleOrderClick(item.name)}
                className="rounded-xl border border-coffee px-4 py-2 text-xs font-semibold text-coffee hover:bg-coffee hover:text-white transition-all cursor-pointer"
              >
                В корзину
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border-2 border-dashed border-coffee/30 bg-amber-50/20 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="max-w-xl text-center md:text-left">
          <div className="inline-flex items-center rounded-full bg-coffee px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
            🔥 Главная цель каждого бариста
          </div>
          <h3 className="mt-4 font-serif text-2xl font-black text-foreground md:text-3xl">
            Кофейная подписка «Кварта»
          </h3>
          <p className="mt-2 text-sm text-stone-600 leading-relaxed">
            Забудьте о пустых пачках по утрам. Мы сами будем привозить вам <strong className="text-foreground">2 пачки по 250 г раз в месяц</strong>. Доставка по Минску абсолютно бесплатна. Сорта можно менять или довериться нашему выбору.
          </p>
        </div>

        <div className="shrink-0 text-center md:text-right border-t md:border-t-0 md:border-l border-card-border pt-4 md:pt-0 md:pl-8 flex flex-col items-center md:items-end justify-center w-full md:w-auto">
          <div className="text-xs text-stone-500 uppercase tracking-wider">Цена абонемента</div>
          <div className="mt-1 font-serif text-3xl font-black text-foreground">54 BYN <span className="text-sm font-sans font-normal text-stone-500">/ мес</span></div>
          <button
            onClick={() => handleOrderClick('Подписка на 2 пачки кофе')}
            className="mt-4 w-full md:w-auto rounded-xl bg-coffee px-6 py-3 text-sm font-bold text-white shadow-xs hover:bg-coffee-hover transition-all cursor-pointer"
          >
            Оформить подписку
          </button>
        </div>
      </div>
    </section>
  );
}

declare global {
  interface Date {
    getWeek(): number;
  }
}
Date.prototype.getWeek = function() {
  const onejan = new Date(this.getFullYear(), 0, 1);
  return Math.ceil((((this.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
};

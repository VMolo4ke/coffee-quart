'use client';

import type { ReactNode } from 'react';
import { CoffeeBag, DripBag } from './Illustrations';
import Reveal from './Reveal';
import { ORDER_PREFILL_EVENT, type OrderPrefill } from '@/lib/order-events';

type CoffeeItem = {
  id: string;
  name: string;
  description: string;
  weight: string;
  price: string;
  picture: ReactNode;
  tint: string;
};

const COFFEE_ITEMS: CoffeeItem[] = [
  {
    id: 'ethiopia',
    name: 'Эфиопия Иргачеффе',
    description: 'цветочный, бергамот, светлая обжарка',
    weight: '250 г',
    price: '32 BYN',
    picture: <CoffeeBag color="#b45309" label="ET" className="h-full w-full" />,
    tint: 'from-amber-100 to-orange-50',
  },
  {
    id: 'colombia',
    name: 'Колумбия Уила',
    description: 'карамель, красное яблоко',
    weight: '250 г',
    price: '29 BYN',
    picture: <CoffeeBag color="#9a3412" label="CO" className="h-full w-full" />,
    tint: 'from-red-100 to-amber-50',
  },
  {
    id: 'brazil',
    name: 'Бразилия Серрадо',
    description: 'орех, шоколад, под эспрессо',
    weight: '250 г',
    price: '26 BYN',
    picture: <CoffeeBag color="#57341a" label="BR" className="h-full w-full" />,
    tint: 'from-stone-200 to-amber-50',
  },
  {
    id: 'drips',
    name: 'Дрип-пакеты, ассорти',
    description: 'Удобное заваривание в чашке · 10 штук',
    weight: '10 шт',
    price: '18 BYN',
    picture: <DripBag className="h-full w-full" />,
    tint: 'from-yellow-100 to-stone-50',
  },
];

function prefillOrder(detail: OrderPrefill) {
  document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' });
  window.dispatchEvent(new CustomEvent<OrderPrefill>(ORDER_PREFILL_EVENT, { detail }));
}

export default function Catalog() {
  return (
    <section id="catalog" className="mx-auto max-w-5xl scroll-mt-8 px-4 py-16 md:py-24">
      <Reveal>
        <div className="border-b border-card-border pb-6 text-center md:flex md:items-end md:justify-between md:text-left">
          <div>
            <h2 className="font-serif text-3xl font-black text-foreground sm:text-4xl">
              Свежие лоты этой недели
            </h2>
            <p className="mt-2 max-w-md text-sm text-stone-500">
              Жарим строго по четвергам партиями по 5 кг. Каждая пачка снабжена датой обжарки вручную.
            </p>
          </div>
          <div className="mt-4 hidden font-mono text-xs text-stone-500 md:mt-0 md:block">
            [ Батч №42 · Октябрь 2026 ]
          </div>
        </div>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {COFFEE_ITEMS.map((item, index) => (
          <Reveal key={item.id} delay={index * 100} className="h-full">
            <div className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-card-border bg-card shadow-2xs transition-all duration-300 hover:-translate-y-1.5 hover:border-stone-300 hover:shadow-lg">
              <div>
                <div className={`flex h-36 items-center justify-center bg-linear-to-br ${item.tint}`}>
                  <div className="h-24 w-24 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                    {item.picture}
                  </div>
                </div>

                <div className="p-6 pb-0">
                  <div className="flex items-start justify-between">
                    <h3 className="font-serif text-lg font-bold leading-tight text-foreground">
                      {item.name}
                    </h3>
                    <span className="ml-2 inline-block shrink-0 rounded-md bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-600">
                      {item.weight}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-stone-500">{item.description}</p>
                </div>
              </div>

              <div className="mx-6 mb-6 mt-6 flex items-center justify-between border-t border-stone-100 pt-4">
                <span className="text-xl font-black text-foreground">{item.price}</span>
                <button
                  type="button"
                  onClick={() =>
                    prefillOrder({ interest: 'single', comment: `Интересует лот: ${item.name}` })
                  }
                  className="cursor-pointer rounded-xl border border-coffee px-4 py-2 text-xs font-semibold text-coffee transition-all duration-200 hover:bg-coffee hover:text-white active:scale-95"
                >
                  Заказать
                </button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12">
        <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-coffee/30 bg-amber-50/40 p-6 md:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber-200/40 blur-2xl"
          />
          <div className="relative flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="max-w-xl text-center md:text-left">
              <div className="inline-flex items-center rounded-full bg-coffee px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                🔥 Главная цель каждого бариста
              </div>
              <h3 className="mt-4 font-serif text-2xl font-black text-foreground md:text-3xl">
                Кофейная подписка «Кварта»
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                Забудьте о пустых пачках по утрам. Мы сами будем привозить вам{' '}
                <strong className="text-foreground">2 пачки по 250 г раз в месяц</strong>. Доставка по Минску
                абсолютно бесплатна. Сорта можно менять или довериться нашему выбору.
              </p>
            </div>

            <div className="flex w-full shrink-0 flex-col items-center justify-center border-t border-card-border pt-4 text-center md:w-auto md:items-end md:border-l md:border-t-0 md:pl-8 md:pt-0 md:text-right">
              <div className="text-xs uppercase tracking-wider text-stone-500">Цена абонемента</div>
              <div className="mt-1 font-serif text-3xl font-black text-foreground">
                54 BYN <span className="font-sans text-sm font-normal text-stone-500">/ мес</span>
              </div>
              <button
                type="button"
                onClick={() => prefillOrder({ interest: 'subscription' })}
                className="mt-4 w-full cursor-pointer rounded-xl bg-coffee px-6 py-3 text-sm font-bold text-white shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:bg-coffee-hover hover:shadow-md active:translate-y-0 md:w-auto"
              >
                Оформить подписку
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}


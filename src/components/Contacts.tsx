import Reveal from './Reveal';

export default function Contacts() {
  return (
    <section id="contacts" className="mx-auto max-w-5xl border-t border-card-border px-4 py-12 md:py-16">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Левая колонка: Условия получения */}
        <div className="space-y-6">
          <Reveal>
            <h2 className="font-serif text-2xl font-black text-foreground sm:text-3xl">Доставка и самовывоз</h2>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-xl border border-card-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center space-x-3">
                <span className="text-xl">🛵</span>
                <h3 className="font-serif text-lg font-bold text-foreground">Курьером по Минску</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                Развозим заказы <strong className="text-foreground">каждую пятницу</strong> (на следующий день после
                обжарки). При заказе на сумму от 50 BYN доставим бесплатно. Если заказ меньше — доставка стоит 7 BYN.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="rounded-xl border border-card-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center space-x-3">
                <span className="text-xl">🏃‍♂️</span>
                <h3 className="font-serif text-lg font-bold text-foreground">Самовывоз из мастерской</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                Ждем вас по адресу: <strong className="text-foreground">Минск, ул. Короля, 9</strong>. Вы сможете
                забрать свое зерно сами, посмотреть на ростер и пообщаться с нами лично.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Правая колонка: Время работы и контакты */}
        <Reveal delay={150} className="h-full">
          <div className="flex h-full flex-col justify-between rounded-xl bg-stone-100 p-6 md:p-8">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-stone-500">Часы работы мастерской</h3>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between border-b border-stone-200 pb-2 text-sm">
                  <span className="text-stone-600">Будние дни (пн–пт)</span>
                  <span className="font-semibold text-foreground">8:00 – 20:00</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-2 text-sm">
                  <span className="text-stone-600">Выходные (сб–вс)</span>
                  <span className="font-semibold text-foreground">10:00 – 18:00</span>
                </div>
              </div>
            </div>

            <div className="mt-8 md:mt-0">
              <h3 className="font-mono text-xs uppercase tracking-wider text-stone-500">Возникли вопросы?</h3>
              <p className="mt-2 text-sm text-stone-600">
                Если вам нужен помол под турку/френч-пресс или вы хотите заказать кофе для офиса по безналу — просто
                напишите об этом в комментарии к форме выше или позвоните нам.
              </p>

              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-coffee">
                <a
                  href="https://yandex.com/maps/?text=Минск, ул. Короля, 9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline transition-colors hover:text-coffee-hover"
                >
                  📍 ул. Короля, 9
                </a>
                <span className="text-stone-300">|</span>
                <a href="tel:+375291112233" className="underline transition-colors hover:text-coffee-hover">
                  📞 +375 (29) 111-22-33
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Contacts() {
  return (
    <section id="contacts" className="mx-auto max-w-5xl px-4 py-12 md:py-16 border-t border-card-border">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        
        {/* Левая колонка: Условия получения */}
        <div className="space-y-6">
          <h2 className="font-serif text-2xl font-black text-foreground sm:text-3xl">
            Доставка и самовывоз
          </h2>
          
          {/* Карточка 1: Доставка */}
          <div className="rounded-xl border border-card-border bg-card p-5">
            <div className="flex items-center space-x-3">
              <span className="text-xl">🛵</span>
              <h3 className="font-serif text-lg font-bold text-foreground">Курьером по Минску</h3>
            </div>
            <p className="mt-2 text-sm text-stone-600 leading-relaxed">
              Развозим заказы <strong className="text-foreground">каждую пятницу</strong> (на следующий день после обжарки). При заказе на сумму от 50 BYN доставим бесплатно. Если заказ меньше — доставка стоит 7 BYN.
            </p>
          </div>

          {/* Карточка 2: Самовывоз */}
          <div className="rounded-xl border border-card-border bg-card p-5">
            <div className="flex items-center space-x-3">
              <span className="text-xl">🏃‍♂️</span>
              <h3 className="font-serif text-lg font-bold text-foreground">Самовывоз из мастерской</h3>
            </div>
            <p className="mt-2 text-sm text-stone-600 leading-relaxed">
              Ждем вас по адресу: <strong className="text-foreground">Минск, ул. Короля, 9</strong>. Вы сможете забрать свое зерно сами, посмотреть на ростер и пообщаться с нами лично.
            </p>
          </div>
        </div>

        {/* Правая колонка: Время работы и контакты */}
        <div className="flex flex-col justify-between rounded-xl bg-stone-100 p-6 md:p-8">
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-stone-500">Часы работы мастерской</h3>
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
            <h3 className="text-xs font-mono uppercase tracking-wider text-stone-500">Возникли вопросы?</h3>
            <p className="mt-2 text-sm text-stone-600">
              Если вам нужен помол под турку/френч-пресс или вы хотите заказать кофе для офиса по безналу — просто напишите об этом в комментарии к форме ниже или спросите менеджера при созвоне.
            </p>
            
            {/* Небольшой интерактив для связи */}
            <div className="mt-4 flex space-x-4 text-xs font-semibold text-coffee">
              <span className="underline select-all">📍 ул. Короля, 9</span>
              <span className="text-stone-300">|</span>
              <span className="underline select-all">📞 +375 (29) 111-22-33</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

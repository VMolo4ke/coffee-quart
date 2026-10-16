'use client';

import React, { useEffect, useState } from 'react';
import Reveal from './Reveal';
import { ORDER_PREFILL_EVENT, type OrderPrefill } from '@/lib/order-events';

// Адрес FastAPI бэкенда. Задайте NEXT_PUBLIC_ORDER_API_URL в .env.local (для продакшена — адрес сервера).
const ORDER_API_URL = process.env.NEXT_PUBLIC_ORDER_API_URL ?? 'http://127.0.0.1:8000/api/orders';

const FIELD_CLASS =
  'mt-1 block w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground transition-all duration-200 focus:ring-2 focus:outline-none';
const LABEL_CLASS = 'block text-xs font-mono uppercase tracking-wider text-stone-500';

// Валидация белорусского номера телефона (+375...)
function validateBelarusPhone(num: string) {
  // Форматы: +375291234567, +375 (29) 123-45-67, 375291234567
  const regex = /^(?:\+?375)?\s?\(?\d{2}\)?\s?\d{3}-?\d{2}-?\d{2}$/;
  return regex.test(num.replace(/\s+/g, ''));
}

// Сбор UTM-меток в момент отправки (на клиенте, в обработчике события)
function collectUtm(): Record<string, string | null> {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source'),
    utm_medium: params.get('utm_medium'),
    utm_campaign: params.get('utm_campaign'),
    utm_content: params.get('utm_content'),
    utm_term: params.get('utm_term'),
    referrer: document.referrer || null,
    page_url: window.location.href,
  };
}

export default function OrderForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('single');
  const [delivery, setDelivery] = useState('pickup');
  const [comment, setComment] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  // Каталог сообщает форме, какой лот/тариф выбран
  useEffect(() => {
    const handlePrefill = (event: Event) => {
      const { interest: nextInterest, comment: nextComment } = (event as CustomEvent<OrderPrefill>).detail;
      setInterest(nextInterest);
      if (nextComment !== undefined) setComment(nextComment);
      setSubmitStatus('idle');
    };

    window.addEventListener(ORDER_PREFILL_EVENT, handlePrefill);
    return () => window.removeEventListener(ORDER_PREFILL_EVENT, handlePrefill);
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    if (phoneError) setPhoneError(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setPhoneError(false);
    setErrorMessage('');

    if (!validateBelarusPhone(phone)) {
      setPhoneError(true);
      setShakeKey((key) => key + 1);
      return;
    }

    setIsSubmitting(true);

    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      interest,
      delivery_method: delivery,
      comment,
      utm: collectUtm(),
    };

    try {
      const response = await fetch(ORDER_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setName('');
        setPhone('');
        setComment('');
      } else {
        // Бэкенд мог вернуть не JSON (например, 500), поэтому парсим безопасно
        const errorData = await response.json().catch(() => null);
        const detail = errorData && typeof errorData.detail === 'string' ? errorData.detail : null;
        setSubmitStatus('error');
        setErrorMessage(detail || 'Произошла ошибка при отправке заявки.');
      }
    } catch {
      setSubmitStatus('error');
      setErrorMessage('Не удалось связаться с сервером. Проверьте интернет-соединение или попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const deliveryButtonClass = (active: boolean) =>
    `rounded-xl border p-3 text-center text-xs font-medium transition-all duration-200 cursor-pointer active:scale-95 ${
      active
        ? 'border-coffee bg-amber-50 font-semibold text-coffee shadow-xs'
        : 'border-card-border bg-background text-stone-600 hover:border-stone-300'
    }`;

  return (
    <section id="order-form" className="mx-auto max-w-xl scroll-mt-8 border-t border-card-border px-4 py-16">
      <Reveal>
        <div className="rounded-2xl border border-card-border bg-card p-8 shadow-xs">
          {submitStatus === 'success' && (
            <div className="animate-pop-in py-8 text-center" role="status">
              <span className="text-4xl">☕️</span>
              <h3 className="mt-4 font-serif text-2xl font-bold text-foreground">Заявка принята!</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                Спасибо за заказ. Аня или Дмитрий уже получили уведомление и перезвонят вам в течение 15 минут
                для подтверждения.
              </p>
              <button
                type="button"
                onClick={() => setSubmitStatus('idle')}
                className="mt-6 cursor-pointer text-xs font-semibold text-coffee underline hover:text-coffee-hover"
              >
                Отправить еще одну заявку
              </button>
            </div>
          )}

          {submitStatus !== 'success' && (
            <>
              <div className="text-center md:text-left">
                <h2 className="font-serif text-2xl font-black text-foreground sm:text-3xl">Оформить заказ</h2>
                <p className="mt-2 text-sm text-stone-500">
                  Заполните форму, и мы возьмем ваш лот в работу. Никаких предоплат на сайте не требуется.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                  <label htmlFor="name-input" className={LABEL_CLASS}>
                    Ваше имя
                  </label>
                  <input
                    id="name-input"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Алексей"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`${FIELD_CLASS} border-card-border focus:border-coffee focus:ring-coffee/20`}
                  />
                </div>

                <div key={shakeKey} className={phoneError ? 'animate-shake' : ''}>
                  <label htmlFor="phone-input" className={LABEL_CLASS}>
                    Белорусский телефон
                  </label>
                  <input
                    id="phone-input"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="+375 (29) 123-45-67"
                    value={phone}
                    onChange={handlePhoneChange}
                    aria-invalid={phoneError}
                    className={`${FIELD_CLASS} ${
                      phoneError
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                        : 'border-card-border focus:border-coffee focus:ring-coffee/20'
                    }`}
                  />
                  {phoneError && (
                    <p className="mt-1.5 text-xs font-medium text-red-600" role="alert">
                      ⚠️ Пожалуйста, введите корректный номер телефона РБ (+375...)
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="interest-select" className={LABEL_CLASS}>
                    Что вас интересует?
                  </label>
                  <select
                    id="interest-select"
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className={`${FIELD_CLASS} border-card-border focus:border-coffee focus:ring-coffee/20`}
                  >
                    <option value="single">Разовый заказ свежего зерна / дрипов</option>
                    <option value="subscription">Ежемесячная кофейная подписка (54 BYN)</option>
                    <option value="question">Просто задать вопрос мастерам</option>
                  </select>
                </div>


                {interest !== 'question' && (
                  <div className="animate-pop-in">
                    <span className={LABEL_CLASS}>Способ получения</span>
                    <div className="mt-1 grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setDelivery('pickup')}
                        aria-pressed={delivery === 'pickup'}
                        className={deliveryButtonClass(delivery === 'pickup')}
                      >
                        🏃‍♂️ Самовывоз (ул. Короля, 9)
                      </button>
                      <button
                        type="button"
                        onClick={() => setDelivery('courier')}
                        aria-pressed={delivery === 'courier'}
                        className={deliveryButtonClass(delivery === 'courier')}
                      >
                        🛵 Доставка по Минску
                      </button>
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="comment-textarea" className={LABEL_CLASS}>
                    Комментарий
                  </label>
                  <textarea
                    id="comment-textarea"
                    rows={3}
                    placeholder="Укажите сорт кофе, нужный помол или адрес доставки..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className={`${FIELD_CLASS} resize-none border-card-border focus:border-coffee focus:ring-coffee/20`}
                  />
                </div>

                {submitStatus === 'error' && (
                  <div className="animate-pop-in rounded-xl border border-red-200 bg-red-50 p-4" role="alert">
                    <p className="text-xs font-medium leading-relaxed text-red-700">{errorMessage}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white shadow-xs transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-coffee focus:ring-offset-2 ${
                    isSubmitting
                      ? 'cursor-not-allowed bg-stone-400'
                      : 'cursor-pointer bg-coffee hover:-translate-y-0.5 hover:bg-coffee-hover hover:shadow-md active:translate-y-0'
                  }`}
                >
                  {isSubmitting && (
                    <span
                      aria-hidden="true"
                      className="animate-spin-slow h-4 w-4 rounded-full border-2 border-white/40 border-t-white"
                    />
                  )}
                  {isSubmitting ? 'Отправка заявки...' : 'Подтвердить заказ'}
                </button>
              </form>
            </>
          )}
        </div>
      </Reveal>
    </section>
  );
}


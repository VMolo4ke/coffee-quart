'use client';

import React, { useState, useEffect } from 'react';

export default function OrderForm() {
  // Поля формы
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('single');
  const [delivery, setDelivery] = useState('pickup');
  const [comment, setComment] = useState('');
  
  // Маркетинговые метки (UTM)
  const [utmMetrics, setUtmMetrics] = useState<Record<string, string | null>>({});

  // Состояния отправки
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [phoneError, setPhoneError] = useState(false);

  // 1. Автоматический сбор UTM-меток при загрузке страницы
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setUtmMetrics({
        utm_source: params.get('utm_source'),
        utm_medium: params.get('utm_medium'),
        utm_campaign: params.get('utm_campaign'),
        utm_content: params.get('utm_content'),
        utm_term: params.get('utm_term'),
        referrer: document.referrer || null,
        page_url: window.location.href
      });
    }
  }, []);

  // 2. Валидация белорусского номера телефона (+375...)
  const validateBelarusPhone = (num: string) => {
    // Регулярка проверяет форматы: +375291234567, +375 (29) 123-45-67, 375291234567
    const regex = /^(?:\+?375)?\s?\(?\d{2}\)?\s?\d{3}-?\d{2}-?\d{2}$/;
    return regex.test(num.replace(/\s+/g, ''));
  };

  // Живая очистка ошибки при вводе номера
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    if (phoneError) setPhoneError(false);
  };

  // 3. Отправка формы на FastAPI бэкенд
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Сбрасываем старые ошибки
    setPhoneError(false);
    setErrorMessage('');

    // Жесткая проверка номера перед отправкой
    if (!validateBelarusPhone(phone)) {
      setPhoneError(true);
      return;
    }

    // Включаем статус отправки (это защищает от двойного клика по кнопке)
    setIsSubmitting(true);

    // Сборка полного пакета данных для FastAPI
    const payload = {
      name,
      phone: phone.trim(),
      interest,
      delivery_method: delivery,
      comment,
      utm: utmMetrics
    };

    try {
      // Замените URL на локальный адрес FastAPI или на адрес вашего продакшн-сервера после деплоя
      const response = await fetch('http://127.0.0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Очищаем форму
        setName('');
        setPhone('');
        setComment('');
      } else {
        const errorData = await response.json();
        setSubmitStatus('error');
        // Если бэкенд вернул ошибку дедупликации (400) или валидации (422)
        setErrorMessage(errorData.detail || 'Произошла ошибка при отправке заявки.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Не удалось связаться с сервером. Проверьте интернет-соединение или попробуйте позже.');
    } finally {
      // Выключаем блокировку кнопки
      setIsSubmitting(false);
    }
  };

  return (
    <section id="order-form" className="mx-auto max-w-xl px-4 py-16 border-t border-card-border">
      <div className="rounded-2xl bg-card border border-card-border p-8 shadow-xs">
        
        {/* Успешный экран после отправки */}
        {submitStatus === 'success' && (
          <div className="text-center py-8">
            <span className="text-4xl">☕️</span>
            <h3 className="mt-4 font-serif text-2xl font-bold text-foreground">Заявка принята!</h3>
            <p className="mt-2 text-sm text-stone-600 leading-relaxed">
              Спасибо за заказ. Аня или Дмитрий уже получили уведомление и перезвонят вам в течение 15 минут для подтверждения.
            </p>
            <button 
              onClick={() => setSubmitStatus('idle')}
              className="mt-6 text-xs font-semibold text-coffee underline hover:text-coffee-hover cursor-pointer"
            >
              Отправить еще одну заявку
            </button>
          </div>
        )}

        {/* Основной интерфейс формы */}
        {submitStatus !== 'success' && (
          <>
            <div className="text-center md:text-left">
              <h2 className="font-serif text-2xl font-black text-foreground sm:text-3xl">
                Оформить заказ
              </h2>
              <p className="mt-2 text-sm text-stone-500">
                Заполните форму, и мы возьмем ваш лот в работу. Никаких предоплат на сайте не требуется.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              
              {/* Поле: Имя */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-500">Ваше имя</label>
                <input
                  type="text"
                  required
                  placeholder="Алексей"
                  value={name}
                  onChange={(uniq) => setName(uniq.target.value)}
                  className="mt-1 block w-full rounded-xl border border-card-border bg-background px-4 py-3 text-sm text-foreground focus:border-coffee focus:ring-1 focus:ring-coffee focus:outline-none"
                />
              </div>

              {/* Поле: Телефон с валидацией */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-500">Белорусский телефон</label>
                <input
                  type="tel"
                  required
                  placeholder="+375 (29) 123-45-67"
                  value={phone}
                  onChange={handlePhoneChange}
                  className={`mt-1 block w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground focus:ring-1 focus:outline-none ${
                    phoneError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-card-border focus:border-coffee focus:ring-coffee'
                  }`}
                />
                {phoneError && (
                  <p className="mt-1.5 text-xs text-red-600 font-medium">
                    ⚠️ Пожалуйста, введите корректный номер телефона РБ (+375...)
                  </p>
                )}
              </div>

              {/* Поле: Что интересует (связано с кнопками каталога через id) */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-500">Что вас интересует?</label>
                <select
                  id="interest-select"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="mt-1 block w-full rounded-xl border border-card-border bg-background px-4 py-3 text-sm text-foreground focus:border-coffee focus:ring-1 focus:ring-coffee focus:outline-none"
                >
                  <option value="single">Разовый заказ свежего зерна / дрипов</option>
                  <option value="subscription">Ежемесячная кофейная подписка (54 BYN)</option>
                  <option value="question">Просто задать вопрос мастерам</option>
                </select>
              </div>

              {/* Поле: Способ получения */}
              {interest !== 'question' && (
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-500">Способ получения</label>
                  <div className="mt-1 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setDelivery('pickup')}
                      className={`rounded-xl border p-3 text-xs font-medium transition-all cursor-pointer text-center ${
                        delivery === 'pickup' 
                          ? 'border-coffee bg-amber-50/30 text-coffee font-semibold' 
                          : 'border-card-border bg-background text-stone-600'
                      }`}
                    >
                      🏃‍♂️ Самовывоз (ул. Короля, 9)
                    </button>
                    <button
                      type="button"
                      onClick={() => setDelivery('courier')}
                      className={`rounded-xl border p-3 text-xs font-medium transition-all cursor-pointer text-center ${
                        delivery === 'courier' 
                          ? 'border-coffee bg-amber-50/30 text-coffee font-semibold' 
                          : 'border-card-border bg-background text-stone-600'
                      }`}
                    >
                      🛵 Доставка по Минску
                    </button>
                  </div>
                </div>
              )}

              {/* Поле: Комментарий (заполняется автоматически при клике на сорт кофе) */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-500">Комментарий</label>
                <textarea
                  id="comment-textarea"
                  rows={3}
                  placeholder="Укажите сорт кофе, нужный помол или адрес доставки..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="mt-1 block w-full rounded-xl border border-card-border bg-background px-4 py-3 text-sm text-foreground focus:border-coffee focus:ring-1 focus:ring-coffee focus:outline-none resize-none"
                />
              </div>

                            {/* Поле: Комментарий (заполняется автоматически при клике на сорт кофе) */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-500">Комментарий</label>
                <textarea
                  id="comment-textarea"
                  rows={3}
                  placeholder="Укажите сорт кофе, нужный помол или адрес доставки..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="mt-1 block w-full rounded-xl border border-card-border bg-background px-4 py-3 text-sm text-foreground focus:border-coffee focus:ring-1 focus:ring-coffee focus:outline-none resize-none"
                />
              </div>

              {/* Обработка ошибок сервера (например, если телефон отправлен повторно в течение 10 минут) */}
              {submitStatus === 'error' && (
                <div className="rounded-xl bg-red-50 p-4 border border-red-200">
                  <p className="text-xs text-red-700 leading-relaxed font-medium">
                    {errorMessage}
                  </p>
                </div>
              )}

              {/* Кнопка отправки формы с блокировкой двойного клика */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full rounded-xl py-3.5 text-sm font-bold text-white shadow-xs transition-all focus:outline-none ${
                  isSubmitting 
                    ? 'bg-stone-400 cursor-not-allowed' 
                    : 'bg-coffee hover:bg-coffee-hover cursor-pointer'
                }`}
              >
                {isSubmitting ? 'Отправка заявки...' : 'Подтвердить заказ'}
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}

export const ORDER_PREFILL_EVENT = 'coffee-quart:order-prefill';

export type OrderPrefill = {
  interest: 'single' | 'subscription' | 'question';
  comment?: string;
};

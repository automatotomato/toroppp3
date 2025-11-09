export interface StripeProduct {
  priceId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  mode: 'subscription' | 'payment';
}

export const STRIPE_PRODUCTS: StripeProduct[] = [
  {
    priceId: 'price_1SRP2lP4Be5cIimOVVohq8hw',
    name: 'Advancement Academy',
    description: 'Master cash flow, sales systems, marketing, and leadership through 12 power-packed workshops designed specifically for Toro Tax franchise owners.',
    price: 129.00,
    currency: 'usd',
    mode: 'subscription'
  },
  {
    priceId: 'price_1SRP1XP4Be5cIimOsDfz5M3j',
    name: 'Advancement Academy',
    description: 'Master cash flow, sales systems, marketing, and leadership through 12 power-packed workshops designed specifically for Toro Tax franchise owners.',
    price: 299.00,
    currency: 'usd',
    mode: 'payment'
  }
];

export const getProductByPriceId = (priceId: string): StripeProduct | undefined => {
  return STRIPE_PRODUCTS.find(product => product.priceId === priceId);
};
export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  mode: 'subscription' | 'payment';
}

export const STRIPE_PRODUCTS: Record<string, StripeProduct> = {
  subscription: {
    id: 'prod_TOBPI3Wu71aepy',
    priceId: 'price_1SRP2lP4Be5cIimOVVohq8hw',
    name: 'Advancement Academy Monthly',
    description: 'Master cash flow, sales systems, marketing, and leadership through 12 power-packed workshops designed specifically for Toro Tax franchise owners.',
    price: 129.00,
    currency: 'usd',
    mode: 'subscription'
  },
  registration: {
    id: 'prod_TOBOwdfwjhH5uB',
    priceId: 'price_1SRP1XP4Be5cIimOsDfz5M3j',
    name: 'Advancement Academy Registration',
    description: 'One-time registration fee for Advancement Academy - Master cash flow, sales systems, marketing, and leadership through 12 power-packed workshops designed specifically for Toro Tax franchise owners.',
    price: 299.00,
    currency: 'usd',
    mode: 'payment'
  }
};

export const formatPrice = (price: number, currency: string = 'usd'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(price);
};
export interface Product {
  id: string;
  title: string;
  description: string;
  priceTON: number;
  discountPriceTON: number;
  image: string;
  category: string;
  rating: number;
  sizes: string[];
  colors: { name: string; hex: string }[];
}

export interface Transaction {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  pricePaidTON: number;
  timestamp: string;
  status: 'pending' | 'confirmed' | 'failed';
  txHash: string;
  usedAdDiscount: boolean;
}

export interface User {
  username: string;
  firstName: string;
  telegramId: string;
  isAuthenticated: boolean;
  walletAddress: string | null;
  walletBalanceTON: number;
  adsgramPoints: number;
  watchAdCount: number;
}

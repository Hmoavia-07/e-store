export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: 'Outerwear' | 'Tops' | 'Bottoms' | 'Dresses' | 'Denim';
  tag?: 'Best Seller' | 'New Arrival' | 'Trending' | 'Organic Cotton' | 'Limited Edition';
  description: string;
  details: string[];
  material: string;
  care: string;
  sizes: string[];
  colors: ProductColor[];
  rating: number;
  reviewCount: number;
  stock: number;
  reviews: ProductReview[];
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  selectedSize: string;
  selectedColor: ProductColor;
  quantity: number;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  description: string;
  minSpend?: number;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message: string;
}

export type Currency = 'USD' | 'EUR' | 'GBP' | 'CAD';

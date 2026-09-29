"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, ProductColor, Coupon, ToastMessage, Currency } from '../types/store';
import { VALID_COUPONS } from '../data/products';

interface StoreContextType {
  cart: CartItem[];
  wishlist: number[];
  isCartDrawerOpen: boolean;
  isQuickViewOpen: boolean;
  quickViewProduct: Product | null;
  isSizeGuideOpen: boolean;
  currency: Currency;
  appliedCoupon: Coupon | null;
  toasts: ToastMessage[];
  // Cart Actions
  addToCart: (product: Product, size?: string, color?: ProductColor, quantity?: number) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  // Wishlist Actions
  toggleWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  // Quick View
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  // Size Guide
  openSizeGuide: () => void;
  closeSizeGuide: () => void;
  // Currency & Coupon
  setCurrency: (currency: Currency) => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  formatPrice: (amountInUSD: number) => string;
  // Toast notifications
  addToast: (title: string, message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  // Calculations
  subtotal: number;
  discountAmount: number;
  shippingAmount: number;
  taxAmount: number;
  total: number;
  freeShippingThreshold: number;
  amountAwayFromFreeShipping: number;
  totalCartItemCount: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const CURRENCY_RATES: Record<Currency, { symbol: string; rate: number }> = {
  USD: { symbol: '$', rate: 1.0 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.79 },
  CAD: { symbol: 'CA$', rate: 1.36 }
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [currency, setCurrencyState] = useState<Currency>('USD');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('fashionaura_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('fashionaura_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedCurrency = localStorage.getItem('fashionaura_currency') as Currency;
      if (savedCurrency && CURRENCY_RATES[savedCurrency]) setCurrencyState(savedCurrency);
    } catch {
      // Storage access error handling
    }
    setHydrated(true);
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem('fashionaura_cart', JSON.stringify(cart));
    } catch {
      // Ignore
    }
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem('fashionaura_wishlist', JSON.stringify(wishlist));
    } catch {
      // Ignore
    }
  }, [wishlist, hydrated]);

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    try {
      localStorage.setItem('fashionaura_currency', newCurrency);
    } catch {
      // Ignore
    }
  };

  const addToast = (title: string, message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (product: Product, size?: string, color?: ProductColor, quantity: number = 1) => {
    const chosenSize = size || product.sizes[0] || 'Standard';
    const chosenColor = color || product.colors[0] || { name: 'Default', hex: '#000000' };
    const cartItemId = `${product.id}-${chosenSize}-${chosenColor.name}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          product,
          selectedSize: chosenSize,
          selectedColor: chosenColor,
          quantity
        }
      ];
    });

    addToast(
      'Added to Cart',
      `${product.name} (${chosenSize}, ${chosenColor.name}) was added.`,
      'success'
    );
    setIsCartDrawerOpen(true);
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    addToast('Item Removed', 'The item was removed from your bag.', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast('Removed from Wishlist', 'Item removed from your saved list.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        addToast('Saved to Wishlist', 'Item saved to your wishlist!', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: number) => wishlist.includes(productId);

  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  const openSizeGuide = () => setIsSizeGuideOpen(true);
  const closeSizeGuide = () => setIsSizeGuideOpen(false);
  const openCartDrawer = () => setIsCartDrawerOpen(true);
  const closeCartDrawer = () => setIsCartDrawerOpen(false);

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    const found = VALID_COUPONS.find((c) => c.code === clean);

    if (!found) {
      addToast('Invalid Coupon', 'The promo code entered is not valid.', 'error');
      return { success: false, message: 'Invalid promo code. Try AURA15 or WELCOME10' };
    }

    if (found.minSpend && subtotal < found.minSpend) {
      const msg = `Minimum spend of $${found.minSpend} required for code ${found.code}.`;
      addToast('Coupon Requirement', msg, 'error');
      return { success: false, message: msg };
    }

    setAppliedCoupon(found);
    addToast('Coupon Applied!', `${found.code} applied: ${found.description}`, 'success');
    return { success: true, message: `Coupon applied: ${found.description}` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon Removed', 'Promo code removed from your order.', 'info');
  };

  // Price calculations in USD
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 100;
  const amountAwayFromFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const discountAmount = appliedCoupon ? Math.round((subtotal * appliedCoupon.discountPercent) / 100) : 0;
  const shippingAmount = subtotal === 0 || subtotal >= freeShippingThreshold ? 0 : 12;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxAmount = Math.round(taxableAmount * 0.08 * 100) / 100;
  const total = Math.max(0, taxableAmount + shippingAmount + taxAmount);
  const totalCartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const formatPrice = (amountInUSD: number) => {
    const { symbol, rate } = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
    const converted = amountInUSD * rate;
    return `${symbol}${converted.toFixed(2)}`;
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        isCartDrawerOpen,
        isQuickViewOpen,
        quickViewProduct,
        isSizeGuideOpen,
        currency,
        appliedCoupon,
        toasts,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        openCartDrawer,
        closeCartDrawer,
        toggleWishlist,
        isInWishlist,
        openQuickView,
        closeQuickView,
        openSizeGuide,
        closeSizeGuide,
        setCurrency,
        applyCoupon,
        removeCoupon,
        formatPrice,
        addToast,
        removeToast,
        subtotal,
        discountAmount,
        shippingAmount,
        taxAmount,
        total,
        freeShippingThreshold,
        amountAwayFromFreeShipping,
        totalCartItemCount,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

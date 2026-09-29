"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '../context/StoreContext';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles, Tag, ShieldCheck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartDrawerOpen,
    closeCartDrawer,
    updateCartQuantity,
    removeFromCart,
    formatPrice,
    subtotal,
    discountAmount,
    shippingAmount,
    taxAmount,
    total,
    freeShippingThreshold,
    amountAwayFromFreeShipping,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    totalCartItemCount
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isCartDrawerOpen) return null;

  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  );

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!promoInput.trim()) return;
    const res = applyCoupon(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoInput('');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCartDrawer}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="w-screen max-w-md bg-white dark:bg-neutral-900 shadow-2xl flex flex-col"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-neutral-900 dark:text-white" />
                <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
                  Shopping Bag
                </h2>
                <span className="text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-semibold px-2 py-0.5 rounded-full">
                  {totalCartItemCount}
                </span>
              </div>
              <button
                onClick={closeCartDrawer}
                className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition"
                aria-label="Close cart drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free shipping progress bar */}
            <div className="px-6 py-3.5 bg-neutral-50 dark:bg-neutral-800/40 border-b border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  {amountAwayFromFreeShipping === 0 ? (
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      Unlocked! Free Express Worldwide Shipping
                    </span>
                  ) : (
                    <span>
                      Add <strong>{formatPrice(amountAwayFromFreeShipping)}</strong> more for Free Shipping
                    </span>
                  )}
                </span>
                <span className="font-semibold text-neutral-600 dark:text-neutral-400">
                  {freeShippingProgress}%
                </span>
              </div>
              <div className="w-full bg-neutral-200 dark:bg-neutral-700 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    freeShippingProgress === 100
                      ? 'bg-emerald-500'
                      : 'bg-neutral-900 dark:bg-neutral-200'
                  }`}
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4 text-neutral-400">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">
                    Your bag is empty
                  </h3>
                  <p className="text-xs text-neutral-500 max-w-xs mb-6">
                    Items added to your shopping bag will appear here. Start exploring our latest collections.
                  </p>
                  <button
                    onClick={closeCartDrawer}
                    className="px-6 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full text-xs font-semibold hover:bg-neutral-800 transition"
                  >
                    Explore Catalog
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="flex gap-4 p-3 rounded-xl border border-neutral-100 dark:border-neutral-800 hover:border-neutral-200 dark:hover:border-neutral-700 transition"
                  >
                    <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800 shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/product/${item.product.id}`}
                            onClick={closeCartDrawer}
                            className="text-sm font-semibold text-neutral-900 dark:text-white hover:underline line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.cartItemId)}
                            className="text-neutral-400 hover:text-rose-500 transition p-1"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-neutral-500 mt-1">
                          <span>Size: <strong>{item.selectedSize}</strong></span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-neutral-300"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            {item.selectedColor.name}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="inline-flex items-center border border-neutral-200 dark:border-neutral-700 rounded-md">
                          <button
                            onClick={() => updateCartQuantity(item.cartItemId, -1)}
                            className="px-2 py-0.5 text-xs text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-semibold text-neutral-900 dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.cartItemId, 1)}
                            className="px-2 py-0.5 text-xs text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-sm font-bold text-neutral-900 dark:text-white">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900 space-y-4">
                {/* Coupon applicator */}
                <div>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-2.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs">
                      <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-medium">
                        <Tag className="w-3.5 h-3.5" />
                        <span>Code <strong>{appliedCoupon.code}</strong> applied (-{appliedCoupon.discountPercent}%)</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-emerald-700 hover:text-emerald-950 dark:hover:text-white font-bold underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Promo code (e.g. AURA15)"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        className="flex-1 px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white uppercase focus:outline-none focus:ring-1 focus:ring-black"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg text-xs font-semibold hover:bg-neutral-800 transition"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                  {promoError && (
                    <p className="text-[11px] text-rose-500 mt-1">{promoError}</p>
                  )}
                </div>

                {/* Subtotals breakdown */}
                <div className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-neutral-900 dark:text-white">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                      <span>Discount ({appliedCoupon?.code})</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span>
                      {shippingAmount === 0 ? (
                        <span className="text-emerald-600 font-medium">FREE</span>
                      ) : (
                        formatPrice(shippingAmount)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Sales Tax (8%)</span>
                    <span>{formatPrice(taxAmount)}</span>
                  </div>
                  <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 flex justify-between text-sm font-bold text-neutral-900 dark:text-white">
                    <span>Estimated Total</span>
                    <span className="text-base">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Primary Buttons */}
                <div className="space-y-2">
                  <Link
                    href="/checkout"
                    onClick={closeCartDrawer}
                    className="w-full bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 py-3.5 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition shadow-lg text-sm"
                  >
                    Secure Checkout <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/cart"
                    onClick={closeCartDrawer}
                    className="w-full py-2.5 px-4 rounded-xl text-center text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition block"
                  >
                    View Bag & Edit Quantities
                  </Link>
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                  <span>256-bit encrypted checkout with 30-day money-back guarantee</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

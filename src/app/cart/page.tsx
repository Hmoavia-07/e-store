"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '../../context/StoreContext';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Tag,
  ShieldCheck,
  Truck,
  RotateCcw
} from 'lucide-react';

export default function CartPage() {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
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
  const [orderNote, setOrderNote] = useState('');

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

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center max-w-lg">
        <div className="w-20 h-20 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto mb-6 text-neutral-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold font-serif uppercase tracking-tight text-neutral-900 dark:text-white mb-2">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-xs text-neutral-500 mb-8 leading-relaxed">
          Looks like you haven&apos;t added any bespoke garments to your bag yet. Explore our latest arrivals and timeless staples.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" /> Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-neutral-200 dark:border-neutral-800 gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-neutral-500">
            Review Bag
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif uppercase tracking-tight text-neutral-950 dark:text-white mt-1">
            Shopping Bag ({totalCartItemCount} {totalCartItemCount === 1 ? 'Piece' : 'Pieces'})
          </h1>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-neutral-400 hover:text-rose-500 transition underline w-fit"
        >
          Clear all items
        </button>
      </div>

      {/* Free Shipping Milestone */}
      <div className="bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-sm max-w-4xl">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-semibold text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            {amountAwayFromFreeShipping === 0 ? (
              <span className="text-emerald-600 font-bold">
                Unlocked! Free Worldwide Express Shipping on this order.
              </span>
            ) : (
              <span>
                Add <strong>{formatPrice(amountAwayFromFreeShipping)}</strong> more to receive Free Worldwide Express Shipping.
              </span>
            )}
          </span>
          <span className="font-bold text-neutral-600">{freeShippingProgress}%</span>
        </div>
        <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              freeShippingProgress === 100 ? 'bg-emerald-500' : 'bg-neutral-950 dark:bg-white'
            }`}
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      {/* Main Grid: Items Table vs Summary Card */}
      <div className="grid lg:grid-cols-12 gap-10 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 divide-y divide-neutral-100 dark:divide-neutral-800 overflow-hidden shadow-sm">
            {cart.map((item) => (
              <div
                key={item.cartItemId}
                className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 justify-between"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                      {item.product.category}
                    </span>
                    <Link
                      href={`/product/${item.product.id}`}
                      className="block text-sm sm:text-base font-bold text-neutral-900 dark:text-white hover:underline truncate"
                    >
                      {item.product.name}
                    </Link>
                    <div className="flex items-center gap-3 text-xs text-neutral-500">
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
                    <p className="text-xs text-neutral-500 sm:hidden">
                      Unit: {formatPrice(item.product.price)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-100 dark:border-neutral-800">
                  {/* Stepper */}
                  <div className="inline-flex items-center border border-neutral-200 dark:border-neutral-700 rounded-lg">
                    <button
                      onClick={() => updateCartQuantity(item.cartItemId, -1)}
                      className="px-3 py-1 text-xs text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-bold text-neutral-900 dark:text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.cartItemId, 1)}
                      className="px-3 py-1 text-xs text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
                    >
                      +
                    </button>
                  </div>

                  <span className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white min-w-[70px] text-right">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>

                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="p-2 text-neutral-400 hover:text-rose-500 transition"
                    aria-label="Remove item"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery & Special Instructions Note */}
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-sm space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
              Special Delivery Note (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="Gate code, gift packaging message, or delivery instructions..."
              value={orderNote}
              onChange={(e) => setOrderNote(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none"
            />
          </div>
        </div>

        {/* Order Summary Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-sm space-y-6 sticky top-28">
            <h2 className="text-lg font-bold font-serif uppercase tracking-tight text-neutral-950 dark:text-white pb-3 border-b border-neutral-100 dark:border-neutral-800">
              Order Summary
            </h2>

            {/* Promo Code input */}
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2">
                Promotional Code
              </span>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs">
                  <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-semibold">
                    <Tag className="w-4 h-4" />
                    <span>{appliedCoupon.code} (-{appliedCoupon.discountPercent}%)</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-emerald-700 font-bold hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code (e.g. AURA15)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="flex-1 px-3 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 uppercase focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 rounded-xl text-xs font-bold uppercase hover:bg-neutral-800 transition"
                  >
                    Apply
                  </button>
                </form>
              )}
              {promoError && (
                <p className="text-[11px] text-rose-500 mt-1">{promoError}</p>
              )}
              <div className="mt-2 flex gap-1.5 flex-wrap">
                <span className="text-[10px] text-neutral-400">Available:</span>
                <button
                  type="button"
                  onClick={() => applyCoupon('AURA15')}
                  className="text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200"
                >
                  AURA15 (15% off)
                </button>
                <button
                  type="button"
                  onClick={() => applyCoupon('WELCOME10')}
                  className="text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200"
                >
                  WELCOME10 (10% off)
                </button>
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400 pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <div className="flex justify-between">
                <span>Subtotal ({totalCartItemCount} items)</span>
                <span className="font-semibold text-neutral-900 dark:text-white">
                  {formatPrice(subtotal)}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Discount ({appliedCoupon?.code})</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shippingAmount === 0 ? (
                    <span className="text-emerald-600 font-semibold">FREE</span>
                  ) : (
                    formatPrice(shippingAmount)
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Sales Tax (8%)</span>
                <span>{formatPrice(taxAmount)}</span>
              </div>

              <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex justify-between text-base font-bold text-neutral-900 dark:text-white">
                <span>Total Amount</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <div className="space-y-3 pt-2">
              <Link
                href="/checkout"
                className="w-full bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 py-4 px-6 rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition shadow-xl"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/products"
                className="block text-center text-xs font-semibold text-neutral-500 hover:text-black dark:hover:text-white transition"
              >
                &larr; Continue Exploring Catalog
              </Link>
            </div>

            {/* Trust points */}
            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-2 text-[11px] text-neutral-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-neutral-700 dark:text-neutral-300 shrink-0" />
                <span>Encrypted 256-bit SSL transaction</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-neutral-700 dark:text-neutral-300 shrink-0" />
                <span>Carbon-neutral insured transit</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-neutral-700 dark:text-neutral-300 shrink-0" />
                <span>30-day effortless return guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

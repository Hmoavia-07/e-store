"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '../context/StoreContext';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Heart, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { ProductColor } from '../types/store';

export const QuickViewModal: React.FC = () => {
  const {
    isQuickViewOpen,
    quickViewProduct,
    closeQuickView,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatPrice,
    openSizeGuide
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Sync state whenever quickViewProduct changes
  useEffect(() => {
    if (quickViewProduct) {
      setActiveImageIndex(0);
      setSelectedSize(quickViewProduct.sizes[0] || 'Standard');
      setSelectedColor(quickViewProduct.colors[0] || null);
      setQuantity(1);
    }
  }, [quickViewProduct]);

  if (!isQuickViewOpen || !quickViewProduct) return null;

  const product = quickViewProduct;
  const isSaved = isInWishlist(product.id);
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!selectedColor) return;
    addToCart(product, selectedSize, selectedColor, quantity);
    closeQuickView();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeQuickView}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative z-10 bg-white dark:bg-neutral-900 w-full max-w-4xl rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden max-h-[92vh] flex flex-col md:flex-row"
        >
          {/* Close button */}
          <button
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 dark:bg-neutral-800/90 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white shadow-md backdrop-blur-sm transition"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Gallery */}
          <div className="md:w-1/2 bg-neutral-100 dark:bg-neutral-800/50 p-6 flex flex-col justify-between">
            <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 shadow-inner">
              <Image
                src={product.images[activeImageIndex] || product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />

              {product.tag && (
                <span className="absolute top-3 left-3 bg-black/85 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  {product.tag}
                </span>
              )}

              {discountPercent > 0 && (
                <span className="absolute top-3 right-3 bg-rose-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  -{discountPercent}%
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-20 rounded-lg overflow-hidden border-2 transition shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-neutral-900 dark:border-white shadow-sm'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} thumb ${idx}`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info & Selectors */}
          <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-semibold tracking-widest text-neutral-500">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-amber-500 text-xs font-medium">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-neutral-400">({product.reviewCount} reviews)</span>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mt-1">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-2">
                <span className="text-2xl font-extrabold text-neutral-900 dark:text-white">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-neutral-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.stock <= 10 && (
                  <span className="text-xs font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                    Only {product.stock} remaining
                  </span>
                )}
              </div>

              <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-3 leading-relaxed">
                {product.description}
              </p>

              {/* Color Selection */}
              <div className="mt-5">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wide">
                    Color: <span className="font-normal text-neutral-900 dark:text-white">{selectedColor?.name}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      title={color.name}
                      className={`relative w-8 h-8 rounded-full transition p-0.5 border ${
                        selectedColor?.name === color.name
                          ? 'ring-2 ring-neutral-900 dark:ring-white ring-offset-2 dark:ring-offset-neutral-900'
                          : 'border-neutral-300 hover:scale-105'
                      }`}
                    >
                      <span
                        className="block w-full h-full rounded-full shadow-inner"
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mt-5">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wide">
                    Select Size
                  </span>
                  <button
                    onClick={openSizeGuide}
                    className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white underline decoration-dotted transition"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition ${
                        selectedSize === size
                          ? 'bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-neutral-900 dark:border-white shadow-sm'
                          : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:border-neutral-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="mt-5 flex items-center gap-4">
                <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wide">
                  Quantity
                </span>
                <div className="inline-flex items-center border border-neutral-200 dark:border-neutral-700 rounded-lg">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="px-3 py-1.5 text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white disabled:opacity-30"
                  >
                    -
                  </button>
                  <span className="px-3 text-sm font-semibold text-neutral-900 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    disabled={quantity >= product.stock}
                    className="px-3 py-1.5 text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white disabled:opacity-30"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-3">
              <div className="flex gap-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 py-3.5 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Bag • {formatPrice(product.price * quantity)}
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3.5 rounded-xl border transition ${
                    isSaved
                      ? 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/40 dark:border-rose-900'
                      : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 hover:text-neutral-900 dark:text-neutral-300'
                  }`}
                  aria-label="Save to wishlist"
                >
                  <Heart className={`w-5 h-5 ${isSaved ? 'fill-rose-600' : ''}`} />
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-neutral-500 pt-2">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300" />
                  <span>Free express shipping over $100</span>
                </div>
                <Link
                  href={`/product/${product.id}`}
                  onClick={closeQuickView}
                  className="inline-flex items-center gap-1 font-semibold text-neutral-900 dark:text-white hover:underline"
                >
                  Full details <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

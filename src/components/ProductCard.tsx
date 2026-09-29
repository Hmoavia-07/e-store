"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../types/store';
import { useStore } from '../context/StoreContext';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    openQuickView,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatPrice
  } = useStore();

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const isSaved = isInWishlist(product.id);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleQuickAdd = (size: string) => {
    addToCart(product, size, product.colors[selectedColorIndex]);
    setQuickAddOpen(false);
  };

  return (
    <div className="group relative flex flex-col bg-white dark:bg-neutral-900 rounded-xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800 hover:shadow-xl transition-all duration-300">
      {/* Product Image Frame */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        <Link href={`/product/${product.id}`} className="block w-full h-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.tag && (
            <span className="bg-neutral-950/85 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              {product.tag}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-rose-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full w-fit">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist toggle */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-20 p-2.5 rounded-full backdrop-blur-md transition shadow-sm ${
            isSaved
              ? 'bg-white text-rose-600 shadow-md'
              : 'bg-white/80 hover:bg-white text-neutral-600 hover:text-black dark:bg-neutral-900/80 dark:text-neutral-300 dark:hover:bg-neutral-900'
          }`}
          aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-600 text-rose-600' : ''}`} />
        </button>

        {/* Quick Actions overlay on hover */}
        <div className="absolute inset-x-3 bottom-3 z-20 flex flex-col gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          {quickAddOpen ? (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md p-2.5 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700"
            >
              <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-500 mb-1.5 px-1">
                <span>Select Size:</span>
                <button
                  onClick={() => setQuickAddOpen(false)}
                  className="hover:text-black dark:hover:text-white"
                >
                  Cancel
                </button>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleQuickAdd(size)}
                    className="py-1 text-xs font-semibold bg-neutral-100 hover:bg-black hover:text-white dark:bg-neutral-800 dark:hover:bg-white dark:hover:text-black rounded transition text-neutral-800 dark:text-neutral-200"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  openQuickView(product);
                }}
                className="flex-1 py-2.5 px-3 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md text-neutral-900 dark:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 transition"
              >
                <Eye className="w-3.5 h-3.5" />
                Quick View
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  setQuickAddOpen(true);
                }}
                className="p-2.5 bg-neutral-950 text-white rounded-xl shadow-md hover:bg-neutral-800 transition"
                aria-label="Quick Add"
                title="Quick Add"
              >
                <ShoppingBag className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-neutral-500 mb-1">
            <span className="uppercase tracking-wider font-semibold">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-medium">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-neutral-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <Link
            href={`/product/${product.id}`}
            className="text-sm font-semibold text-neutral-900 dark:text-white hover:underline line-clamp-1 group-hover:text-neutral-700 transition"
          >
            {product.name}
          </Link>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-1.5">
            <span className="text-base font-bold text-neutral-900 dark:text-white">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-neutral-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Color swatches */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800">
            {product.colors.map((color, idx) => (
              <button
                key={color.name}
                onClick={() => setSelectedColorIndex(idx)}
                title={color.name}
                className={`w-3.5 h-3.5 rounded-full border transition ${
                  selectedColorIndex === idx
                    ? 'ring-1 ring-neutral-900 dark:ring-white scale-110'
                    : 'border-neutral-300 opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: color.hex }}
                aria-label={color.name}
              />
            ))}
            <span className="text-[10px] text-neutral-400 ml-1">
              {product.colors[selectedColorIndex].name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

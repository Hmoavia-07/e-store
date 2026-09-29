"use client";
import React from 'react';
import Link from 'next/link';
import { useStore } from '../../context/StoreContext';
import { products } from '../../data/products';
import { ProductCard } from '../../components/ProductCard';
import { Heart, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist, addToCart, addToast } = useStore();

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleMoveAllToCart = () => {
    savedProducts.forEach((p) => {
      addToCart(p, p.sizes[0], p.colors[0], 1);
    });
    addToast('Moved to Bag', `Added ${savedProducts.length} items to your shopping bag!`, 'success');
  };

  if (savedProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto mb-6 text-neutral-400">
          <Heart className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold font-serif uppercase tracking-tight text-neutral-900 dark:text-white mb-2">
          Your Saved List is Empty
        </h1>
        <p className="text-xs text-neutral-500 mb-8 leading-relaxed">
          Keep track of your coveted silhouettes by clicking the heart icon on any piece across our collection.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" /> Explore Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-neutral-200 dark:border-neutral-800 gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-neutral-500">
            Curated Wishlist
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif uppercase tracking-tight text-neutral-950 dark:text-white mt-1">
            Saved Items ({savedProducts.length})
          </h1>
        </div>

        <button
          onClick={handleMoveAllToCart}
          className="px-6 py-3 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition shadow-md flex items-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" /> Move All to Bag
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {savedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { products } from '../../../data/products';
import { ProductCard } from '../../../components/ProductCard';
import { useStore } from '../../../context/StoreContext';
import { ProductColor, ProductReview } from '../../../types/store';
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  RotateCcw,
  Ruler,
  ChevronRight,
  CheckCircle2,
  Share2
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const idStr = Array.isArray(params.id) ? params.id[0] : params.id;
  const productId = parseInt(idStr || '1', 10);

  const product = products.find((p) => p.id === productId);

  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatPrice,
    openSizeGuide,
    addToast
  } = useStore();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product?.colors[0] || { name: 'Default', hex: '#000000' }
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'care' | 'shipping'>('details');

  // Review submission state
  const [reviewsList, setReviewsList] = useState<ProductReview[]>(product?.reviews || []);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Garment Not Found</h1>
        <p className="text-neutral-500 mb-8">The requested silhouette does not exist in our catalog.</p>
        <Link href="/products" className="px-6 py-3 bg-black text-white rounded-full text-xs font-semibold">
          Return to Collections
        </Link>
      </div>
    );
  }

  const isSaved = isInWishlist(product.id);
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Recommendations: other products in same category or adjacent
  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      addToast('Link Copied', 'Product link copied to your clipboard.', 'info');
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor || !reviewComment) return;

    const newRev: ProductReview = {
      id: Date.now().toString(),
      author: reviewAuthor,
      rating: reviewRating,
      date: 'Just now',
      comment: reviewComment,
      verified: true
    };

    setReviewsList((prev) => [newRev, ...prev]);
    setReviewSubmitted(true);
    addToast('Review Published', 'Thank you for your feedback!', 'success');
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-16">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-neutral-500">
        <Link href="/" className="hover:text-black dark:hover:text-white transition">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/products" className="hover:text-black dark:hover:text-white transition">Collections</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={`/products?category=${product.category}`} className="hover:text-black dark:hover:text-white transition">
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-neutral-900 dark:text-white font-medium truncate max-w-xs">
          {product.name}
        </span>
      </nav>

      {/* Main Product Showcase */}
      <div className="grid lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 shadow-md">
            <Image
              src={product.images[activeImageIdx] || product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.tag && (
                <span className="bg-neutral-950/85 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {product.tag}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="bg-rose-600 text-white text-xs font-extrabold px-2.5 py-1 rounded-full w-fit">
                  Save {discountPercent}%
                </span>
              )}
            </div>

            <button
              onClick={handleShare}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/80 hover:bg-white text-neutral-700 hover:text-black dark:bg-neutral-900/80 dark:text-neutral-200 backdrop-blur-md transition shadow-sm"
              aria-label="Share product"
              title="Share product link"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Thumbnails list */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIdx(i)}
                  className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 transition shrink-0 ${
                    activeImageIdx === i
                      ? 'border-neutral-950 dark:border-white shadow-md'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Garment Information & Purchase Box */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
              <span className="uppercase tracking-widest font-semibold">{product.category}</span>
              <a href="#reviews" className="flex items-center gap-1 text-amber-500 font-semibold hover:underline">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{product.rating}</span>
                <span className="text-neutral-400">({reviewsList.length} reviews)</span>
              </a>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold font-serif uppercase tracking-tight text-neutral-950 dark:text-white">
              {product.name}
            </h1>

            {/* Price Box */}
            <div className="flex items-baseline gap-3 mt-3">
              <span className="text-2xl font-black text-neutral-950 dark:text-white">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-neutral-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.stock <= 10 && (
                <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                  Only {product.stock} items remaining
                </span>
              )}
            </div>
          </div>

          <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {product.description}
          </p>

          {/* Color Selector */}
          <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wide">
                Color: <strong className="text-neutral-950 dark:text-white">{selectedColor.name}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  title={color.name}
                  className={`w-9 h-9 rounded-full transition p-0.5 border ${
                    selectedColor.name === color.name
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

          {/* Size Selector */}
          <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wide">
                Select Size: <strong className="text-neutral-950 dark:text-white">{selectedSize}</strong>
              </span>
              <button
                onClick={openSizeGuide}
                className="inline-flex items-center gap-1 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white underline decoration-dotted transition"
              >
                <Ruler className="w-3.5 h-3.5" /> Size Guide
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2.5 text-xs font-bold rounded-xl border transition ${
                    selectedSize === size
                      ? 'bg-neutral-950 text-white border-neutral-950 dark:bg-white dark:text-neutral-950 dark:border-white shadow-md'
                      : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:border-neutral-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Add to Bag */}
          <div className="space-y-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
            <div className="flex gap-3">
              {/* Stepper */}
              <div className="inline-flex items-center border border-neutral-200 dark:border-neutral-700 rounded-xl px-2">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="px-2.5 py-2 text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white disabled:opacity-30 text-sm"
                >
                  -
                </button>
                <span className="px-3 text-sm font-bold text-neutral-900 dark:text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  disabled={quantity >= product.stock}
                  className="px-2.5 py-2 text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white disabled:opacity-30 text-sm"
                >
                  +
                </button>
              </div>

              {/* Add to bag button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition shadow-xl"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Bag &bull; {formatPrice(product.price * quantity)}
              </button>

              {/* Wishlist toggle */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3.5 rounded-xl border transition ${
                  isSaved
                    ? 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/40 dark:border-rose-900'
                    : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 hover:text-neutral-900 dark:text-neutral-300'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-rose-600 text-rose-600' : ''}`} />
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-2 gap-3 pt-3 text-[11px] text-neutral-600 dark:text-neutral-400">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-neutral-800 dark:text-neutral-200 shrink-0" />
                <span>Free express shipping over $100</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-neutral-800 dark:text-neutral-200 shrink-0" />
                <span>30-day effortless returns</span>
              </div>
            </div>
          </div>

          {/* Accordion Details Tabs */}
          <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
            <div className="flex gap-4 border-b border-neutral-200 dark:border-neutral-800 text-xs font-semibold uppercase tracking-wider">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-2.5 transition border-b-2 ${
                  activeTab === 'details'
                    ? 'border-neutral-900 dark:border-white text-neutral-900 dark:text-white'
                    : 'border-transparent text-neutral-500 hover:text-neutral-800'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('care')}
                className={`pb-2.5 transition border-b-2 ${
                  activeTab === 'care'
                    ? 'border-neutral-900 dark:border-white text-neutral-900 dark:text-white'
                    : 'border-transparent text-neutral-500 hover:text-neutral-800'
                }`}
              >
                Material & Care
              </button>
              <button
                onClick={() => setActiveTab('shipping')}
                className={`pb-2.5 transition border-b-2 ${
                  activeTab === 'shipping'
                    ? 'border-neutral-900 dark:border-white text-neutral-900 dark:text-white'
                    : 'border-transparent text-neutral-500 hover:text-neutral-800'
                }`}
              >
                Shipping & Returns
              </button>
            </div>

            <div className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed py-2">
              {activeTab === 'details' && (
                <ul className="space-y-1.5 list-disc list-inside">
                  {product.details.map((d, idx) => (
                    <li key={idx}>{d}</li>
                  ))}
                </ul>
              )}

              {activeTab === 'care' && (
                <div className="space-y-2">
                  <p><strong>Composition:</strong> {product.material}</p>
                  <p><strong>Care Instructions:</strong> {product.care}</p>
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="space-y-2">
                  <p>Orders are dispatched in carbon-neutral, FSC-certified compostable packaging within 24 hours.</p>
                  <p>Express courier delivers in 2-4 business days worldwide. Try at home risk-free with prepaid return labels.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews & Feedback */}
      <section id="reviews" className="pt-10 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-neutral-500">
                Client Experiences
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif uppercase tracking-tight text-neutral-950 dark:text-white mt-1">
                Reviews & Ratings
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-amber-500 text-lg font-bold">
                <Star className="w-5 h-5 fill-amber-400" />
                <span>{product.rating}</span>
                <span className="text-xs text-neutral-400 font-normal">out of 5.0</span>
              </div>
              <span className="text-xs text-neutral-400">({reviewsList.length} verified ratings)</span>
            </div>
          </div>

          {/* Write Review Form */}
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-white mb-4">
              Share Your Experience
            </h3>

            {reviewSubmitted ? (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Your review has been successfully posted below. Thank you!</span>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={reviewAuthor}
                      onChange={(e) => setReviewAuthor(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      Rating
                    </label>
                    <select
                      value={reviewRating}
                      onChange={(e) => setReviewRating(parseInt(e.target.value, 10))}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none"
                    >
                      <option value={5}>5 Stars - Outstanding Quality</option>
                      <option value={4}>4 Stars - Great Fit & Material</option>
                      <option value={3}>3 Stars - Good Average</option>
                      <option value={2}>2 Stars - Subpar</option>
                      <option value={1}>1 Star - Dissatisfied</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Your Review
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="How did this garment fit? How does the fabric feel?"
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition"
                >
                  Submit Verified Review
                </button>
              </form>
            )}
          </div>

          {/* Reviews list */}
          <div className="space-y-4">
            {reviewsList.map((rev) => (
              <div
                key={rev.id}
                className="p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-neutral-900 dark:text-white">
                      {rev.author}
                    </span>
                    {rev.verified && (
                      <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.2 rounded-full">
                        <CheckCircle2 className="w-2.5 h-2.5" /> Verified Purchase
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-neutral-400">{rev.date}</span>
                </div>

                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Silhouettes */}
      <section className="pt-10 border-t border-neutral-200 dark:border-neutral-800">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-neutral-500">
              Complete the Aesthetic
            </span>
            <h2 className="text-2xl font-bold font-serif uppercase tracking-tight text-neutral-950 dark:text-white mt-1">
              You May Also Appreciate
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white hover:underline"
          >
            Explore All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relProduct) => (
            <ProductCard key={relProduct.id} product={relProduct} />
          ))}
        </div>
      </section>
    </div>
  );
}

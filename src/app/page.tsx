"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../context/StoreContext';
import {
  ArrowRight,
  Sparkles,
  SlidersHorizontal,
  Star,
  Quote,
  CheckCircle2,
  ShieldCheck,
  Leaf,
  Layers,
  ShoppingBag
} from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  const { openQuickView, applyCoupon } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [filterSearch, setFilterSearch] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterDone, setNewsletterDone] = useState(false);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory =
          selectedCategory === 'All'
            ? true
            : selectedCategory === 'Best Sellers'
            ? p.tag === 'Best Seller'
            : selectedCategory === 'Trending'
            ? p.tag === 'Trending'
            : p.category === selectedCategory;

        const matchesSearch =
          p.name.toLowerCase().includes(filterSearch.toLowerCase()) ||
          p.description.toLowerCase().includes(filterSearch.toLowerCase());

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // 'featured' retains natural curated order
      });
  }, [selectedCategory, sortBy, filterSearch]);

  const categoriesList = ['All', 'Best Sellers', 'Trending', 'Outerwear', 'Denim', 'Tops', 'Dresses'];

  const spotlightProduct = products[0]; // Artisan Leather Jacket

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    applyCoupon('AURA15');
    setNewsletterDone(true);
  };

  return (
    <div className="space-y-16 md:space-y-24">
      {/* Editorial Hero Banner */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-neutral-950 text-white">
        {/* Background Image with subtle zoom */}
        <div className="absolute inset-0">
          <Image
            src="/images/jjj.jpg"
            alt="FashionAura Minimalist Collection"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-45 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-black/60" />
        </div>

        {/* Hero Content */}
        <div className="relative container mx-auto px-4 py-20 text-center z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs tracking-widest uppercase font-semibold text-neutral-200 mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Autumn / Winter 2026 Collection</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-serif uppercase leading-[1.08] mb-6"
          >
            Architectural Simplicity. <br />
            <span className="font-light italic text-neutral-300">Timeless Elegance.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-neutral-300 font-light max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Explore our curated wardrobe of organic selvedge denim, sculptural leather, and Grade-A cashmere essentials engineered for mindful longevity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#curated-catalog"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-neutral-950 font-bold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 group"
            >
              Explore Collection
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              href="/about"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 font-semibold text-xs uppercase tracking-widest transition-all"
            >
              Our Craftsmanship Story
            </Link>
          </motion.div>

          {/* Social Proof stats */}
          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto mt-14 pt-10 border-t border-white/15 text-center">
            <div>
              <p className="text-xl sm:text-2xl font-bold font-serif">4.9 / 5.0</p>
              <p className="text-[11px] text-neutral-400 uppercase tracking-wider mt-0.5">Verified Reviews</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold font-serif">100%</p>
              <p className="text-[11px] text-neutral-400 uppercase tracking-wider mt-0.5">Organic & Ethical</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold font-serif">30-Day</p>
              <p className="text-[11px] text-neutral-400 uppercase tracking-wider mt-0.5">Complimentary Returns</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Story / Visual Quick Nav */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 pb-4 border-b border-neutral-200 dark:border-neutral-800 gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-neutral-500">
              Curated Divisions
            </span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight font-serif uppercase text-neutral-950 dark:text-white mt-1">
              Shop by Wardrobe Segment
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white hover:underline"
          >
            View all 12 pieces <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              title: "Outerwear & Leather",
              count: "3 Silhouettes",
              image: "/images/ltr.jpg",
              href: "/products?category=Outerwear"
            },
            {
              title: "Selvedge Denim",
              count: "2 Silhouettes",
              image: "/images/hhh.jpg",
              href: "/products?category=Denim"
            },
            {
              title: "Fine Knits & Tops",
              count: "4 Silhouettes",
              image: "/images/ovr.jpg",
              href: "/products?category=Tops"
            },
            {
              title: "Tailored Trousers",
              count: "2 Silhouettes",
              image: "/images/chin.jpg",
              href: "/products?category=Bottoms"
            }
          ].map((cat, i) => (
            <Link
              key={i}
              href={cat.href}
              className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-neutral-900 shadow-md block"
            >
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out opacity-85 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase font-semibold text-neutral-300 tracking-wider">
                  {cat.count}
                </span>
                <h3 className="text-base font-bold font-serif mt-0.5 group-hover:translate-x-1 transition-transform">
                  {cat.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Main Curated Products Section with Interactive Filtering */}
      <section id="curated-catalog" className="container mx-auto px-4 scroll-mt-24">
        {/* Section Heading & Controls */}
        <div className="space-y-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-neutral-500">
                Atelier Catalog
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-serif uppercase text-neutral-950 dark:text-white mt-1">
                Featured Essentials
              </h2>
            </div>

            {/* Filter Search Input */}
            <div className="w-full md:w-72">
              <input
                type="text"
                placeholder="Filter by keyword..."
                value={filterSearch}
                onChange={(e) => setFilterSearch(e.target.value)}
                className="w-full py-2 px-4 text-xs rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
          </div>

          {/* Filter Pills & Sort Select */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-neutral-200/80 dark:border-neutral-800">
            {/* Category tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              {categoriesList.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition ${
                    selectedCategory === cat
                      ? 'bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 shadow-sm'
                      : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sorting */}
            <div className="flex items-center gap-2 text-xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400" />
              <span className="text-neutral-500 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc' | 'rating')}
                aria-label="Sort products"
                className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-neutral-800 dark:text-neutral-200 focus:outline-none"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white dark:bg-neutral-900 p-16 rounded-2xl text-center border border-neutral-200 dark:border-neutral-800 max-w-lg mx-auto">
            <ShoppingBag className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">
              No matching pieces found
            </h3>
            <p className="text-xs text-neutral-500 mt-1 mb-6">
              Try adjusting your filter keyword or exploring another garment division.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setFilterSearch('');
              }}
              className="px-6 py-2.5 bg-neutral-950 text-white rounded-full text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Editorial Spotlight Banner */}
      <section className="container mx-auto px-4">
        <div className="bg-neutral-900 text-white rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-12 items-stretch">
          <div className="md:col-span-6 relative min-h-[380px] md:min-h-[500px]">
            <Image
              src={spotlightProduct.image}
              alt="Spotlight Collection - Artisan Leather Biker Jacket"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent md:hidden" />
          </div>

          <div className="md:col-span-6 p-8 md:p-14 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>Iconic Spotlight of the Season</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold font-serif uppercase tracking-tight leading-tight">
              {spotlightProduct.name}
            </h2>

            <p className="text-sm text-neutral-300 leading-relaxed">
              {spotlightProduct.description} Built using heritage Italian vegetable tanning methods that produce a natural patina evolving uniquely over decades of wear.
            </p>

            <div className="grid grid-cols-2 gap-4 py-2 border-y border-neutral-800 text-xs text-neutral-300">
              <div>
                <p className="font-bold text-white uppercase tracking-wider">Material</p>
                <p className="text-neutral-400 mt-0.5">{spotlightProduct.material}</p>
              </div>
              <div>
                <p className="font-bold text-white uppercase tracking-wider">Customer Rating</p>
                <div className="flex items-center gap-1 text-amber-400 mt-0.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="font-bold text-white">{spotlightProduct.rating}</span>
                  <span className="text-neutral-400">({spotlightProduct.reviewCount} reviews)</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => openQuickView(spotlightProduct)}
                className="px-8 py-3.5 bg-white text-neutral-950 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-neutral-200 transition shadow-lg flex items-center gap-2"
              >
                Quick View & Order
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href={`/product/${spotlightProduct.id}`}
                className="px-6 py-3.5 rounded-full border border-neutral-700 hover:border-white text-xs font-semibold uppercase tracking-wider transition"
              >
                Full Specifications
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainable Craftsmanship & Values */}
      <section className="bg-white dark:bg-neutral-900/60 py-16 md:py-20 border-y border-neutral-200/80 dark:border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase font-bold tracking-widest text-neutral-500">
              The Aura Constitution
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif uppercase tracking-tight mt-1 text-neutral-950 dark:text-white">
              Conscious Craftsmanship
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-3 leading-relaxed">
              We reject rapid disposable cycles. Each piece is designed to endure through seasonless versatility, zero waste pattern cutting, and responsible fair-wage ateliers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-neutral-950 text-white flex items-center justify-center">
                <Leaf className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                100% GOTS Certified Organic
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                From long-staple cotton tees to Japanese selvedge denim, our yarns require 91% less water and eliminate all synthetic pesticides.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-neutral-950 text-white flex items-center justify-center">
                <Layers className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                Architectural Proportions
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Sculptural cuts designed to drape effortlessly over diverse body profiles, engineered with reinforced bar tacks and YKK metal hardware.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-neutral-950 text-white flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-sky-400" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                Lifetime Repair Commitment
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Every FashionAura garment includes complimentary hardware and seam repairs within 24 months of purchase to keep garments in perpetual circulation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Editorial Customer Reviews */}
      <section className="container mx-auto px-4">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-neutral-500">
            Client Testimonials
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-serif uppercase tracking-tight mt-1 text-neutral-950 dark:text-white">
            Appreciated by Tastemakers
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              author: "Claire De La Tour",
              title: "Creative Director, Studio Monolith",
              rating: 5,
              text: "The Biker Jacket feels like something from a runway presentation in Milan. Heavy, buttery leather, precision stitching. A masterpiece.",
              item: "Artisan Leather Biker Jacket"
            },
            {
              author: "Julian Vance",
              title: "Architect & Collector",
              rating: 5,
              text: "Japanese selvedge denim with true shuttle-loom redlines at under $100 is unheard of today. The fit through the hips and thighs is exceptionally sharp.",
              item: "Selvedge Raw Denim Jacket"
            },
            {
              author: "Sophia Sterling",
              title: "Editorial Stylist",
              rating: 5,
              text: "The cashmere oversized knit is effortlessly drapey without feeling bulky. You can tell they obsessed over every seam.",
              item: "Cashmere-Blend Oversized Knit"
            }
          ].map((rev, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between space-y-4 shadow-sm"
            >
              <div>
                <Quote className="w-8 h-8 text-neutral-200 dark:text-neutral-700 mb-2" />
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed italic">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900 dark:text-white">{rev.author}</h4>
                    <p className="text-[11px] text-neutral-400">{rev.title}</p>
                  </div>
                  <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" /> Verified
                  </span>
                </div>
                <p className="text-[10px] text-neutral-400 mt-2">
                  Purchased: <strong>{rev.item}</strong>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Discount Voucher Banner */}
      <section className="container mx-auto px-4 pb-8">
        <div className="bg-neutral-950 text-white rounded-3xl p-8 md:p-14 text-center max-w-4xl mx-auto shadow-2xl border border-neutral-800 relative overflow-hidden">
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              Private Client Privilege
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif uppercase tracking-tight">
              Enjoy 15% Off Your First Order
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300">
              Join the FashionAura membership to receive our seasonal lookbook, invitations to trunk shows, and automatic complimentary express shipping.
            </p>

            {newsletterDone ? (
              <div className="p-4 bg-neutral-900 border border-neutral-700 rounded-2xl space-y-2 mt-4 text-emerald-400">
                <div className="flex items-center justify-center gap-2 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Promo Code Activated!</span>
                </div>
                <p className="text-xs text-neutral-300">
                  Use coupon code <strong className="text-white text-sm bg-neutral-800 px-2 py-1 rounded">AURA15</strong> at checkout for 15% off.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="pt-2">
                <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 px-4 py-3 text-xs rounded-full bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-400 focus:outline-none focus:border-white"
                  />
                  <button
                    type="submit"
                    className="px-8 py-3 bg-white text-neutral-950 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition shadow-lg shrink-0"
                  >
                    Claim 15% Code
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

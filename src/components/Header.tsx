"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useStore } from '../context/StoreContext';
import { products } from '../data/products';
import { Currency } from '../types/store';
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Header: React.FC = () => {
  const router = useRouter();
  const {
    openCartDrawer,
    totalCartItemCount,
    wishlist,
    currency,
    setCurrency,
    formatPrice
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search results dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = searchQuery.trim()
    ? products
        .filter((p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearchFocused(false);
    router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
  };

  const currencies: Currency[] = ['USD', 'EUR', 'GBP', 'CAD'];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800 transition-colors">
      {/* Top Announcement Bar */}
      <div className="bg-neutral-950 text-white text-[11px] py-2 px-4 font-medium tracking-wide">
        <div className="container mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Complimentary Worldwide Express Delivery on Orders $100+</span>
          </div>
          <div className="mx-auto sm:mx-0 flex items-center gap-3">
            <span>Use Code <strong className="text-amber-300">AURA15</strong> for 15% Off</span>
            <span className="hidden md:inline text-neutral-500">•</span>
            <Link href="/products" className="hidden md:inline hover:underline text-neutral-300">
              Shop New Arrivals
            </Link>
          </div>

          {/* Currency Switcher */}
          <div className="relative">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="flex items-center gap-1 text-[11px] text-neutral-300 hover:text-white px-2 py-0.5 rounded transition"
            >
              <span>{currency}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {currencyDropdownOpen && (
              <div className="absolute right-0 mt-1 w-24 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-xl py-1 z-50">
                {currencies.map((curr) => (
                  <button
                    key={curr}
                    onClick={() => {
                      setCurrency(curr);
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs transition ${
                      currency === curr
                        ? 'bg-neutral-100 dark:bg-neutral-800 font-bold text-neutral-900 dark:text-white'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4 py-3.5 flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white"
            aria-label="Open mobile menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/" className="group flex flex-col">
            <span className="text-xl md:text-2xl font-black tracking-tight text-neutral-950 dark:text-white font-serif uppercase">
              Fashion<span className="font-light italic">Aura</span>
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-neutral-400 font-sans -mt-1 group-hover:text-neutral-600 transition">
              Atelier &bull; Curated
            </span>
          </Link>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7 text-xs font-medium uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
          <Link href="/" className="hover:text-black dark:hover:text-white transition">
            Home
          </Link>
          <Link href="/products" className="hover:text-black dark:hover:text-white transition">
            All Collections
          </Link>
          <Link href="/products?category=Outerwear" className="hover:text-black dark:hover:text-white transition">
            Outerwear
          </Link>
          <Link href="/products?category=Denim" className="hover:text-black dark:hover:text-white transition">
            Denim
          </Link>
          <Link href="/about" className="hover:text-black dark:hover:text-white transition">
            Our Story
          </Link>
          <Link href="/contact" className="hover:text-black dark:hover:text-white transition">
            Contact
          </Link>
        </nav>

        {/* Center-Right: Search Input with Live Results dropdown */}
        <div ref={searchContainerRef} className="relative hidden md:block flex-1 max-w-xs lg:max-w-sm">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search garments, styles..."
              value={searchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-1.5 pl-9 pr-4 text-xs rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 border border-transparent focus:border-neutral-400 dark:focus:border-neutral-600 focus:bg-white dark:focus:bg-neutral-900 focus:outline-none transition-all shadow-inner"
            />
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black dark:hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </form>

          {/* Autocomplete Dropdown */}
          <AnimatePresence>
            {isSearchFocused && searchQuery.trim() && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute left-0 right-0 mt-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-2xl p-2 z-50 overflow-hidden"
              >
                {searchResults.length === 0 ? (
                  <div className="p-4 text-center text-xs text-neutral-500">
                    No products found matching &quot;{searchQuery}&quot;
                  </div>
                ) : (
                  <div>
                    <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                      Matching Garments
                    </div>
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        onClick={() => {
                          setIsSearchFocused(false);
                          setSearchQuery('');
                        }}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                      >
                        <div className="relative w-10 h-12 rounded bg-neutral-100 dark:bg-neutral-800 overflow-hidden shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-neutral-900 dark:text-white truncate">
                            {product.name}
                          </h4>
                          <span className="text-[10px] text-neutral-500">{product.category}</span>
                        </div>
                        <span className="text-xs font-bold text-neutral-900 dark:text-white">
                          {formatPrice(product.price)}
                        </span>
                      </Link>
                    ))}
                    <Link
                      href={`/products?search=${encodeURIComponent(searchQuery)}`}
                      onClick={() => setIsSearchFocused(false)}
                      className="mt-2 pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-center gap-1 text-xs font-semibold text-neutral-900 dark:text-white hover:underline py-1"
                    >
                      See all results <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Wishlist & Cart buttons */}
        <div className="flex items-center gap-2">
          {/* Wishlist Icon */}
          <Link
            href="/wishlist"
            className="relative p-2.5 rounded-full text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
            aria-label="Saved items"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart Drawer Trigger */}
          <button
            onClick={openCartDrawer}
            className="relative flex items-center gap-2 p-2 sm:px-3 sm:py-2 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 transition shadow-sm"
            aria-label="Open Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline text-xs font-semibold">Bag</span>
            {totalCartItemCount > 0 && (
              <span className="bg-rose-500 text-white rounded-full text-[10px] font-bold px-1.5 py-0.2">
                {totalCartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed inset-y-0 left-0 w-3/4 max-w-sm bg-white dark:bg-neutral-950 p-6 flex flex-col justify-between shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-neutral-100 dark:border-neutral-800">
                  <span className="text-lg font-black tracking-tight font-serif uppercase">
                    Fashion<span className="font-light italic">Aura</span>
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-neutral-500 hover:text-black dark:hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Search */}
                <form onSubmit={handleSearchSubmit} className="mt-4 relative">
                  <input
                    type="text"
                    placeholder="Search catalog..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-2 pl-9 pr-4 text-xs rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                  />
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </form>

                <nav className="mt-6 flex flex-col space-y-4 text-sm font-semibold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-neutral-500 transition py-1"
                  >
                    Home
                  </Link>
                  <Link
                    href="/products"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-neutral-500 transition py-1"
                  >
                    All Collections
                  </Link>
                  <Link
                    href="/products?category=Outerwear"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-neutral-500 transition py-1"
                  >
                    Outerwear & Jackets
                  </Link>
                  <Link
                    href="/products?category=Denim"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-neutral-500 transition py-1"
                  >
                    Denim & Jeans
                  </Link>
                  <Link
                    href="/wishlist"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between hover:text-neutral-500 transition py-1"
                  >
                    <span>Saved Items</span>
                    <span className="text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-full">
                      {wishlist.length}
                    </span>
                  </Link>
                  <Link
                    href="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-neutral-500 transition py-1"
                  >
                    Our Story
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-neutral-500 transition py-1"
                  >
                    Customer Care
                  </Link>
                </nav>
              </div>

              <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-500 space-y-2">
                <p>Curated Minimalist Wardrobe Atelier</p>
                <div className="flex gap-2 text-neutral-400">
                  <span>Currency: {currency}</span>
                  <span>•</span>
                  <span>Free shipping $100+</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};

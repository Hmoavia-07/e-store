"use client";
import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { products, CATEGORIES } from '../../data/products';
import { ProductCard } from '../../components/ProductCard';
import {
  SlidersHorizontal,
  X,
  RotateCcw,
  LayoutGrid,
  Grid3X3,
  Search,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function ProductsCatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [maxPrice, setMaxPrice] = useState<number>(200);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Sync state if URL search params change
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const q = searchParams.get('search');
    if (q !== null) setSearchQuery(q);
  }, [searchParams]);

  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', '38'];

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setMaxPrice(200);
    setSelectedSizes([]);
    setInStockOnly(false);
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    searchQuery.trim() !== '' ||
    maxPrice < 200 ||
    selectedSizes.length > 0 ||
    inStockOnly;

  // Filtered & Sorted list
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category
        if (selectedCategory !== 'All' && p.category !== selectedCategory) {
          return false;
        }
        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const match =
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q);
          if (!match) return false;
        }
        // Price
        if (p.price > maxPrice) return false;
        // In Stock
        if (inStockOnly && p.stock <= 0) return false;
        // Sizes
        if (selectedSizes.length > 0) {
          const hasMatchingSize = p.sizes.some((s) => selectedSizes.includes(s));
          if (!hasMatchingSize) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [selectedCategory, searchQuery, maxPrice, inStockOnly, selectedSizes, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Title & Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-neutral-500">
            Curated Wardrobe
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif uppercase tracking-tight text-neutral-950 dark:text-white mt-1">
            All Collections
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Showing {filteredProducts.length} of {products.length} bespoke silhouettes
          </p>
        </div>

        {/* Controls: Search, Sort & Grid Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden px-4 py-2 bg-neutral-950 text-white rounded-full text-xs font-semibold flex items-center gap-2"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters {hasActiveFilters && '(Active)'}</span>
          </button>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-neutral-500 font-medium hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc' | 'rating')}
              className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl px-3 py-2 text-xs text-neutral-800 dark:text-neutral-200 focus:outline-none"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
            </select>
          </div>

          {/* Grid Layout Switcher */}
          <div className="hidden sm:flex items-center border border-neutral-200 dark:border-neutral-700 rounded-xl p-1 bg-white dark:bg-neutral-800">
            <button
              onClick={() => setGridCols(3)}
              className={`p-1.5 rounded-lg transition ${
                gridCols === 3
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                  : 'text-neutral-500 hover:text-black dark:hover:text-white'
              }`}
              title="3 Columns"
              aria-label="3 Columns"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridCols(4)}
              className={`p-1.5 rounded-lg transition ${
                gridCols === 4
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                  : 'text-neutral-500 hover:text-black dark:hover:text-white'
              }`}
              title="4 Columns"
              aria-label="4 Columns"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-4">
          <span className="text-xs text-neutral-400 font-medium">Active:</span>
          {selectedCategory !== 'All' && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-xs font-semibold">
              Category: {selectedCategory}
              <button onClick={() => setSelectedCategory('All')}>
                <X className="w-3 h-3 text-neutral-500" />
              </button>
            </span>
          )}
          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-xs font-semibold">
              Keyword: &quot;{searchQuery}&quot;
              <button onClick={() => setSearchQuery('')}>
                <X className="w-3 h-3 text-neutral-500" />
              </button>
            </span>
          )}
          {maxPrice < 200 && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-xs font-semibold">
              Under ${maxPrice}
              <button onClick={() => setMaxPrice(200)}>
                <X className="w-3 h-3 text-neutral-500" />
              </button>
            </span>
          )}
          {selectedSizes.map((s) => (
            <span key={s} className="inline-flex items-center gap-1 px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-xs font-semibold">
              Size: {s}
              <button onClick={() => toggleSize(s)}>
                <X className="w-3 h-3 text-neutral-500" />
              </button>
            </span>
          ))}
          {inStockOnly && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-xs font-semibold">
              In Stock Only
              <button onClick={() => setInStockOnly(false)}>
                <X className="w-3 h-3 text-neutral-500" />
              </button>
            </span>
          )}
          <button
            onClick={clearAllFilters}
            className="text-xs text-rose-500 hover:underline flex items-center gap-1 ml-2 font-semibold"
          >
            <RotateCcw className="w-3 h-3" /> Clear All
          </button>
        </div>
      )}

      {/* Main Grid with Sidebar Filter */}
      <div className="grid lg:grid-cols-12 gap-8 mt-6">
        {/* Desktop Sidebar Filter */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 space-y-6 sticky top-28">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </span>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-[11px] text-neutral-500 hover:text-black dark:hover:text-white"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Keyword Search */}
            <div>
              <label className="block text-xs font-semibold uppercase text-neutral-600 dark:text-neutral-400 mb-2">
                Keywords
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Filter garments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none"
                />
                <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-semibold uppercase text-neutral-600 dark:text-neutral-400 mb-2">
                Wardrobe Division
              </label>
              <div className="space-y-1 text-xs">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition ${
                      selectedCategory === cat
                        ? 'bg-neutral-900 text-white font-semibold dark:bg-white dark:text-neutral-900'
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="text-[11px] opacity-70">
                      {cat === 'All'
                        ? products.length
                        : products.filter((p) => p.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Max Price Range Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-2">
                <span className="uppercase">Max Price</span>
                <span className="text-neutral-900 dark:text-white font-bold">${maxPrice}</span>
              </div>
              <input
                type="range"
                min={30}
                max={200}
                step={5}
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
                className="w-full accent-neutral-950 dark:accent-white cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                <span>$30</span>
                <span>$200+</span>
              </div>
            </div>

            {/* Sizes Multi-Select */}
            <div>
              <label className="block text-xs font-semibold uppercase text-neutral-600 dark:text-neutral-400 mb-2">
                Sizes
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {allSizes.map((size) => {
                  const isSelected = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`py-1.5 text-xs font-semibold rounded-lg border transition ${
                        isSelected
                          ? 'bg-neutral-950 text-white border-neutral-950 dark:bg-white dark:text-neutral-950'
                          : 'border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* In stock toggle */}
            <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-neutral-700 dark:text-neutral-300">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-neutral-300 text-neutral-900 focus:ring-black"
                />
                <span>In Stock pieces only</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="bg-white dark:bg-neutral-900 p-16 rounded-2xl text-center border border-neutral-200 dark:border-neutral-800">
              <SlidersHorizontal className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                No silhouettes match your current criteria
              </h3>
              <p className="text-xs text-neutral-500 mt-1 mb-6">
                Try widening your price range, clearing size filters, or searching another category.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-2.5 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 rounded-full text-xs font-semibold"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div
              className={`grid gap-6 ${
                gridCols === 3
                  ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
                  : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
              }`}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed inset-y-0 right-0 w-full max-w-xs bg-white dark:bg-neutral-900 p-6 flex flex-col justify-between shadow-2xl"
            >
              <div className="space-y-6 overflow-y-auto">
                <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
                  <span className="text-sm font-bold uppercase tracking-wider">Filters</span>
                  <button onClick={() => setMobileFilterOpen(false)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Category */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider mb-2">Category</h4>
                  <div className="space-y-1 text-xs">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left px-3 py-2 rounded-lg ${
                          selectedCategory === cat
                            ? 'bg-neutral-900 text-white font-bold'
                            : 'text-neutral-700 dark:text-neutral-300'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Max Price */}
                <div>
                  <div className="flex justify-between text-xs font-bold uppercase mb-2">
                    <span>Max Price</span>
                    <span>${maxPrice}</span>
                  </div>
                  <input
                    type="range"
                    min={30}
                    max={200}
                    step={5}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
                    className="w-full accent-black cursor-pointer"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex gap-2">
                <button
                  onClick={clearAllFilters}
                  className="flex-1 py-3 text-xs font-semibold rounded-xl border border-neutral-200 dark:border-neutral-700"
                >
                  Reset
                </button>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-1 py-3 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 rounded-xl text-xs font-semibold"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-16 text-center text-xs">Loading collection...</div>}>
      <ProductsCatalogContent />
    </Suspense>
  );
}

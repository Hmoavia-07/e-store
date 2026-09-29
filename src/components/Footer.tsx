"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '../context/StoreContext';
import {
  Mail,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { openSizeGuide } = useStore();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
  };

  return (
    <footer className="bg-neutral-950 text-neutral-300 border-t border-neutral-800">
      {/* Brand Pillars Banner */}
      <div className="border-b border-neutral-800/80">
        <div className="container mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-white shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Free Global Delivery</h4>
              <p className="text-[11px] text-neutral-400 mt-0.5">Complimentary express shipping over $100</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-white shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">30-Day Returns</h4>
              <p className="text-[11px] text-neutral-400 mt-0.5">Hassle-free complimentary exchanges</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-white shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Certified Sustainable</h4>
              <p className="text-[11px] text-neutral-400 mt-0.5">100% GOTS organic & recycled fibers</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-white shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Artisan Quality</h4>
              <p className="text-[11px] text-neutral-400 mt-0.5">Built to endure seasons, not trends</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand bio */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-black tracking-tight text-white font-serif uppercase">
                Fashion<span className="font-light italic text-neutral-400">Aura</span>
              </span>
            </Link>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              FashionAura represents timeless simplicity, sustainable fabrication, and architectural tailoring.
              Every silhouette is engineered for thoughtful living and perpetual elegance.
            </p>
            <div className="text-xs text-neutral-400 pt-2 space-y-1">
              <p>Atelier: 123 Fashion Boulevard, Design District, CA</p>
              <p>Email: concierge@fashionaura.com</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">Collections</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <Link href="/products?category=Outerwear" className="hover:text-white transition">Outerwear</Link>
              </li>
              <li>
                <Link href="/products?category=Denim" className="hover:text-white transition">Selvedge Denim</Link>
              </li>
              <li>
                <Link href="/products?category=Tops" className="hover:text-white transition">Fine Knits & Tops</Link>
              </li>
              <li>
                <Link href="/products?category=Dresses" className="hover:text-white transition">Dresses & Skirts</Link>
              </li>
              <li>
                <Link href="/products?category=Bottoms" className="hover:text-white transition">Tailored Trousers</Link>
              </li>
            </ul>
          </div>

          {/* Client Service */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">Concierge</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button onClick={openSizeGuide} className="hover:text-white transition text-left">Size Guide</button>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition">Shipping & Delivery</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition">Returns & Exchanges</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">Contact Support</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition">Sustainability Pledge</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">The Aura Dispatch</h4>
            <p className="text-xs text-neutral-400">
              Subscribe to receive private preview invitations, seasonal lookbooks, and 15% off your first purchase.
            </p>

            {isSubscribed ? (
              <div className="p-3 bg-neutral-900 border border-neutral-700 rounded-xl text-xs space-y-1 text-emerald-400">
                <div className="flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Welcome to the community!</span>
                </div>
                <p className="text-neutral-300 text-[11px]">
                  Your 15% discount code is <strong className="text-white">AURA15</strong>. It has been activated for your bag.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-2.5 pl-9 pr-12 text-xs rounded-xl bg-neutral-900 text-white placeholder-neutral-500 border border-neutral-800 focus:outline-none focus:border-white transition"
                  />
                  <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-white text-neutral-950 rounded-lg text-xs font-bold hover:bg-neutral-200 transition"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[10px] text-neutral-500">
                  By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar with Payment badges & Copyright */}
        <div className="mt-12 pt-8 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>&copy; {new Date().getFullYear()} FashionAura Atelier. Designed & Engineered with precision.</p>

          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-neutral-900 rounded border border-neutral-800 text-[10px] font-mono text-neutral-300">VISA</span>
            <span className="px-2 py-1 bg-neutral-900 rounded border border-neutral-800 text-[10px] font-mono text-neutral-300">MASTERCARD</span>
            <span className="px-2 py-1 bg-neutral-900 rounded border border-neutral-800 text-[10px] font-mono text-neutral-300">AMEX</span>
            <span className="px-2 py-1 bg-neutral-900 rounded border border-neutral-800 text-[10px] font-mono text-neutral-300">APPLE PAY</span>
            <span className="px-2 py-1 bg-neutral-900 rounded border border-neutral-800 text-[10px] font-mono text-neutral-300">PAYPAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FaqItem {
  q: string;
  a: string;
}

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState<'shipping' | 'returns' | 'sizing' | 'care'>('shipping');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: Record<string, FaqItem[]> = {
    shipping: [
      {
        q: "What are your shipping rates and delivery timelines?",
        a: "We offer complimentary worldwide carbon-neutral express shipping on all orders over $100. For orders under $100, standard shipping is a flat $12. Delivery typically takes 2 to 4 business days in North America & Europe, and 3 to 6 days internationally."
      },
      {
        q: "Do you ship internationally?",
        a: "Yes. FashionAura delivers to over 85 countries worldwide via DHL Express and FedEx International Priority. All import duties and taxes are calculated and collected during checkout, meaning no surprise doorstep customs fees."
      },
      {
        q: "How can I track my package in real-time?",
        a: "Once your garment is packed in our atelier, you will receive an email and SMS with your courier tracking link and estimated delivery window."
      }
    ],
    returns: [
      {
        q: "What is your return and exchange policy?",
        a: "We provide a 30-day effortless return and exchange window from the date of delivery. Items must be in their original, unwashed condition with all tags and protective sleeves attached."
      },
      {
        q: "Are return shipments free of charge?",
        a: "Yes. Domestic returns and size exchanges include prepaid courier return labels. Simply access our automated returns portal to print your label."
      },
      {
        q: "When will my refund be processed?",
        a: "Once your return is inspected at our atelier (usually within 48 hours of receipt), refunds are credited back to your original payment method in 3 to 5 business days."
      }
    ],
    sizing: [
      {
        q: "How do FashionAura garments fit?",
        a: "Our silhouettes lean towards architectural, contemporary tailoring. Outerwear and knits feature subtle relaxed draping, while trousers offer a clean tapered line. Refer to our interactive Garment Sizing Guide on any product page for exact measurements."
      },
      {
        q: "Can I receive personal sizing guidance?",
        a: "Absolutely. Our concierge team is available via chat and email at concierge@fashionaura.com to provide personalized fit recommendations based on your height and frame."
      }
    ],
    care: [
      {
        q: "How should I care for selvedge denim?",
        a: "We recommend wearing raw selvedge denim frequently and washing sparingly. When cleaning is needed, turn jeans inside-out and soak in cool water with gentle detergent. Always hang dry away from direct heat."
      },
      {
        q: "How do I maintain full-grain leather garments?",
        a: "Store on wide, contoured wooden hangers in a climate-controlled environment. Treat annually with high-grade natural leather balsam to preserve suppleness."
      }
    ]
  };

  const currentQuestions = faqs[activeCategory] || [];

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl space-y-12">
      <div className="text-center space-y-2">
        <span className="text-xs uppercase font-bold tracking-widest text-neutral-500">
          Client Concierge
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif uppercase tracking-tight text-neutral-950 dark:text-white">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 max-w-lg mx-auto">
          Clear answers regarding atelier shipping, sustainable materials, sizing, and complimentary returns.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {[
          { id: 'shipping', label: 'Shipping & Delivery' },
          { id: 'returns', label: 'Returns & Exchanges' },
          { id: 'sizing', label: 'Sizing & Proportions' },
          { id: 'care', label: 'Garment Longevity & Care' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveCategory(tab.id as 'shipping' | 'returns' | 'sizing' | 'care');
              setOpenIndex(0);
            }}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition ${
              activeCategory === tab.id
                ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-md'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Accordion list */}
      <div className="space-y-4">
        {currentQuestions.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4"
              >
                <span className="text-sm font-bold text-neutral-900 dark:text-white">
                  {item.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-neutral-500 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-black dark:text-white' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-5 pb-5 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed border-t border-neutral-100 dark:border-neutral-800 pt-3">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Still have questions banner */}
      <div className="bg-neutral-950 text-white p-8 rounded-3xl text-center space-y-4 max-w-xl mx-auto shadow-xl">
        <HelpCircle className="w-8 h-8 mx-auto text-amber-400" />
        <h3 className="text-xl font-bold font-serif uppercase tracking-tight">
          Still Have Inquiries?
        </h3>
        <p className="text-xs text-neutral-300">
          Our atelier concierge is at your service 7 days a week for styling counsel and order support.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-neutral-950 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition"
        >
          Contact Atelier Concierge <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

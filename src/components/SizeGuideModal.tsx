"use client";
import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { motion, AnimatePresence } from 'motion/react';
import { X, Ruler, Check } from 'lucide-react';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, closeSizeGuide } = useStore();
  const [unit, setUnit] = useState<'in' | 'cm'>('in');
  const [tab, setTab] = useState<'tops' | 'bottoms'>('tops');

  if (!isSizeGuideOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeSizeGuide}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative z-10 bg-white dark:bg-neutral-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <Ruler className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                Garment Sizing Guide
              </h2>
            </div>
            <button
              onClick={closeSizeGuide}
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              {/* Category tabs */}
              <div className="inline-flex p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-sm font-medium">
                <button
                  onClick={() => setTab('tops')}
                  className={`px-4 py-1.5 rounded-md transition ${
                    tab === 'tops'
                      ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  Tops & Outerwear
                </button>
                <button
                  onClick={() => setTab('bottoms')}
                  className={`px-4 py-1.5 rounded-md transition ${
                    tab === 'bottoms'
                      ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  Trousers & Shorts
                </button>
              </div>

              {/* Units toggle */}
              <div className="inline-flex items-center gap-1 text-xs border border-neutral-200 dark:border-neutral-700 rounded-lg p-1">
                <button
                  onClick={() => setUnit('in')}
                  className={`px-2.5 py-1 rounded font-medium transition ${
                    unit === 'in' ? 'bg-black text-white' : 'text-neutral-600'
                  }`}
                >
                  Inches
                </button>
                <button
                  onClick={() => setUnit('cm')}
                  className={`px-2.5 py-1 rounded font-medium transition ${
                    unit === 'cm' ? 'bg-black text-white' : 'text-neutral-600'
                  }`}
                >
                  Centimeters
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
              {tab === 'tops' ? (
                <table className="w-full text-left text-sm">
                  <thead className="bg-neutral-50 dark:bg-neutral-800/60 text-xs uppercase font-semibold text-neutral-500">
                    <tr>
                      <th className="py-3 px-4">Size</th>
                      <th className="py-3 px-4">Chest ({unit})</th>
                      <th className="py-3 px-4">Waist ({unit})</th>
                      <th className="py-3 px-4">Shoulder ({unit})</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800 font-normal text-neutral-700 dark:text-neutral-300">
                    {[
                      { size: "XS", chest: unit === 'in' ? "34 - 36" : "86 - 91", waist: unit === 'in' ? "28 - 30" : "71 - 76", sh: unit === 'in' ? "17.0" : "43" },
                      { size: "S", chest: unit === 'in' ? "36 - 38" : "91 - 96", waist: unit === 'in' ? "30 - 32" : "76 - 81", sh: unit === 'in' ? "17.5" : "44.5" },
                      { size: "M", chest: unit === 'in' ? "38 - 40" : "96 - 101", waist: unit === 'in' ? "32 - 34" : "81 - 86", sh: unit === 'in' ? "18.2" : "46" },
                      { size: "L", chest: unit === 'in' ? "41 - 43" : "104 - 109", waist: unit === 'in' ? "35 - 37" : "89 - 94", sh: unit === 'in' ? "19.0" : "48" },
                      { size: "XL", chest: unit === 'in' ? "44 - 46" : "112 - 117", waist: unit === 'in' ? "38 - 40" : "96 - 102", sh: unit === 'in' ? "19.8" : "50" },
                      { size: "XXL", chest: unit === 'in' ? "47 - 50" : "119 - 127", waist: unit === 'in' ? "41 - 44" : "104 - 112", sh: unit === 'in' ? "20.5" : "52" }
                    ].map((row) => (
                      <tr key={row.size} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30">
                        <td className="py-3 px-4 font-semibold text-neutral-900 dark:text-white">{row.size}</td>
                        <td className="py-3 px-4">{row.chest}</td>
                        <td className="py-3 px-4">{row.waist}</td>
                        <td className="py-3 px-4">{row.sh}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="w-full text-left text-sm">
                  <thead className="bg-neutral-50 dark:bg-neutral-800/60 text-xs uppercase font-semibold text-neutral-500">
                    <tr>
                      <th className="py-3 px-4">Waist Size</th>
                      <th className="py-3 px-4">Actual Waist ({unit})</th>
                      <th className="py-3 px-4">Hips ({unit})</th>
                      <th className="py-3 px-4">Inseam ({unit})</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800 font-normal text-neutral-700 dark:text-neutral-300">
                    {[
                      { size: "28", waist: unit === 'in' ? "28 - 29" : "71 - 74", hip: unit === 'in' ? "35 - 36" : "89 - 91", in: unit === 'in' ? "31" : "79" },
                      { size: "30", waist: unit === 'in' ? "30 - 31" : "76 - 79", hip: unit === 'in' ? "37 - 38" : "94 - 96", in: unit === 'in' ? "32" : "81" },
                      { size: "32", waist: unit === 'in' ? "32 - 33" : "81 - 84", hip: unit === 'in' ? "39 - 40" : "99 - 101", in: unit === 'in' ? "32" : "81" },
                      { size: "34", waist: unit === 'in' ? "34 - 35" : "86 - 89", hip: unit === 'in' ? "41 - 42" : "104 - 107", in: unit === 'in' ? "32" : "81" },
                      { size: "36", waist: unit === 'in' ? "36 - 37" : "91 - 94", hip: unit === 'in' ? "43 - 44" : "109 - 112", in: unit === 'in' ? "33" : "84" },
                      { size: "38", waist: unit === 'in' ? "38 - 39" : "96 - 99", hip: unit === 'in' ? "45 - 46" : "114 - 117", in: unit === 'in' ? "33" : "84" }
                    ].map((row) => (
                      <tr key={row.size} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30">
                        <td className="py-3 px-4 font-semibold text-neutral-900 dark:text-white">{row.size}</td>
                        <td className="py-3 px-4">{row.waist}</td>
                        <td className="py-3 px-4">{row.hip}</td>
                        <td className="py-3 px-4">{row.in}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Measuring tips */}
            <div className="bg-neutral-50 dark:bg-neutral-800/50 p-4 rounded-xl text-xs space-y-2 text-neutral-600 dark:text-neutral-400">
              <p className="font-semibold text-neutral-800 dark:text-neutral-200">How to Measure Accurately:</p>
              <div className="grid sm:grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span><strong>Chest:</strong> Measure around the fullest part of your chest.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span><strong>Waist:</strong> Measure around your natural waistline.</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

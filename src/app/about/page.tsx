"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  Leaf,
  Award,
  ArrowRight,
  Quote
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-16 md:space-y-24 py-10">
      {/* Editorial Hero */}
      <section className="container mx-auto px-4 max-w-4xl text-center space-y-4">
        <span className="text-xs uppercase font-bold tracking-widest text-neutral-500">
          The Manifesto
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold font-serif uppercase tracking-tight text-neutral-950 dark:text-white leading-[1.1]">
          Fashion Built To Outlast <br />
          <span className="font-light italic text-neutral-500">The Ephemeral.</span>
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed pt-2">
          Founded in 2023, FashionAura was founded upon an uncompromising premise: wardrobe essentials should be architectural in cut, sustainable in provenance, and perpetual in longevity.
        </p>
      </section>

      {/* Atelier Imagery & Narrative */}
      <section className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-neutral-100 dark:bg-neutral-800">
            <Image
              src="/images/team.jpg"
              alt="FashionAura Atelier Team"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase font-bold tracking-widest text-neutral-500">
              Our Origins
            </span>
            <h2 className="text-3xl font-bold font-serif uppercase tracking-tight text-neutral-950 dark:text-white">
              The Antidote to Fast Fashion
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              <p>
                Every year, millions of tons of synthetic garments flood landfills after mere weeks of wear. At FashionAura, we design backward from the end of life: sourcing certified organic fibers and natural selvedge textiles that age with distinction rather than deterioration.
              </p>
              <p>
                Each silhouette undergoes months of structural prototyping in our atelier. We obsess over the weight of our 450 GSM French terry fleece, the drape of Mongolian cashmere, and the tactile snap of Japanese shank hardware.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition shadow-lg"
              >
                Experience The Collection <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Quote Spotlight */}
      <section className="container mx-auto px-4 max-w-4xl">
        <div className="bg-neutral-950 text-white p-8 sm:p-14 rounded-3xl relative overflow-hidden shadow-2xl text-center space-y-6">
          <Quote className="w-10 h-10 mx-auto text-amber-400 opacity-60" />
          <blockquote className="text-lg sm:text-2xl font-serif italic text-neutral-200 leading-relaxed max-w-2xl mx-auto">
            &ldquo;FashionAura isn&apos;t just about clothing; it&apos;s about cultivating an intentional relationship with what touches your skin every day.&rdquo;
          </blockquote>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white">Hasnain Moavia</p>
            <p className="text-[11px] text-neutral-400 mt-0.5">Founder & Creative Director</p>
          </div>
        </div>
      </section>

      {/* 3 Pillars Grid */}
      <section className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-neutral-950 text-white flex items-center justify-center">
              <Leaf className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-base font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
              Circular Integrity
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              We employ closed-loop water treatment for all denim washes and partner with GOTS-certified cooperatives that uphold zero harmful chemicals.
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-neutral-950 text-white flex items-center justify-center">
              <Award className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-base font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
              Artisan Fair Trade
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Every garment maker is compensated well above living wage thresholds, working in safe, daylight-illuminated ethical workshops.
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-neutral-950 text-white flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-sky-400" />
            </div>
            <h3 className="text-base font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
              24-Month Garment Guarantee
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Should a seam loosen or a zipper snap within 2 years, ship it to our atelier for complimentary expert repair.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

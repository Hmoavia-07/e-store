"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Order & Shipping',
    orderNumber: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketId(`TKT-${Math.floor(10000 + Math.random() * 90000)}`);
    setSubmitted(true);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl space-y-12">
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <span className="text-xs uppercase font-bold tracking-widest text-neutral-500">
          Atelier Client Care
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif uppercase tracking-tight text-neutral-950 dark:text-white">
          Contact Concierge
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
          Our styling and order support specialists are on hand to assist with sizing counsel, garment care, and international deliveries.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 items-start">
        {/* Contact Information Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 shadow-sm space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-white pb-3 border-b border-neutral-100 dark:border-neutral-800">
              Direct Channels
            </h3>

            <div className="space-y-5 text-xs">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-neutral-800 dark:text-neutral-200" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 dark:text-white uppercase tracking-wide">
                    Email Inquiries
                  </h4>
                  <p className="text-neutral-500 mt-0.5">concierge@fashionaura.com</p>
                  <p className="text-[11px] text-neutral-400">Average response time: &lt; 2 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-neutral-800 dark:text-neutral-200" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 dark:text-white uppercase tracking-wide">
                    Telephone Concierge
                  </h4>
                  <p className="text-neutral-500 mt-0.5">+1 (800) 555-AURA</p>
                  <p className="text-[11px] text-neutral-400">Toll-free across North America</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-neutral-800 dark:text-neutral-200" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 dark:text-white uppercase tracking-wide">
                    Atelier Flagship
                  </h4>
                  <p className="text-neutral-500 mt-0.5">123 Fashion Boulevard, Suite 400</p>
                  <p className="text-neutral-500">Design District, California 90210</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-neutral-800 dark:text-neutral-200" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 dark:text-white uppercase tracking-wide">
                    Concierge Hours
                  </h4>
                  <p className="text-neutral-500 mt-0.5">Monday &ndash; Friday: 9:00 AM &ndash; 6:00 PM EST</p>
                  <p className="text-neutral-500">Saturday: 10:00 AM &ndash; 4:00 PM EST</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick FAQ Link */}
          <div className="p-6 bg-neutral-50 dark:bg-neutral-800/60 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
              <div>
                <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase">Looking for answers?</h4>
                <p className="text-[11px] text-neutral-500">Explore our comprehensive FAQ guide</p>
              </div>
            </div>
            <Link
              href="/faq"
              className="p-2.5 rounded-full bg-neutral-950 text-white hover:bg-neutral-800 transition"
              aria-label="FAQ"
            >
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 shadow-sm">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-serif uppercase tracking-tight text-neutral-900 dark:text-white">
                Dispatch Dispatched to Atelier
              </h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. Your ticket <strong>#{ticketId}</strong> has been assigned to a client advisor. We will respond to <strong>{formData.email}</strong> promptly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    topic: 'Order & Shipping',
                    orderNumber: '',
                    message: ''
                  });
                }}
                className="mt-4 px-6 py-2.5 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 rounded-full text-xs font-bold uppercase tracking-wider"
              >
                Send Another Dispatch
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-neutral-400">Dispatch Form</span>
                <h2 className="text-xl font-bold font-serif uppercase tracking-tight text-neutral-950 dark:text-white mt-0.5">
                  Send a Direct Message
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Inquiry Topic *
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none"
                  >
                    <option value="Order & Shipping">Order & Courier Tracking</option>
                    <option value="Size Consultation">Garment Sizing Guidance</option>
                    <option value="Returns">Returns & Exchanges</option>
                    <option value="Bespoke Care">Garment Care & Repair</option>
                    <option value="Press & Wholesale">Press & Wholesale</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Order Reference # (If Applicable)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. AURA-849204"
                    value={formData.orderNumber}
                    onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  How May We Assist You? *
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Share details regarding your request, garment questions, or delivery notes..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-neutral-800 transition shadow-xl"
              >
                Send Message to Atelier
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '../../context/StoreContext';
import {
  ShieldCheck,
  Lock,
  Truck,
  CreditCard,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  PackageCheck,
  ShoppingBag,
  Sparkles,
  Printer
} from 'lucide-react';

export default function CheckoutPage() {
  const {
    cart,
    clearCart,
    formatPrice,
    subtotal,
    discountAmount,
    shippingAmount,
    taxAmount,
    appliedCoupon
  } = useStore();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States'
  });

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express' | 'overnight'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'cod'>('card');
  const [cardInfo, setCardInfo] = useState({
    number: '',
    holder: '',
    expiry: '',
    cvv: ''
  });

  const [orderId, setOrderId] = useState('');
  const [orderPlacedDate, setOrderPlacedDate] = useState('');

  // Shipping cost based on selection
  const selectedShippingFee =
    shippingMethod === 'overnight'
      ? 25
      : shippingMethod === 'express'
      ? 15
      : shippingAmount;

  const finalTotal = Math.max(0, subtotal - discountAmount + selectedShippingFee + taxAmount);

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `AURA-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setOrderPlacedDate(new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
    setStep(4);
    clearCart();
  };

  if (cart.length === 0 && step !== 4) {
    return (
      <div className="container mx-auto px-4 py-20 text-center max-w-md">
        <ShoppingBag className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold font-serif uppercase tracking-tight text-neutral-900 dark:text-white mb-2">
          Your bag is empty
        </h1>
        <p className="text-xs text-neutral-500 mb-6">
          There are no items to checkout. Discover our bespoke garments.
        </p>
        <Link
          href="/products"
          className="px-6 py-3 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 rounded-full text-xs font-bold uppercase tracking-widest inline-block"
        >
          Return to Collections
        </Link>
      </div>
    );
  }

  // Step 4: Order Confirmation
  if (step === 4) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl text-center space-y-8">
        <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-full flex items-center justify-center mx-auto text-emerald-600">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest font-bold text-emerald-600">
            Order Confirmed &bull; Payment Received
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif uppercase tracking-tight text-neutral-950 dark:text-white">
            Thank You For Your Order
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
            A confirmation receipt and courier tracking details have been sent to <strong>{shippingInfo.email || 'your email'}</strong>.
          </p>
        </div>

        {/* Order Details Receipt Card */}
        <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 text-left shadow-lg space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800 text-xs">
            <div>
              <span className="text-neutral-400 uppercase tracking-wider">Order Reference</span>
              <p className="text-sm font-mono font-bold text-neutral-900 dark:text-white mt-0.5">
                #{orderId}
              </p>
            </div>
            <div className="text-right">
              <span className="text-neutral-400 uppercase tracking-wider">Order Date</span>
              <p className="text-xs font-semibold text-neutral-900 dark:text-white mt-0.5">
                {orderPlacedDate}
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-xs">
            <div>
              <h4 className="font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-1">
                Shipping Destination
              </h4>
              <p className="text-neutral-600 dark:text-neutral-300">
                {shippingInfo.firstName} {shippingInfo.lastName}
              </p>
              <p className="text-neutral-600 dark:text-neutral-300">{shippingInfo.address}</p>
              {shippingInfo.apartment && (
                <p className="text-neutral-600 dark:text-neutral-300">{shippingInfo.apartment}</p>
              )}
              <p className="text-neutral-600 dark:text-neutral-300">
                {shippingInfo.city}, {shippingInfo.state} {shippingInfo.postalCode}
              </p>
              <p className="text-neutral-600 dark:text-neutral-300">{shippingInfo.country}</p>
            </div>

            <div>
              <h4 className="font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-1">
                Dispatch Timeline
              </h4>
              <p className="text-neutral-600 dark:text-neutral-300">
                Method: <strong>{shippingMethod === 'overnight' ? 'Priority Overnight' : shippingMethod === 'express' ? 'Express Courier' : 'Standard Delivery'}</strong>
              </p>
              <p className="text-neutral-600 dark:text-neutral-300 mt-1">
                Estimated Delivery: <strong>2 - 4 Business Days</strong>
              </p>
              <p className="text-[11px] text-emerald-600 font-semibold mt-2 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" /> Tracked with 100% Carbon Neutral Transit
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-between items-center text-sm font-bold text-neutral-900 dark:text-white">
            <span>Total Amount Paid</span>
            <span className="text-base">{formatPrice(finalTotal)}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => window.print()}
            className="w-full sm:w-auto px-6 py-3 rounded-full border border-neutral-300 dark:border-neutral-700 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
          >
            <Printer className="w-4 h-4" /> Print Receipt
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition shadow-lg"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl space-y-8">
      {/* Checkout Header */}
      <div className="flex items-center justify-between pb-6 border-b border-neutral-200 dark:border-neutral-800">
        <Link href="/cart" className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-black dark:hover:text-white transition">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Bag
        </Link>
        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>Encrypted Secure Checkout</span>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center max-w-md mx-auto">
        <div className="flex items-center w-full">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition ${
            step >= 1 ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950' : 'bg-neutral-200 text-neutral-600'
          }`}>
            1
          </div>
          <div className={`flex-1 h-0.5 mx-2 transition ${step >= 2 ? 'bg-neutral-950 dark:bg-white' : 'bg-neutral-200'}`} />
          <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition ${
            step >= 2 ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950' : 'bg-neutral-200 text-neutral-600'
          }`}>
            2
          </div>
          <div className={`flex-1 h-0.5 mx-2 transition ${step >= 3 ? 'bg-neutral-950 dark:bg-white' : 'bg-neutral-200'}`} />
          <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition ${
            step >= 3 ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950' : 'bg-neutral-200 text-neutral-600'
          }`}>
            3
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 items-start">
        {/* Left Form: Step 1, 2, or 3 */}
        <div className="lg:col-span-7 bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 shadow-sm space-y-6">
          {/* STEP 1: SHIPPING ADDRESS */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-5">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-neutral-400">Step 1 of 3</span>
                <h2 className="text-2xl font-bold font-serif uppercase tracking-tight text-neutral-950 dark:text-white mt-0.5">
                  Shipping Destination
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.firstName}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none"
                    placeholder="Jane"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.lastName}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={shippingInfo.email}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none"
                    placeholder="jane@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Phone Number (for Courier SMS) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  required
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none"
                  placeholder="123 Atelier Way"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Apartment, Suite, Unit (Optional)
                </label>
                <input
                  type="text"
                  value={shippingInfo.apartment}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, apartment: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none"
                  placeholder="Suite 4B"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    State / Region *
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.state}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.postalCode}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-neutral-800 transition flex items-center justify-center gap-2 shadow-lg"
              >
                Continue to Delivery Method <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 2: SHIPPING METHOD */}
          {step === 2 && (
            <form onSubmit={handleStep2Submit} className="space-y-6">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-neutral-400">Step 2 of 3</span>
                <h2 className="text-2xl font-bold font-serif uppercase tracking-tight text-neutral-950 dark:text-white mt-0.5">
                  Select Delivery Speed
                </h2>
              </div>

              <div className="space-y-3">
                {[
                  {
                    id: 'standard',
                    name: 'Standard Carbon-Neutral Delivery',
                    time: '3-5 Business Days',
                    fee: shippingAmount === 0 ? 'FREE' : formatPrice(shippingAmount)
                  },
                  {
                    id: 'express',
                    name: 'Express Priority Air Courier',
                    time: '2-3 Business Days',
                    fee: formatPrice(15)
                  },
                  {
                    id: 'overnight',
                    name: 'Priority White-Glove Overnight',
                    time: 'Next Day by 12:00 PM',
                    fee: formatPrice(25)
                  }
                ].map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition ${
                      shippingMethod === option.id
                        ? 'border-neutral-950 dark:border-white bg-neutral-50 dark:bg-neutral-800/60 shadow-sm'
                        : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        value={option.id}
                        checked={shippingMethod === option.id}
                        onChange={() => setShippingMethod(option.id as 'standard' | 'express' | 'overnight')}
                        className="accent-neutral-950"
                      />
                      <div>
                        <p className="text-xs font-bold text-neutral-900 dark:text-white">{option.name}</p>
                        <p className="text-[11px] text-neutral-500">{option.time}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-neutral-900 dark:text-white">{option.fee}</span>
                  </label>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-3.5 border border-neutral-300 dark:border-neutral-700 rounded-full text-xs font-semibold uppercase tracking-wider"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3.5 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-neutral-800 transition flex items-center justify-center gap-2 shadow-lg"
                >
                  Proceed to Payment <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: PAYMENT METHOD */}
          {step === 3 && (
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-neutral-400">Step 3 of 3</span>
                <h2 className="text-2xl font-bold font-serif uppercase tracking-tight text-neutral-950 dark:text-white mt-0.5">
                  Payment Method
                </h2>
              </div>

              {/* Payment selector tabs */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition ${
                    paymentMethod === 'card'
                      ? 'border-neutral-950 bg-neutral-50 dark:bg-neutral-800 dark:border-white text-neutral-950 dark:text-white'
                      : 'border-neutral-200 dark:border-neutral-700 text-neutral-600'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('applepay')}
                  className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition ${
                    paymentMethod === 'applepay'
                      ? 'border-neutral-950 bg-neutral-50 dark:bg-neutral-800 dark:border-white text-neutral-950 dark:text-white'
                      : 'border-neutral-200 dark:border-neutral-700 text-neutral-600'
                  }`}
                >
                  <Lock className="w-5 h-5" />
                  <span>Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition ${
                    paymentMethod === 'cod'
                      ? 'border-neutral-950 bg-neutral-50 dark:bg-neutral-800 dark:border-white text-neutral-950 dark:text-white'
                      : 'border-neutral-200 dark:border-neutral-700 text-neutral-600'
                  }`}
                >
                  <Truck className="w-5 h-5" />
                  <span>Pay on Delivery</span>
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4 pt-2">
                  {/* Visual simulated card */}
                  <div className="bg-gradient-to-tr from-neutral-900 via-neutral-800 to-neutral-700 text-white p-5 rounded-2xl shadow-xl space-y-4 max-w-sm">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-mono tracking-widest">FASHIONAURA CLIENT CARD</span>
                      <Sparkles className="w-4 h-4 text-amber-400" />
                    </div>
                    <p className="font-mono text-base tracking-widest pt-2">
                      {cardInfo.number || '•••• •••• •••• ••••'}
                    </p>
                    <div className="flex justify-between items-end text-xs font-mono pt-2">
                      <div>
                        <span className="text-[9px] uppercase opacity-70 block">Cardholder</span>
                        <span>{cardInfo.holder.toUpperCase() || 'VALUED CLIENT'}</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase opacity-70 block">Expires</span>
                        <span>{cardInfo.expiry || 'MM/YY'}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={19}
                      placeholder="4532 •••• •••• 8920"
                      value={cardInfo.number}
                      onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Jane Doe"
                        value={cardInfo.holder}
                        onChange={(e) => setCardInfo({ ...cardInfo, holder: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                          Expiry *
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={5}
                          placeholder="MM/YY"
                          value={cardInfo.expiry}
                          onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                          CVV *
                        </label>
                        <input
                          type="password"
                          required
                          maxLength={4}
                          placeholder="123"
                          value={cardInfo.cvv}
                          onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'applepay' && (
                <div className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl text-center text-xs space-y-2">
                  <Lock className="w-8 h-8 mx-auto text-neutral-500" />
                  <p className="font-semibold text-neutral-900 dark:text-white">
                    Touch ID / Face ID Quick Authorization
                  </p>
                  <p className="text-neutral-500 text-[11px]">
                    Clicking &quot;Authorize & Place Order&quot; simulates biometric verification and securely charges your default card.
                  </p>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl text-center text-xs space-y-2">
                  <Truck className="w-8 h-8 mx-auto text-neutral-500" />
                  <p className="font-semibold text-neutral-900 dark:text-white">
                    Pay in Cash or Card at Doorstep
                  </p>
                  <p className="text-neutral-500 text-[11px]">
                    Our courier will carry a mobile terminal. Inspect your items before finalizing payment.
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3.5 border border-neutral-300 dark:border-neutral-700 rounded-full text-xs font-semibold uppercase tracking-wider"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-neutral-800 transition flex items-center justify-center gap-2 shadow-2xl"
                >
                  <PackageCheck className="w-4 h-4" /> Authorize & Place Order ({formatPrice(finalTotal)})
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Column: Order Summary & Review */}
        <div className="lg:col-span-5 bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 shadow-sm space-y-6 sticky top-28">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
            <h3 className="text-sm font-bold font-serif uppercase tracking-wider text-neutral-900 dark:text-white">
              Order Items ({cart.length})
            </h3>
            <Link href="/cart" className="text-xs text-neutral-500 hover:underline">
              Edit
            </Link>
          </div>

          {/* Cart list preview */}
          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.cartItemId} className="flex items-center gap-3">
                <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800 shrink-0">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                  <span className="absolute top-0 right-0 bg-neutral-900 text-white text-[9px] font-bold px-1 rounded-bl">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 min-w-0 text-xs">
                  <p className="font-semibold text-neutral-900 dark:text-white truncate">
                    {item.product.name}
                  </p>
                  <p className="text-[11px] text-neutral-400">
                    {item.selectedSize} &bull; {item.selectedColor.name}
                  </p>
                </div>
                <span className="text-xs font-bold text-neutral-900 dark:text-white">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400 pt-4 border-t border-neutral-100 dark:border-neutral-800">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-neutral-900 dark:text-white">
                {formatPrice(subtotal)}
              </span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Coupon ({appliedCoupon?.code})</span>
                <span>-{formatPrice(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery Method</span>
              <span>
                {selectedShippingFee === 0 ? (
                  <span className="text-emerald-600 font-semibold">FREE</span>
                ) : (
                  formatPrice(selectedShippingFee)
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Sales Tax (8%)</span>
              <span>{formatPrice(taxAmount)}</span>
            </div>
            <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex justify-between text-sm font-bold text-neutral-900 dark:text-white">
              <span>Final Total</span>
              <span className="text-base">{formatPrice(finalTotal)}</span>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-neutral-500 space-y-1">
            <p className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
              <span>Free returns within 30 days of delivery</span>
            </p>
            <p className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-neutral-400" />
              <span>Bank-level TLS 1.3 encryption</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

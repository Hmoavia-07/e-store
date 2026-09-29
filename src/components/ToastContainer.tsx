"use client";
import React from 'react';
import { useStore } from '../context/StoreContext';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`pointer-events-auto p-4 rounded-xl shadow-2xl border backdrop-blur-md flex items-start gap-3 ${
              toast.type === 'error'
                ? 'bg-red-950/90 text-red-100 border-red-800'
                : toast.type === 'info'
                ? 'bg-neutral-900/90 text-neutral-100 border-neutral-700'
                : 'bg-neutral-900/95 text-white border-neutral-700'
            }`}
          >
            {toast.type === 'error' && (
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
            )}
            {toast.type === 'info' && (
              <Info className="w-5 h-5 text-sky-400 mt-0.5 shrink-0" />
            )}
            {toast.type === 'success' && (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
            )}

            <div className="flex-1">
              <h4 className="text-sm font-semibold tracking-wide">{toast.title}</h4>
              <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-neutral-400 hover:text-white transition-colors p-1"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

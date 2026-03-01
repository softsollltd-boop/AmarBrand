
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface ToastProps {
  product: Product | null;
  isVisible: boolean;
}

const PremiumToast: React.FC<ToastProps> = ({ product, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && product && (
        <motion.div
          initial={{ y: -100, x: '-50%', opacity: 0 }}
          animate={{ y: 24, x: '-50%', opacity: 1 }}
          exit={{ y: -100, x: '-50%', opacity: 0 }}
          className="fixed top-0 left-1/2 z-[500] w-full max-w-sm"
        >
          <div className="mx-4 bg-white border border-slate-100 shadow-2xl rounded-[2rem] p-4 flex items-center gap-4">
            <div className="w-12 h-16 bg-slate-50 rounded-xl overflow-hidden shrink-0">
              <img src={product.image} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 size={12} className="text-emerald-500" />
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Added to Archive</span>
              </div>
              <h4 className="text-[11px] font-black uppercase text-slate-900 truncate pr-4">{product.name}</h4>
            </div>
            <div className="bg-black text-white p-2 rounded-full">
              <ShoppingBag size={14} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PremiumToast;

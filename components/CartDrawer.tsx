
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, ArrowRight, Plus, Minus } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove, onCheckout }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.sale_price || item.price) * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-[150]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 35, stiffness: 250 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[450px] bg-white z-[200] flex flex-col shadow-3xl"
          >
            <div className="p-8 md:p-10 border-b border-slate-50 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 italic">Your Cart</span>
                <h2 className="text-xl font-black uppercase tracking-tighter mt-1 italic">Shopping Bag ({items.length})</h2>
              </div>
              <button 
                onClick={onClose} 
                className="p-3 bg-slate-50 rounded-2xl hover:bg-slate-900 hover:text-white transition-all active:scale-90"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 md:p-10 space-y-10 scrollbar-hide">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-10">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-8 animate-pulse">
                    <ShoppingBag size={40} />
                  </div>
                  <p className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-300">Your Cart is Empty</p>
                  <button 
                    onClick={onClose}
                    className="mt-10 text-[10px] font-black uppercase tracking-widest text-emerald-500 hover:text-emerald-700 transition-colors"
                  >
                    Start Exploring
                  </button>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <motion.div 
                      key={item.id} 
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex gap-6 group relative"
                    >
                      <div className="w-24 h-32 bg-slate-100 rounded-2xl overflow-hidden shrink-0 border border-slate-200">
                        <img src={item.image} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700" alt={item.name} />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                        <div>
                          <div className="flex justify-between items-start gap-4">
                            <h3 className="text-[12px] font-black uppercase tracking-tight text-slate-900 leading-tight truncate italic">{item.name}</h3>
                            <button onClick={() => onRemove(item.id)} className="text-slate-300 hover:text-red-500 transition-colors shrink-0 p-1 active:scale-90"><Trash2 size={16} /></button>
                          </div>
                          <p className="text-[11px] font-black text-emerald-600 mt-2 italic tracking-widest">৳{(item.sale_price || item.price).toLocaleString()}</p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-6">
                          <div className="flex items-center bg-slate-50 rounded-xl border border-slate-100 p-1">
                            <button 
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-slate-900 transition-all active:scale-125"
                            >
                              <Minus size={14} strokeWidth={3} />
                            </button>
                            <span className="text-[12px] font-black w-10 text-center tabular-nums">{item.quantity}</span>
                            <button 
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-slate-900 transition-all active:scale-125"
                            >
                              <Plus size={14} strokeWidth={3} />
                            </button>
                          </div>
                          <span className="text-[13px] font-black text-slate-900 tabular-nums italic">
                            ৳{((item.sale_price || item.price) * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-8 md:p-12 bg-slate-50 border-t border-slate-100 space-y-8">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Subtotal</span>
                    <p className="text-3xl font-black text-slate-900 tracking-tighter tabular-nums italic mt-1">৳{subtotal.toLocaleString()}</p>
                  </div>
                  <div className="bg-emerald-50 text-emerald-600 text-[8px] font-black uppercase px-3 py-1 rounded-full border border-emerald-100 mb-2">Secure</div>
                </div>
                <button 
                  onClick={onCheckout}
                  className="w-full bg-black text-white py-6 rounded-3xl font-black text-[12px] uppercase tracking-[0.4em] flex items-center justify-center gap-4 shadow-3xl hover:bg-emerald-600 transition-all active:scale-[0.98] italic"
                >
                  Checkout Now <ArrowRight size={18} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;

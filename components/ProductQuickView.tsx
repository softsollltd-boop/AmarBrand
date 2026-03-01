
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Zap, ArrowRight, Search } from 'lucide-react';
import { Product } from '../types';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (p: Product, qty: number) => void;
  onViewFullDetails: (p: Product) => void;
}

const ProductQuickView: React.FC<ProductQuickViewProps> = ({ product, onClose, onAddToCart, onViewFullDetails }) => {
  const [qty, setQty] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  if (!product) return null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-[400] flex items-end sm:items-center justify-center p-0 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/20 backdrop-blur-md"
          />
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 32, stiffness: 350 }}
            className="relative w-full max-w-4xl bg-white rounded-t-[2.5rem] sm:rounded-[3rem] shadow-3xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] sm:max-h-[85vh] lg:h-auto"
          >
            {/* Mobile Drag Indicator */}
            <div className="h-1.5 w-12 bg-slate-100 rounded-full mx-auto mt-4 sm:hidden flex-shrink-0" />

            <div 
              ref={containerRef}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
              className="w-full md:w-1/2 bg-slate-50 relative overflow-hidden h-[300px] md:h-auto cursor-zoom-in"
            >
              <motion.img 
                src={product.image} 
                animate={{
                  scale: isZoomed ? 2.2 : 1,
                  x: isZoomed ? `${50 - mousePos.x}%` : 0,
                  y: isZoomed ? `${50 - mousePos.y}%` : 0,
                }}
                transition={{ type: 'tween', ease: 'easeOut', duration: 0.15 }}
                className="w-full h-full object-cover pointer-events-none" 
                alt={product.name} 
              />
              
              <div className="absolute bottom-6 left-6 pointer-events-none transition-opacity hidden md:block" style={{ opacity: isZoomed ? 0 : 0.8 }}>
                 <div className="bg-white/80 backdrop-blur-xl px-4 py-2 rounded-xl flex items-center gap-3 text-slate-900 border border-white/50 shadow-lg">
                    <Search size={14} className="text-emerald-600" />
                    <span className="text-[10px] font-black uppercase tracking-widest italic">Precision Zoom</span>
                 </div>
              </div>

              {product.is_featured && (
                <div className="absolute top-6 left-6 bg-emerald-600 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-xl shadow-emerald-600/20 pointer-events-none">
                  <Zap size={10} className="text-white" fill="white" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-white italic">Elite Archive</span>
                </div>
              )}
            </div>

            <div className="flex-1 p-8 md:p-14 flex flex-col justify-center overflow-y-auto">
              <div className="mb-10">
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-4 block italic">
                  Artifact // {product.category}
                </span>
                <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 leading-[1.1] mb-6 uppercase italic">
                  {product.name}
                </h2>
                <div className="flex items-center gap-6 mb-8">
                  <span className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter italic">৳{(product.sale_price || product.price).toLocaleString()}</span>
                  {product.sale_price && (
                    <span className="text-lg text-slate-200 line-through font-bold tabular-nums">৳{product.price.toLocaleString()}</span>
                  )}
                </div>
                <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed max-w-sm italic">
                  "{product.description}"
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex items-center justify-between bg-slate-50 rounded-2xl px-6 py-5 w-full sm:w-40 border border-slate-100">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-1 text-slate-300 hover:text-emerald-600 transition-all active:scale-150"><Minus size={18} /></button>
                    <span className="text-lg font-black tabular-nums">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="p-1 text-slate-300 hover:text-emerald-600 transition-all active:scale-150"><Plus size={18} /></button>
                  </div>
                  <button 
                    onClick={() => {
                      onAddToCart(product, qty);
                      onClose();
                    }}
                    className="w-full bg-slate-900 text-white rounded-2xl font-black py-5 md:py-6 hover:bg-emerald-600 transition-all flex items-center justify-center gap-4 active:scale-[0.98] shadow-2xl shadow-slate-200 uppercase text-[11px] tracking-[0.3em]"
                  >
                    <ShoppingBag size={20} /> Add To Bag
                  </button>
                </div>

                <button 
                  onClick={() => {
                    onViewFullDetails(product);
                    onClose();
                  }}
                  className="w-full flex items-center justify-center gap-3 text-[9px] font-black uppercase tracking-[0.4em] text-slate-300 hover:text-emerald-600 transition-all pt-8 border-t border-slate-50 group"
                >
                  Full Artifact Manifesto <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>

            <button 
              onClick={onClose} 
              className="absolute top-8 right-8 p-3 text-slate-300 hover:text-rose-500 transition-all bg-white sm:bg-transparent rounded-full shadow-lg sm:shadow-none"
            >
              <X size={24} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProductQuickView;

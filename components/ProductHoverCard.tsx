
import React, { useEffect } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { Product } from '../types';
import { Zap } from 'lucide-react';

interface ProductHoverCardProps {
  product: Product | null;
}

const ProductHoverCard: React.FC<ProductHoverCardProps> = ({ product }) => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX + 20); // Offset from cursor
      mouseY.set(e.clientY + 20);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed top-0 left-0 z-[1000] pointer-events-none hidden lg:block"
          style={{ x, y }}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
        >
          <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] rounded-3xl p-5 min-w-[220px] overflow-hidden">
            <div className="flex gap-4 items-center">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                <img src={product.image} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[8px] font-black uppercase tracking-[0.3em] text-indigo-600 mb-1 flex items-center gap-1">
                  {product.is_featured && <Zap size={8} fill="currentColor" />}
                  {product.category}
                </p>
                <h4 className="text-[11px] font-black uppercase text-slate-900 truncate mb-1">{product.name}</h4>
                <p className="text-[10px] font-black text-slate-400">৳{(product.sale_price || product.price).toLocaleString()}</p>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[7px] font-black uppercase tracking-widest text-slate-300">Click to Inspect</span>
              <div className="w-1 h-1 rounded-full bg-indigo-500 animate-pulse" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductHoverCard;

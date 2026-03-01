
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ChevronLeft, Star, ShieldCheck, Truck, RefreshCcw, Plus, Minus, Zap } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailsPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (p: Product, qty: number) => void;
}

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({ product, onBack, onAddToCart }) => {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white pt-24 md:pt-32 pb-24"
    >
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-16">
        <button 
          onClick={onBack}
          className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-emerald-600 transition-all mb-10 md:mb-16 group active:scale-95"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Shop
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 xl:gap-32">
          {/* Images Section */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            <motion.div 
              layoutId={`product-image-${product.id}`}
              className="aspect-square rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-sm flex items-center justify-center p-8"
            >
              <img src={selectedImage} alt={product.name} className="max-w-full max-h-full object-contain" referrerPolicy="no-referrer" />
            </motion.div>
            <div className="grid grid-cols-4 gap-3 md:gap-6">
               {[1, 2, 3, 4].map((i) => (
                 <button 
                   key={i}
                   onClick={() => setSelectedImage(`https://picsum.photos/seed/${product.slug}-${i}/1200/1200`)}
                   className={`aspect-square rounded-xl overflow-hidden border-2 transition-all active:scale-90 p-2 bg-white ${selectedImage.includes(`-${i}`) ? 'border-emerald-600 scale-95 shadow-lg' : 'border-slate-100 opacity-60 hover:opacity-100'}`}
                 >
                   <img src={`https://picsum.photos/seed/${product.slug}-${i}/500/500`} className="w-full h-full object-contain" loading="lazy" referrerPolicy="no-referrer" />
                 </button>
               ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <div className="mb-10 md:mb-16">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.2em] bg-emerald-50 px-5 py-2 rounded-full border border-emerald-100">
                  {product.category}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-8">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4 mb-10">
                <span className="text-3xl md:text-4xl font-bold tracking-tight text-emerald-600">৳{(product.sale_price || product.price).toLocaleString()}</span>
                {product.sale_price && (
                  <span className="text-xl text-slate-300 line-through font-medium">৳{product.price.toLocaleString()}</span>
                )}
              </div>

              <div className="prose prose-slate max-w-none">
                <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed border-l-4 border-emerald-100 pl-8 py-2">
                  {product.description}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-12 md:mb-20">
               <div className="flex items-center justify-between bg-white rounded-2xl px-8 py-5 sm:w-48 border border-slate-200">
                  <button onClick={() => setQty(Math.max(1, qty-1))} className="text-slate-400 hover:text-emerald-600 transition-colors active:scale-125"><Minus size={18} /></button>
                  <span className="text-lg font-bold tabular-nums">{qty}</span>
                  <button onClick={() => setQty(qty+1)} className="text-slate-400 hover:text-emerald-600 transition-colors active:scale-125"><Plus size={18} /></button>
               </div>
               <button 
                 onClick={() => onAddToCart(product, qty)}
                 className="flex-1 bg-emerald-600 text-white rounded-2xl font-bold text-sm uppercase tracking-wider hover:bg-emerald-700 transition-all py-6 flex items-center justify-center gap-4 active:scale-[0.98] shadow-xl shadow-emerald-100"
               >
                 <ShoppingBag size={20} /> Add To Cart
               </button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-slate-100">
               {[
                 { icon: Truck, label: 'Fast Delivery' },
                 { icon: ShieldCheck, label: 'Secure Payment' },
                 { icon: RefreshCcw, label: '7-Day Return' }
               ].map((item, idx) => (
                 <div key={idx} className="flex flex-col gap-4 items-center text-center">
                   <div className="w-12 h-12 md:w-16 md:h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 hover:bg-emerald-100 transition-colors">
                      <item.icon size={20} />
                   </div>
                   <h4 className="text-[9px] font-bold uppercase tracking-wider text-slate-400 leading-tight">{item.label}</h4>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetailsPage;

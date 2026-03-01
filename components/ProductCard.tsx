
import React from 'react';
import { Plus, Zap, Eye } from 'lucide-react';
import { Product } from '../types';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onViewDetails: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetails }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group"
    >
      <div 
        className="relative aspect-[4/5] overflow-hidden bg-white rounded-2xl cursor-pointer border border-slate-100 transition-all duration-500 hover:shadow-xl hover:border-emerald-100"
        onClick={() => onViewDetails(product)}
      >
        <motion.img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        
        {product.is_featured && (
          <div className="absolute top-3 left-3 bg-emerald-600 px-3 py-1 rounded-full shadow-sm">
             <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 text-white">
               <Zap size={10} fill="currentColor" /> 
               Genuine
             </span>
          </div>
        )}

        {/* Hover Controls */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-3 md:translate-y-4 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 px-4">
          <button 
            onClick={(e) => { e.stopPropagation(); onViewDetails(product); }}
            className="w-10 h-10 bg-white text-slate-900 rounded-full shadow-xl hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center active:scale-90 border border-slate-100"
            title="Quick View"
          >
            <Eye size={18} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
            className="w-10 h-10 bg-emerald-600 text-white rounded-full shadow-xl hover:bg-emerald-700 transition-all flex items-center justify-center active:scale-90"
            title="Add to Cart"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      <div className="mt-4 px-1">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-bold tracking-tight text-slate-800 line-clamp-2 min-h-[2.5rem] group-hover:text-emerald-600 transition-colors">{product.name}</h3>
          <div className="flex justify-between items-center mt-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{product.category}</p>
            <div className="flex flex-col items-end">
              {product.sale_price && (
                <span className="text-[10px] text-slate-400 line-through">৳{product.price.toLocaleString()}</span>
              )}
              <span className="text-sm md:text-base font-bold text-emerald-600">
                ৳{(product.sale_price || product.price).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

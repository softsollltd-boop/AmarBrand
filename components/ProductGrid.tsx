
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchX, Loader2 } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '../types';
import { ProductService } from '../services/productService';

interface ProductGridProps {
  category: string | null;
  search: string;
  onAddToCart: (p: Product) => void;
  onViewDetails: (p: Product) => void;
}

const ProductSkeleton = () => (
  <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm p-4">
    <div className="aspect-square relative overflow-hidden rounded-[2rem] bg-slate-100">
      <motion.div 
        animate={{ x: ['-100%', '100%'] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
      />
    </div>
    <div className="p-6 space-y-4">
      <div className="relative h-3 w-1/4 bg-slate-100 rounded-full overflow-hidden">
        <motion.div 
          animate={{ x: ['-100%', '100%'] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear', delay: 0.1 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
        />
      </div>
      <div className="relative h-6 w-3/4 bg-slate-100 rounded-xl overflow-hidden">
        <motion.div 
          animate={{ x: ['-100%', '100%'] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear', delay: 0.2 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
        />
      </div>
      <div className="flex justify-between items-center pt-2">
        <div className="relative h-8 w-1/3 bg-slate-100 rounded-xl overflow-hidden">
          <motion.div 
            animate={{ x: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear', delay: 0.3 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
          />
        </div>
        <div className="flex gap-2">
          <div className="w-10 h-10 rounded-full bg-slate-100" />
          <div className="w-10 h-10 rounded-full bg-slate-100" />
        </div>
      </div>
    </div>
  </div>
);

const ProductGrid: React.FC<ProductGridProps> = ({ category, search, onAddToCart, onViewDetails }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await ProductService.getAllProducts({
        category: category || undefined,
        search: search || undefined
      });
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, [category, search]);

  if (loading) {
    return (
      <div className="space-y-8">
        {search && (
          <div className="flex items-center gap-2 text-slate-500 font-medium animate-pulse">
            <Loader2 className="animate-spin" size={18} />
            <span>Searching for "{search}"...</span>
          </div>
        )}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {[...Array(8)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={`${category || 'all'}-${search}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
      >
        {products.length > 0 ? (
          products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ProductCard 
                product={product} 
                onAddToCart={onAddToCart} 
                onViewDetails={onViewDetails}
              />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-32 flex flex-col items-center justify-center text-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-24 h-24 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mb-6"
            >
              <SearchX size={48} />
            </motion.div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No vibes matched your search</h3>
            <p className="text-slate-500 max-w-sm mx-auto">
              We couldn't find anything for "{search}". Maybe try searching for something else or browse our categories.
            </p>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductGrid;

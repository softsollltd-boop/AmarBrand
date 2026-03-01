
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { ProductService } from '../services/productService';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose, onSelectProduct }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      const data = await ProductService.searchProducts(query);
      setResults(data);
      setIsSearching(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex flex-col bg-white overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 md:p-12 border-b border-slate-100">
            <div className="flex items-center gap-4 md:gap-8 flex-1 max-w-5xl">
              <Search className="text-slate-300 hidden sm:block" size={32} />
              <input
                autoFocus
                type="text"
                placeholder="Find your archive..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full text-2xl sm:text-4xl md:text-6xl font-black tracking-tighter outline-none placeholder:text-slate-100 uppercase italic"
              />
            </div>
            <button
              onClick={onClose}
              className="p-3 md:p-5 hover:bg-slate-100 rounded-3xl transition-all text-slate-300 hover:text-slate-900 active:scale-90"
            >
              <X size={28} />
            </button>
          </div>

          {/* Results Area */}
          <div className="flex-1 overflow-y-auto p-6 md:p-16 lg:p-24 scrollbar-hide">
            <div className="max-w-screen-2xl mx-auto">
              {isSearching ? (
                <div className="flex flex-col items-center justify-center py-24 gap-6">
                  <Loader2 className="animate-spin text-emerald-600" size={56} />
                  <p className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-300 italic">Syncing Archives</p>
                </div>
              ) : results.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16">
                  {results.map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      className="group flex gap-6 md:gap-10 cursor-pointer items-center p-4 md:p-0 rounded-3xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-24 h-32 md:w-40 md:h-52 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                        <img src={product.image} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-3 italic">{product.category}</p>
                        <h3 className="text-xl md:text-3xl font-black text-slate-900 tracking-tighter leading-tight mb-3 uppercase italic group-hover:text-emerald-600 transition-colors truncate">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-6">
                          <span className="text-lg md:text-xl font-black text-slate-900 tabular-nums italic">৳{(product.sale_price || product.price).toLocaleString()}</span>
                          <span className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-emerald-500">
                             <ArrowRight size={20} />
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : query.length >= 2 ? (
                <div className="text-center py-32">
                  <p className="text-slate-100 text-5xl md:text-9xl font-black tracking-tighter mb-6 italic">NULL_RESULT.</p>
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Try searching for essentials, pods, or archives.</p>
                </div>
              ) : (
                <div className="space-y-16 md:space-y-24">
                   <div>
                     <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-10 italic">Trending Artifacts</h4>
                     <div className="flex flex-wrap gap-3 md:gap-5">
                        {['Vibe-Pod Max', 'Minimal Tee', 'Structured Blazer', 'Tech Archives', 'Women Essentials'].map(tag => (
                          <button 
                            key={tag}
                            onClick={() => setQuery(tag)}
                            className="px-6 md:px-10 py-4 md:py-5 rounded-2xl border border-slate-100 text-[11px] md:text-xs font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all active:scale-95"
                          >
                            {tag}
                          </button>
                        ))}
                     </div>
                   </div>
                   
                   <div className="bg-slate-950 text-white rounded-[3rem] p-10 md:p-20 relative overflow-hidden group shadow-3xl">
                      <div className="absolute top-0 right-0 p-10 text-white/5 group-hover:text-emerald-500/10 transition-colors">
                        <Sparkles size={300} strokeWidth={1} />
                      </div>
                      <div className="relative z-10 max-w-xl">
                        <h4 className="text-3xl md:text-5xl font-black tracking-tighter mb-6 italic uppercase leading-none">The Future <br/>Of Curation.</h4>
                        <p className="text-slate-400 font-medium mb-10 text-sm md:text-base leading-relaxed italic">Our algorithm scans global trends to bring you the highest performing archives every Monday at 00:00 GMT+6.</p>
                        <button className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] text-emerald-400 group/btn active:scale-95">
                           Enter Society <ArrowRight size={18} className="group-hover/btn:translate-x-4 transition-transform" />
                        </button>
                      </div>
                   </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;

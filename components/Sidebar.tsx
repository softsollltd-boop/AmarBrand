
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Instagram, Twitter } from 'lucide-react';
import { CATEGORIES } from '../constants';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (slug: string | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onSelectCategory }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-md z-[200]"
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-[85%] max-w-sm bg-white z-[300] flex flex-col p-8 md:p-12 shadow-3xl border-r border-slate-50"
          >
            <div className="flex justify-between items-center mb-12 md:mb-16">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Explore Categories</span>
              <button 
                onClick={onClose} 
                className="p-3 bg-slate-50 rounded-2xl hover:bg-emerald-600 hover:text-white transition-all active:scale-90"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="flex-1 space-y-6 md:space-y-8">
              <button 
                onClick={() => { onSelectCategory(null); onClose(); }}
                className="block text-3xl md:text-4xl font-bold tracking-tight hover:text-emerald-600 transition-colors text-left w-full group"
              >
                <span className="flex items-center gap-4">
                  All Collections <ArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-emerald-500" size={24} />
                </span>
              </button>

              <div className="h-px bg-slate-100 w-full" />

              <div className="space-y-4 md:space-y-6">
                {CATEGORIES.map((cat) => (
                  <button 
                    key={cat.id}
                    onClick={() => { onSelectCategory(cat.slug); onClose(); }}
                    className="block text-lg md:text-xl font-bold text-slate-400 hover:text-slate-900 transition-all text-left w-full group"
                  >
                    <span className="flex items-center gap-4">
                      {cat.name} <ArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-emerald-600" size={18} />
                    </span>
                  </button>
                ))}
              </div>
            </nav>

            <div className="mt-auto pt-10 border-t border-slate-50 space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-3">Follow Us</h4>
                  <div className="flex gap-6">
                    <Instagram size={20} className="text-slate-400 hover:text-emerald-600 cursor-pointer transition-colors" />
                    <Twitter size={20} className="text-slate-400 hover:text-emerald-600 cursor-pointer transition-colors" />
                  </div>
                </div>
                <div className="text-right">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-3">Support</h4>
                  <p className="text-[10px] font-bold text-slate-900 uppercase leading-relaxed tracking-wider">
                    Gulshan 2, Dhaka<br/>Bangladesh.
                  </p>
                </div>
              </div>
              <p className="text-[9px] font-bold uppercase text-slate-300 tracking-[0.3em] text-center">AMAR BRAND © 2026</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;

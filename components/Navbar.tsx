
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Sparkles, LayoutGrid, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onCartClick: () => void;
  onTrackingClick: () => void;
  cartCount: number;
  cartTotal: number;
  isLoggedIn: boolean;
  onSearch: (query: string) => void;
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onCartClick, 
  onTrackingClick, 
  cartCount, 
  cartTotal,
  isLoggedIn,
  onSearch,
  onMenuClick
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'py-3 glass border-b border-slate-100 shadow-sm' : 'py-5 md:py-8'}`}>
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Left: Branding & Menu */}
        <div className="flex items-center gap-4 md:gap-8">
          <button 
            onClick={onMenuClick} 
            className="p-2.5 -ml-2 hover:bg-slate-100/50 rounded-full transition-all group active:scale-90"
            aria-label="Toggle Menu"
          >
            <Menu size={22} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
          
          <div 
            className="flex items-center gap-2 md:gap-3 cursor-pointer group" 
            onClick={() => window.location.href = '/'}
          >
            <div className="w-8 h-8 md:w-9 md:h-9 bg-emerald-600 rounded-xl flex items-center justify-center text-white transition-all group-hover:bg-emerald-700">
              <Sparkles size={18} fill="currentColor" />
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tighter uppercase hidden sm:block text-slate-900">AMAR BRAND</span>
          </div>
        </div>

        {/* Center: Mobile Logo */}
        <div className="sm:hidden absolute left-1/2 -translate-x-1/2" onClick={() => window.location.href = '/'}>
           <span className="text-xl font-black tracking-tighter uppercase text-slate-900">AMAR BRAND</span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1 md:gap-4">
          <button onClick={() => onSearch("")} className="text-slate-400 hover:text-black transition-colors p-2.5 active:scale-90">
            <Search size={22} />
          </button>
          
          <button 
            onClick={onCartClick} 
            className="group relative flex items-center bg-emerald-600 text-white px-4 py-2.5 md:py-3 rounded-2xl gap-3 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 active:scale-95"
          >
            <div className="relative">
              <ShoppingBag size={18} strokeWidth={2.5} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-3 -right-3 bg-orange-500 text-white text-[9px] font-black min-w-5 h-5 px-1 rounded-full flex items-center justify-center shadow-lg border-2 border-emerald-600"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            
            <div className="hidden lg:flex flex-col items-start leading-none border-l border-white/20 pl-3">
               <span className="text-[11px] font-bold tabular-nums tracking-tight">
                 ৳{cartTotal.toLocaleString()}
               </span>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

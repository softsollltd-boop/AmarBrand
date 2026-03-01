
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Plus, Sparkles, CheckCircle2, ShoppingBag } from 'lucide-react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProductGrid from './components/ProductGrid';
import ProductDetailsPage from './components/ProductDetailsPage';
import SearchOverlay from './components/SearchOverlay';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import LogisticsTracker from './components/LogisticsTracker';
import WhatsAppButton from './components/WhatsAppButton';
import ProductQuickView from './components/ProductQuickView';
import PremiumToast from './components/PremiumToast';
import HeroCarousel from './components/HeroCarousel';
import Footer from './components/Footer';
import { Product, CartItem } from './types';
import { CATEGORIES } from './constants';
import { ProductService } from './services/productService';

type Route = 
  | { type: 'home' } 
  | { type: 'product', product: Product }
  | { type: 'success', orderId: string }
  | { type: 'tracking' };

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentRoute, setCurrentRoute] = useState<Route>({ type: 'home' });
  const [toastProduct, setToastProduct] = useState<Product | null>(null);
  const [showToast, setShowToast] = useState(false);
  const productsSectionRef = useRef<HTMLDivElement>(null);

  const cartTotal = cart.reduce((sum, item) => sum + (item.sale_price || item.price) * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleUpdateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
    ).filter(item => item.quantity > 0));
  };

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      return [...prev, { ...product, quantity }];
    });

    setToastProduct(product);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCheckoutSubmit = async (formData: any) => {
    const payload = {
      ...formData,
      items: cart.map(item => ({ product_id: item.id, quantity: item.quantity }))
    };

    try {
      const result = await ProductService.createOrder(payload);
      if (result.success) {
        setCart([]);
        setIsCheckoutOpen(false);
        if (result.payment_url && formData.payment_method === 'online') {
          window.location.href = result.payment_url;
        } else {
          setCurrentRoute({ type: 'success', orderId: result.order_number || 'N/A' });
        }
      }
    } catch (error) {
      alert("Checkout failed. Please check your network or try again.");
    }
  };

  const navigateToProduct = (product: Product) => {
    setCurrentRoute({ type: 'product', product });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const navigateHome = () => setCurrentRoute({ type: 'home' });

  return (
    <div className="min-h-screen bg-[#f4f7f6] selection:bg-emerald-100 selection:text-emerald-900">
      <PremiumToast product={toastProduct} isVisible={showToast} />
      
      <Navbar 
        isLoggedIn={false} 
        cartCount={cartCount} 
        cartTotal={cartTotal}
        onCartClick={() => setIsCartOpen(true)} 
        onTrackingClick={() => setCurrentRoute({ type: 'tracking' })}
        onSearch={() => setIsSearchOpen(true)}
        onMenuClick={() => setIsSidebarOpen(true)}
      />

      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onSelectCategory={(slug) => {
          setSelectedCategory(slug);
          productsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onSelectProduct={navigateToProduct} 
      />

      <ProductQuickView 
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onViewFullDetails={navigateToProduct}
      />

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart} 
        onUpdateQuantity={handleUpdateQuantity} 
        onRemove={(id) => handleUpdateQuantity(id, -cart.find(i => i.id === id)!.quantity)} 
        onCheckout={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }} 
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        items={cart} 
        onUpdateQuantity={handleUpdateQuantity}
        onSubmit={handleCheckoutSubmit} 
      />

      <AnimatePresence mode="wait">
        {currentRoute.type === 'home' && (
          <motion.main 
            key="home" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="relative"
          >
            {/* Hero Section - Fashion Slide Style */}
            <HeroCarousel onCtaClick={() => productsSectionRef.current?.scrollIntoView({ behavior: 'smooth' })} />

            {/* Catalog */}
            <section ref={productsSectionRef} className="py-16 md:py-24 px-6 md:px-12 max-w-screen-2xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12 md:mb-16">
                <div>
                  <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900 mb-2">
                    {selectedCategory ? CATEGORIES.find(c => c.slug === selectedCategory)?.name : 'Our Collection'}
                  </h2>
                  <p className="text-slate-500 text-sm md:text-base">Quality fashion essentials for your everyday lifestyle.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                   {CATEGORIES.map(cat => (
                    <button 
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${selectedCategory === cat.slug ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-200 hover:text-emerald-600'}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                  {selectedCategory && (
                    <button onClick={() => setSelectedCategory(null)} className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 border border-emerald-100">All</button>
                  )}
                </div>
              </div>
              <ProductGrid 
                category={selectedCategory} 
                search="" 
                onAddToCart={(p) => handleAddToCart(p, 1)} 
                onViewDetails={(p) => setQuickViewProduct(p)} 
              />
            </section>
          </motion.main>
        )}

        {currentRoute.type === 'product' && (
          <ProductDetailsPage product={currentRoute.product} onBack={navigateHome} onAddToCart={(p) => handleAddToCart(p, 1)} />
        )}

        {currentRoute.type === 'tracking' && (
          <LogisticsTracker onBack={navigateHome} />
        )}

        {currentRoute.type === 'success' && (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
              <div className="text-center p-10 md:p-20 max-w-2xl bg-white rounded-[3rem] shadow-3xl border border-slate-100 w-full">
                 <div className="w-24 h-24 md:w-32 md:h-32 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-10 text-emerald-500">
                    <CheckCircle2 size={56} />
                 </div>
                 <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-slate-900 uppercase italic">Thank You!</h2>
                 <p className="text-slate-500 font-bold mb-4 leading-relaxed text-lg uppercase tracking-widest">Your order has been placed successfully</p>
                 <div className="bg-slate-50 p-6 rounded-2xl mb-12 border border-slate-100">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Order Number</p>
                    <p className="text-2xl font-black text-emerald-600 tracking-tighter italic">#{currentRoute.orderId}</p>
                 </div>
                 <p className="text-slate-400 text-sm font-medium mb-12 max-w-md mx-auto">
                    We've received your order and are getting it ready for shipment. You'll receive a confirmation SMS shortly with tracking details.
                 </p>
                 <button 
                    onClick={navigateHome}
                    className="w-full sm:w-auto bg-slate-900 text-white px-12 py-6 rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:bg-emerald-600 transition-all shadow-2xl active:scale-95"
                  >
                    Continue Shopping
                 </button>
              </div>
           </motion.div>
        )}
      </AnimatePresence>

      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default App;

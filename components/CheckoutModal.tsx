
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, MapPin, Phone, User, Loader2, CreditCard, Plus, Minus, Trash2, ChevronDown } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onSubmit: (data: any) => Promise<void>;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, items, onUpdateQuantity, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    address: '',
    area: 'Inside Dhaka',
    payment_method: 'cod'
  });

  const subtotal = items.reduce((sum, item) => sum + (item.sale_price || item.price) * item.quantity, 0);
  const shipping = formData.area === 'Inside Dhaka' ? 60 : 120;
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (err) {
      alert("Checkout failed. Please check your network.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-0 sm:p-6 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            className="relative w-full max-w-6xl bg-white rounded-t-[2.5rem] sm:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row h-[95vh] lg:h-[90vh]"
          >
            {/* Left: Form Section */}
            <div className="flex-1 p-8 md:p-14 lg:p-20 overflow-y-auto order-2 lg:order-1">
              <div className="flex items-center justify-between mb-10 md:mb-14">
                <h2 className="text-2xl md:text-4xl font-black tracking-tighter uppercase italic">Secure Checkout</h2>
                <div className="hidden sm:flex items-center gap-2 text-emerald-500 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100">
                  <ShieldCheck size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest">SSL Secure</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10 pb-10">
                <div className="space-y-6">
                  <div className="relative group">
                    <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-600 transition-colors" size={18} />
                    <input required type="text" placeholder="Full Name" value={formData.customer_name} onChange={(e) => setFormData({...formData, customer_name: e.target.value})} className="w-full bg-slate-50 border-none rounded-2xl py-4 md:py-5 pl-14 md:pl-16 pr-6 text-sm font-bold outline-none focus:ring-4 focus:ring-emerald-600/5 transition-all" />
                  </div>
                  
                  <div className="relative group">
                    <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-600 transition-colors" size={18} />
                    <input required type="tel" placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-slate-50 border-none rounded-2xl py-4 md:py-5 pl-14 md:pl-16 pr-6 text-sm font-bold outline-none focus:ring-4 focus:ring-emerald-600/5 transition-all" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {['Inside Dhaka', 'Outside Dhaka'].map(area => (
                      <button
                        key={area}
                        type="button"
                        onClick={() => setFormData({...formData, area})}
                        className={`py-4 md:py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${formData.area === area ? 'bg-slate-900 text-white shadow-xl' : 'bg-slate-50 text-slate-400 border border-transparent hover:border-slate-200'}`}
                      >
                        {area}
                      </button>
                    ))}
                  </div>

                  <div className="relative group">
                    <MapPin className="absolute left-6 top-5 text-slate-300 group-focus-within:text-emerald-600 transition-colors" size={18} />
                    <textarea required rows={3} placeholder="Full Delivery Address" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full bg-slate-50 border-none rounded-2xl py-4 md:py-5 pl-14 md:pl-16 pr-6 text-sm font-bold outline-none focus:ring-4 focus:ring-emerald-600/5 transition-all resize-none leading-relaxed" />
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Payment Method</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { id: 'cod', label: 'Cash on Delivery', icon: ShieldCheck },
                        { id: 'online', label: 'Online Payment', icon: CreditCard }
                      ].map(method => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setFormData({...formData, payment_method: method.id})}
                          className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 transition-all ${formData.payment_method === method.id ? 'border-emerald-600 bg-emerald-50/50 text-emerald-700 shadow-lg shadow-emerald-100' : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'}`}
                        >
                          <method.icon size={20} />
                          <span className="text-[10px] font-black uppercase tracking-widest">{method.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  disabled={loading || items.length === 0}
                  className="w-full bg-emerald-600 text-white py-6 md:py-7 rounded-2xl md:rounded-[2rem] font-black text-[11px] md:text-[12px] uppercase tracking-[0.4em] hover:bg-slate-900 transition-all shadow-2xl active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-4"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} /> Processing...
                    </>
                  ) : (
                    <>
                      Confirm Order ৳{total.toLocaleString()} <ChevronDown className="-rotate-90" size={20} />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right: Order Summary */}
            <div className="w-full lg:w-[450px] bg-slate-50/50 p-8 md:p-12 lg:p-16 border-b lg:border-b-0 lg:border-l border-slate-100 flex flex-col order-1 lg:order-2">
              <div className="flex justify-between items-center mb-10">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 italic">Order Summary</h3>
                 <button onClick={onClose} className="p-2 text-slate-300 hover:text-rose-500 lg:hidden"><X size={20}/></button>
              </div>
              
              <div className="flex-1 space-y-6 overflow-y-auto max-h-[180px] lg:max-h-none scrollbar-hide mb-8">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-20 bg-white rounded-xl overflow-hidden shrink-0 border border-slate-100 p-1">
                      <img src={item.image} className="w-full h-full object-cover rounded-lg" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[11px] font-black text-slate-900 uppercase truncate leading-tight mb-1">{item.name}</h4>
                      <p className="text-[10px] font-bold text-emerald-600 mb-2 italic">৳{(item.sale_price || item.price).toLocaleString()} × {item.quantity}</p>
                      <div className="flex items-center gap-3">
                         <button onClick={() => onUpdateQuantity(item.id, -1)} className="p-1 hover:bg-white rounded transition-colors text-slate-300 hover:text-slate-900"><Minus size={12}/></button>
                         <span className="text-[11px] font-black tabular-nums">{item.quantity}</span>
                         <button onClick={() => onUpdateQuantity(item.id, 1)} className="p-1 hover:bg-white rounded transition-colors text-slate-300 hover:text-slate-900"><Plus size={12}/></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-slate-200 space-y-4">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span>Subtotal</span>
                  <span className="tabular-nums">৳{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span>Shipping</span>
                  <span className="tabular-nums">৳{shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pt-4">
                  <span className="text-[11px] font-black uppercase tracking-widest">Total Payable</span>
                  <span className="text-2xl md:text-3xl font-black tracking-tighter text-emerald-600 tabular-nums italic">৳{total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <button onClick={onClose} className="hidden lg:flex absolute top-10 right-10 p-3 text-slate-300 hover:text-slate-900 transition-colors">
              <X size={28} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;

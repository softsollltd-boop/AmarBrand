
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Package, Truck, CheckCircle, Clock, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import { ShippingStatus } from '../types';

interface LogisticsTrackerProps {
  onBack: () => void;
}

const LogisticsTracker: React.FC<LogisticsTrackerProps> = ({ onBack }) => {
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);
  const [error, setError] = useState('');

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId) return;

    setLoading(true);
    setError('');
    
    try {
      // Simulation: Using VIB- prefix for local testing
      await new Promise(r => setTimeout(r, 1000));
      if (orderId.startsWith('DP-')) {
        setOrderData({
          order_number: orderId,
          shipping_status: 'processing',
          customer_name: 'Amar Brand User',
          created_at: 'Feb 28, 2026',
          area: 'Dhaka City'
        });
      } else {
        setError("Order code not recognized. Check your SMS confirmation.");
      }
    } catch (err) {
      setError("Sync failed. Check your network.");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { key: 'pending', label: 'Captured', icon: Clock },
    { key: 'processing', label: 'Processing', icon: Package },
    { key: 'shipped', label: 'Transit', icon: Truck },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle },
  ];

  const currentStepIdx = steps.findIndex(s => s.key === orderData?.shipping_status);

  return (
    <div className="min-h-screen bg-[#f4f7f6] pt-24 md:pt-40 pb-20 px-6 sm:px-12">
      <div className="max-w-3xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-emerald-600 transition-all mb-8 md:mb-12 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Shop
        </button>

        <div className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-xl p-8 md:p-16 border border-slate-100 overflow-hidden">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900">Track Order.</h2>
          <p className="text-slate-400 font-bold uppercase text-[9px] md:text-[10px] tracking-widest mb-10 md:mb-12">Monitor your fashion's journey in real-time.</p>

          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4 mb-16">
            <div className="flex-1 relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-600 transition-colors" size={18} />
              <input
                type="text"
                placeholder="ORDER ID (e.g. DP-XXXX)"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value.toUpperCase())}
                className="w-full bg-slate-50 border-none rounded-2xl py-5 pl-14 pr-6 text-sm font-bold tracking-widest placeholder:text-slate-200 focus:ring-4 focus:ring-emerald-600/5 transition-all outline-none"
              />
            </div>
            <button className="bg-emerald-600 text-white px-10 py-5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-emerald-700 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl shadow-emerald-100">
              {loading ? <Loader2 className="animate-spin" size={18} /> : 'Track Now'}
            </button>
          </form>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 p-6 bg-rose-50 text-rose-600 rounded-2xl border border-rose-100">
                <AlertCircle size={20} />
                <p className="text-[10px] font-bold uppercase tracking-widest leading-none">{error}</p>
              </motion.div>
            )}

            {orderData && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-16">
                {/* Timeline Visual */}
                <div className="relative flex justify-between items-center px-4">
                  <div className="absolute top-1/2 left-4 right-4 h-1 bg-slate-100 -translate-y-1/2 -z-10 rounded-full" />
                  <div 
                    className="absolute top-1/2 left-4 h-1 bg-emerald-600 -translate-y-1/2 -z-10 transition-all duration-1000 rounded-full" 
                    style={{ width: `calc(${(currentStepIdx / (steps.length - 1)) * 100}% - 32px)` }}
                  />
                  
                  {steps.map((step, idx) => {
                    const isActive = idx <= currentStepIdx;
                    return (
                      <div key={step.key} className="flex flex-col items-center">
                        <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-700 ${isActive ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-100' : 'bg-white border-2 border-slate-100 text-slate-200'}`}>
                          <step.icon size={22} />
                        </div>
                        <span className={`hidden sm:block text-[9px] font-bold uppercase tracking-widest mt-6 ${isActive ? 'text-slate-900' : 'text-slate-300'}`}>
                          {step.label}
                        </span>
                      </div>
                    )
                  })}
                </div>

                <div className="bg-slate-50/50 rounded-[2rem] p-8 md:p-10 grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10 border border-slate-100">
                   <div>
                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Recipient</p>
                     <p className="text-base font-bold text-slate-900 tracking-tight">{orderData.customer_name}</p>
                   </div>
                   <div>
                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Current Phase</p>
                     <p className="text-base font-bold text-emerald-600 uppercase tracking-widest">{orderData.shipping_status}</p>
                   </div>
                   <div>
                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Identifier</p>
                     <p className="text-base font-bold text-slate-900 tracking-tight">{orderData.order_number}</p>
                   </div>
                   <div>
                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Arrival Area</p>
                     <p className="text-base font-bold text-slate-900 tracking-tight">{orderData.area}</p>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default LogisticsTracker;

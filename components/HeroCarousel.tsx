import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    title: "The Muslin Collection",
    subtitle: "Premium Heritage",
    description: "Exquisite hand-loomed muslin sarees, a timeless tribute to Bangladeshi craftsmanship.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=2000",
    cta: "Shop Heritage",
    color: "emerald"
  },
  {
    id: 2,
    title: "Modern Panjabi Edit",
    subtitle: "Men's Essentials",
    description: "Contemporary silhouettes meet traditional hand-embroidery for the modern gentleman.",
    image: "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&q=80&w=2000",
    cta: "Explore Panjabis",
    color: "orange"
  },
  {
    id: 3,
    title: "Artisanal Footwear",
    subtitle: "Premium Leather",
    description: "Hand-stitched leather loafers and boots, engineered for comfort and enduring style.",
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=2000",
    cta: "View Collection",
    color: "slate"
  }
];

interface HeroCarouselProps {
  onCtaClick: () => void;
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ onCtaClick }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % SLIDES.length);
  const prev = () => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  return (
    <section className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden bg-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent z-10" />
          <img
            src={SLIDES[current].image}
            alt={SLIDES[current].title}
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
          
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="max-w-screen-2xl mx-auto w-full px-6 md:px-12">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="max-w-xl"
              >
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/60 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-6">
                  {SLIDES[current].subtitle}
                </span>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white/90 tracking-tighter leading-[0.95] mb-8 uppercase">
                  {SLIDES[current].title.split(' ').map((word, i) => (
                    <span key={i} className={i === 1 ? "text-emerald-400/80" : ""}>{word} </span>
                  ))}
                </h1>
                <p className="text-base md:text-lg text-white/60 font-medium mb-10 max-w-md leading-relaxed">
                  {SLIDES[current].description}
                </p>
                <button
                  onClick={onCtaClick}
                  className="group relative bg-white text-slate-900 px-8 md:px-12 py-4 md:py-5 rounded-2xl text-xs font-bold uppercase tracking-widest overflow-hidden transition-all shadow-2xl active:scale-95"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {SLIDES[current].cta} <ArrowUpRight size={18} />
                  </span>
                  <motion.div className="absolute inset-0 bg-emerald-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="absolute inset-0 bg-emerald-600 group-hover:text-white transition-colors" />
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute bottom-12 right-6 md:right-12 z-30 flex items-center gap-4">
        <button
          onClick={prev}
          className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-slate-900 transition-all active:scale-90"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={next}
          className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-slate-900 transition-all active:scale-90"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-12 left-6 md:left-12 z-30 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 transition-all duration-500 rounded-full ${current === i ? 'w-12 bg-emerald-500' : 'w-4 bg-white/30'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;

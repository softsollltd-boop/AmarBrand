
import React from 'react';
import { Sparkles, Instagram, Twitter, Facebook, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-8 h-8 bg-emerald-600 rounded-xl flex items-center justify-center text-white transition-all group-hover:bg-emerald-700">
                <Sparkles size={18} fill="currentColor" />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase text-slate-900">AMAR BRAND</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Your destination for premium fashion and lifestyle. Quality craftsmanship meets modern design.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-emerald-600 hover:text-white transition-all active:scale-90">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 mb-8">Collections</h4>
            <ul className="space-y-4">
              {["Men's Wear", "Women's Wear", "Accessories", "Footwear"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 mb-8">Support</h4>
            <ul className="space-y-4">
              {["Track Order", "Shipping Policy", "Return & Exchange", "Privacy Policy"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 mb-8">Contact</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin size={18} className="text-emerald-600 shrink-0" />
                <span className="text-sm font-medium text-slate-500 leading-relaxed">
                  Gulshan 2, Dhaka 1212<br />Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={18} className="text-emerald-600 shrink-0" />
                <span className="text-sm font-medium text-slate-500">+880 1700 000000</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={18} className="text-emerald-600 shrink-0" />
                <span className="text-sm font-medium text-slate-500">hello@amarbrand.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            © 2026 AMAR BRAND SOCIETY. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-8">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" />
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/SSLCommerz_Logo.png/1200px-SSLCommerz_Logo.png" alt="SSLCommerz" className="h-5 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

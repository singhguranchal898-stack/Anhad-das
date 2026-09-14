import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { X, User, Mail, Lock, Phone, Sparkles, Shield } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    authModalMode, 
    login, 
    register, 
    demoLogin 
  } = useRestaurant();

  const [mode, setMode] = useState<'login' | 'register'>(authModalMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await register(name, email, phone, password);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#110f0c] border border-[#c5a059]/40 max-w-md w-full rounded-xs shadow-2xl relative p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 text-[#887b6a] hover:text-[#c5a059] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Brand Heading */}
        <div className="text-center mb-6">
          <span className="font-cinzel text-xs text-[#c5a059] tracking-[0.3em] uppercase block">
            Anhad Das
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#f7eee2] mt-1">
            {mode === 'login' ? 'Guest Circle Login' : 'Create Guest Profile'}
          </h3>
          <p className="text-xs text-[#9c8e7d] mt-1 font-light">
            Access your reservations, favourite royal dishes, and event consultations.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border border-[#2b251c] rounded-xs p-1 mb-6 bg-[#0e0c0a]">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-2 text-xs uppercase tracking-wider font-cinzel transition-all ${
              mode === 'login'
                ? 'bg-[#c5a059] text-black font-semibold'
                : 'text-[#968977] hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 py-2 text-xs uppercase tracking-wider font-cinzel transition-all ${
              mode === 'register'
                ? 'bg-[#c5a059] text-black font-semibold'
                : 'text-[#968977] hover:text-white'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-[#cdc1b1] font-medium flex items-center space-x-1.5">
                <User className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Vikramaditya Singhania"
                className="w-full bg-[#181512] border border-[#2c251c] focus:border-[#c5a059] text-sm text-[#f4eee4] px-3.5 py-2.5 rounded-xs outline-none transition-colors placeholder:text-[#6a6052]"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-[#cdc1b1] font-medium flex items-center space-x-1.5">
              <Mail className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="guest@heritage.in"
              className="w-full bg-[#181512] border border-[#2c251c] focus:border-[#c5a059] text-sm text-[#f4eee4] px-3.5 py-2.5 rounded-xs outline-none transition-colors placeholder:text-[#6a6052]"
            />
          </div>

          {mode === 'register' && (
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-[#cdc1b1] font-medium flex items-center space-x-1.5">
                <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Phone Number</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-[#181512] border border-[#2c251c] focus:border-[#c5a059] text-sm text-[#f4eee4] px-3.5 py-2.5 rounded-xs outline-none transition-colors placeholder:text-[#6a6052]"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-[#cdc1b1] font-medium flex items-center space-x-1.5">
              <Lock className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Password</span>
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#181512] border border-[#2c251c] focus:border-[#c5a059] text-sm text-[#f4eee4] px-3.5 py-2.5 rounded-xs outline-none transition-colors placeholder:text-[#6a6052]"
            />
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-3 bg-[#c5a059] text-black font-semibold text-xs tracking-[0.2em] uppercase hover:bg-[#d8b569] transition-all rounded-xs shadow-lg mt-2"
          >
            {isProcessing ? 'Verifying...' : mode === 'login' ? 'Sign In To Account' : 'Complete Registration'}
          </button>
        </form>

        {/* Quick Demo Logins Strip */}
        <div className="mt-6 pt-6 border-t border-[#241f17] space-y-2">
          <div className="text-[10px] uppercase tracking-widest text-[#7d705f] text-center mb-2">
            Direct Demo Access
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => demoLogin('customer')}
              className="py-2 px-2 bg-[#181512] hover:bg-[#221e18] border border-[#30281e] hover:border-[#c5a059]/50 text-[11px] text-[#ded3c3] rounded-xs flex items-center justify-center space-x-1 transition-colors"
            >
              <User className="w-3 h-3 text-[#c5a059]" />
              <span>Patron Demo</span>
            </button>

            <button
              type="button"
              onClick={() => demoLogin('admin')}
              className="py-2 px-2 bg-[#181512] hover:bg-[#221e18] border border-[#30281e] hover:border-[#c5a059]/50 text-[11px] text-amber-300 rounded-xs flex items-center justify-center space-x-1 transition-colors"
            >
              <Shield className="w-3 h-3 text-amber-400" />
              <span>Owner Demo</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { Menu, X, Calendar, User, Heart, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const Navbar: React.FC = () => {
  const { 
    user, 
    openReservationModal, 
    openAuthModal, 
    openDashboard, 
    favourites 
  } = useRestaurant();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Our Story', href: '#story' },
    { label: 'Menu', href: '#menu' },
    { label: 'Experience', href: '#experience' },
    { label: 'Celebrations', href: '#celebrations' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0e0d0b]/95 backdrop-blur-md py-3.5 border-b border-[#c5a059]/20 shadow-2xl'
            : 'bg-gradient-to-b from-black/85 via-black/40 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo / Wordmark */}
          <a
            href="#hero"
            className="group flex flex-col items-start focus:outline-none"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
          >
            <span className="font-cinzel text-xl sm:text-2xl tracking-[0.25em] text-[#f4ece1] font-semibold group-hover:text-[#c5a059] transition-colors duration-300">
              ANHAD DAS
            </span>
            <span className="text-[9px] tracking-[0.35em] text-[#c5a059] uppercase font-light">
              Royal Dining & Celebrations
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 xl:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-xs uppercase tracking-[0.2em] text-[#d6cdbf] hover:text-[#c5a059] transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#c5a059] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Actions: Reserve Table & Account/Login */}
          <div className="hidden sm:flex items-center space-x-3 md:space-x-4">
            
            {/* Favourites Quick Pill */}
            {favourites.length > 0 && (
              <button
                onClick={openDashboard}
                title="View Favourites"
                className="p-2 text-[#d6cdbf] hover:text-[#c5a059] transition-colors relative"
              >
                <Heart className="w-4 h-4 fill-[#c5a059]/30 text-[#c5a059]" />
                <span className="absolute -top-1 -right-1 bg-[#c5a059] text-black text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {favourites.length}
                </span>
              </button>
            )}

            {/* Login / Customer Account Button */}
            {user ? (
              <button
                onClick={openDashboard}
                className="flex items-center space-x-2 px-3.5 py-1.5 rounded border border-[#c5a059]/40 bg-[#191714] text-[#ece4d8] hover:border-[#c5a059] transition-all text-xs tracking-wider"
              >
                <User className="w-3.5 h-3.5 text-[#c5a059]" />
                <span className="truncate max-w-[110px] font-medium">{user.name}</span>
                {user.role === 'admin' && (
                  <span className="bg-[#c5a059] text-black text-[9px] px-1 py-0.5 rounded font-bold">
                    Admin
                  </span>
                )}
              </button>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="px-3.5 py-1.5 text-xs tracking-wider text-[#d6cdbf] hover:text-white border border-transparent hover:border-[#443e33] transition-all duration-300"
              >
                Login
              </button>
            )}

            {/* Reserve a Table CTA Button */}
            <button
              onClick={() => openReservationModal('Indoor Dining')}
              className="relative group overflow-hidden px-5 py-2.5 bg-[#c5a059] text-[#0d0c0a] font-medium text-xs tracking-[0.18em] uppercase transition-all duration-300 hover:bg-[#d9b66d] shadow-lg shadow-[#c5a059]/20"
            >
              <span className="relative z-10 flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5 text-black" />
                <span>Reserve a Table</span>
              </span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center space-x-2">
            <button
              onClick={() => openReservationModal('Indoor Dining')}
              className="px-3 py-1.5 bg-[#c5a059] text-[#0d0c0a] text-[10px] font-bold tracking-widest uppercase"
            >
              Reserve
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#ece4d8] hover:text-[#c5a059] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Full-Screen Overlay Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0c0b09]/98 backdrop-blur-xl flex flex-col justify-between p-6 sm:hidden pt-24 animate-in fade-in duration-300">
          <div className="space-y-6">
            <div className="text-center pb-4 border-b border-[#2b261e]">
              <span className="font-cinzel text-2xl tracking-[0.25em] text-[#f4ece1]">
                ANHAD DAS
              </span>
              <p className="text-xs text-[#c5a059] tracking-widest mt-1">
                {RESTAURANT_INFO.tagline}
              </p>
            </div>

            <nav className="flex flex-col space-y-4 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="font-serif text-2xl text-[#ece4d8] hover:text-[#c5a059] py-1 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-3 pt-6 border-t border-[#2b261e]">
            {user ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openDashboard();
                }}
                className="w-full py-3 bg-[#1e1c18] border border-[#c5a059]/40 text-[#ece4d8] text-sm tracking-wider flex items-center justify-center space-x-2"
              >
                <User className="w-4 h-4 text-[#c5a059]" />
                <span>My Account ({user.name})</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('login');
                }}
                className="w-full py-3 bg-[#1e1c18] border border-[#3b352b] text-[#ece4d8] text-sm tracking-wider"
              >
                Guest Sign In / Register
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openReservationModal('Indoor Dining');
              }}
              className="w-full py-3.5 bg-[#c5a059] text-black font-semibold text-xs tracking-[0.2em] uppercase flex items-center justify-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve a Table</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

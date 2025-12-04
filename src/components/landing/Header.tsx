'use client';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

interface HeaderProps {
  scrolled: boolean;
  scrollToSection: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ scrolled, scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScrollAndCloseMenu = (id: string) => {
    scrollToSection(id);
    setIsMenuOpen(false);
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
          <Image src="/logo.svg" alt="MedCoderX Logo" width={32} height={32} />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">
            MedCoderX
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center text-sm font-medium text-slate-600">
          <button onClick={() => scrollToSection('showcase')} className="hover:text-indigo-600 transition-colors">Apps</button>
          <button onClick={() => scrollToSection('about')} className="hover:text-indigo-600 transition-colors">About</button>
          <button onClick={() => scrollToSection('contact')} className="hover:text-indigo-600 transition-colors">Contact</button>
          <button 
            onClick={() => scrollToSection('showcase')}
            className="px-5 py-2.5 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all shadow-lg hover:shadow-indigo-500/20 active:scale-95"
          >
            Get Apps
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-xl py-6 px-6 flex flex-col gap-4 animate-in slide-in-from-top-5">
          <button onClick={() => handleScrollAndCloseMenu('showcase')} className="text-left py-2 font-medium text-slate-600">Apps</button>
          <button onClick={() => handleScrollAndCloseMenu('about')} className="text-left py-2 font-medium text-slate-600">About</button>
          <button onClick={() => handleScrollAndCloseMenu('contact')} className="text-left py-2 font-medium text-slate-600">Contact</button>
        </div>
      )}
    </nav>
  );
};

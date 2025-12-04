'use client';
import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  Mail,
  Code2, 
  Activity, 
} from 'lucide-react';
import { Header } from '@/components/landing/Header';
import { AppCard } from '@/components/landing/AppCard';
import Link from 'next/link';

const Page = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* Abstract Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <Header scrolled={scrolled} scrollToSection={scrollToSection} />

      {/* Hero Section */}
      <section id="hero" className="relative z-10 pt-40 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium mb-8 animate-fade-in-up">
            <Activity size={16} />
            <span>Innovating Digital Health & Rights</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
            Coding. Creating. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-gradient">Improving.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Solo developer building innovative apps for a smarter, safer everyday life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => scrollToSection('showcase')}
              className="px-8 py-4 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center gap-2 group"
            >
              Explore Apps
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="px-8 py-4 bg-white text-slate-600 border border-slate-200 rounded-xl font-medium hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm hover:shadow-md"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Apps Showcase */}
      <section id="showcase" className="relative z-10 py-24 bg-white/50 backdrop-blur-sm border-y border-slate-200/60">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Latest Innovations</h2>
            <p className="text-slate-500">Simple tools designed to solve complex problems.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <AppCard 
              title="SafeAllergy"
              subtitle="Allergens Scanner"
              icon="/safeallergy.svg"
              gradient="from-emerald-500 to-teal-500"
              features={[
                "Scan meals for allergens in seconds",
                "Personalized allergen tracking",
                "History & stats of safe/unsafe foods",
                "Simple, fast, user-friendly interface"
              ]}
              badgeLabel="Get it on Play Store"
            />
            <AppCard 
              title="PhotoRights AI"
              subtitle="Copyright Checker"
              icon="/photorights.svg"
              gradient="from-blue-600 to-indigo-600"
              features={[
                "Instantly check image copyright status",
                "AI-powered suggestions for safe usage",
                "Keep your content legally compliant",
                "Easy, reliable, and intuitive design"
              ]}
              badgeLabel="Get it on Play Store"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-indigo-100 border border-white/50 flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">About MedCoderX</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                Hi! I’m MedCoderX, a solo developer passionate about bridging the gap between complex technology and daily utility. 
              </p>
              <p className="text-slate-600 leading-relaxed">
                My philosophy is simple: <span className="font-semibold text-indigo-600">Coding. Creating. Improving.</span> whether it's ensuring your food is safe to eat or your content is legal to use, I build simple, clean, and useful apps that respect your time and intelligence.
              </p>
            </div>
            <div className="relative w-full md:w-1/3 aspect-square flex items-center justify-center">
               <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl rotate-3"></div>
               <div className="absolute inset-0 bg-white rounded-2xl -rotate-3 border border-slate-100 shadow-sm flex items-center justify-center">
                  <Code2 size={64} className="text-indigo-600 opacity-20" />
               </div>
               <div className="relative z-10 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-slate-900 to-slate-700 rounded-2xl mx-auto flex items-center justify-center text-white text-3xl font-bold shadow-xl mb-4">
                    MC
                  </div>
                  <p className="font-bold text-slate-900">Solo Developer</p>
                  <p className="text-sm text-slate-500">Since 2025</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-24 px-6 bg-slate-50">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Get in Touch</h2>
          <p className="text-slate-500 mb-10">
            Have a question about an app or a suggestion for a new one?
          </p>

          <div className="bg-white p-2 rounded-2xl shadow-lg border border-slate-100 flex items-center justify-between pl-6 hover:shadow-xl transition-shadow duration-300">
             <div className="flex items-center gap-3 overflow-hidden">
                <Mail className="text-indigo-500 flex-shrink-0" size={20} />
                <a href="mailto:info@dreamydesk.co.in" className="text-slate-600 font-medium truncate hover:text-indigo-600 transition-colors">
                  info@dreamydesk.co.in
                </a>
             </div>
             <a 
                href="mailto:info@dreamydesk.co.in"
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors font-medium flex-shrink-0"
             >
               Write Me
             </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-white border-t border-slate-200 pt-16 pb-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              MedCoderX
            </span>
            <p className="text-sm text-slate-400 mt-2">Coding. Creating. Improving.</p>
          </div>
          
          <div className="flex gap-6 text-sm text-slate-500">
            <Link href="#about" onClick={(e) => {e.preventDefault(); scrollToSection('about')}} className="hover:text-indigo-600 transition-colors">About</Link>
            <Link href="#contact" onClick={(e) => {e.preventDefault(); scrollToSection('contact')}} className="hover:text-indigo-600 transition-colors">Contact</Link>
            <Link href="/terms" className="hover:text-indigo-600 transition-colors">Terms of Use</Link>
            <Link href="/privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-slate-100 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} MedCoderX. All rights reserved.
        </div>
      </footer>

    </div>
  );
};

export default Page;

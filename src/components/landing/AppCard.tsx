import { CheckCircle2, Smartphone, ArrowRight } from 'lucide-react';
import React from 'react';
import Image from 'next/image';

interface AppCardProps {
  title: string;
  subtitle: string;
  icon: string;
  gradient: string;
  features: string[];
  badgeLabel: string;
}

export const AppCard: React.FC<AppCardProps> = ({ title, subtitle, icon, gradient, features }) => {
  return (
    <div className="group relative bg-white rounded-3xl p-1 shadow-2xl shadow-slate-200/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-500 hover:-translate-y-2">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
      
      <div className="relative bg-white rounded-[20px] p-8 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500 p-3`}>
            <Image src={icon} alt={`${title} icon`} width={40} height={40} className="w-full h-full" />
          </div>
          <div className="bg-slate-50 px-3 py-1 rounded-full text-xs font-semibold text-slate-500 border border-slate-100 uppercase tracking-wider">
            Available Now
          </div>
        </div>

        {/* Content */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-slate-900 mb-1">{title}</h3>
          <p className="text-indigo-600 font-medium">{subtitle}</p>
        </div>

        {/* Features List */}
        <ul className="space-y-3 mb-8 flex-grow">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3 text-slate-600 text-sm">
              <CheckCircle2 size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button className="w-full bg-slate-900 text-white p-4 rounded-xl flex items-center justify-center gap-3 hover:bg-slate-800 transition-colors group/btn">
          <Smartphone size={20} />
          <div className="text-left leading-tight">
            <div className="text-[10px] uppercase font-semibold text-slate-400">Get it on</div>
            <div className="text-sm font-bold">Google Play</div>
          </div>
          <ArrowRight size={16} className="ml-auto opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
        </button>
      </div>
    </div>
  );
};

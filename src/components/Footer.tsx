import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Scale, Mail, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, resetToDemoData, showToast } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid legal or corporate email.', 'warning');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed to the Lex Global Legal Dispatch.', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-[#0A1D37] text-[#F7F3EB] pt-16 pb-12 border-t border-[#B08D57]/30 mt-20 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full border border-[#B08D57] bg-[#0F2647] flex items-center justify-center font-serif text-[#F7F3EB] font-bold text-base">
                LGA
              </div>
              <div>
                <span className="block font-serif text-xl font-bold text-[#F7F3EB]">
                  Lex Global Advocacy
                </span>
                <span className="block text-[10px] tracking-[0.22em] uppercase text-[#D4B483] font-medium">
                  International Counsel & Academy
                </span>
              </div>
            </div>
            <p className="text-sm text-[#F7F3EB]/70 max-w-sm leading-relaxed mb-6">
              A high-level international legal advocacy institute and academic hub bridging common law, civil law, and supranational dispute regimes with precision and integrity.
            </p>
            <div className="flex items-center gap-3 text-xs text-[#D4B483]">
              <ShieldCheck className="w-4 h-4 text-[#B08D57]" />
              <span>Independent Advocacy & Bar Accredited Practitioners</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4B483] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-[#F7F3EB]/75">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-[#D4B483] transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('courses')} className="hover:text-[#D4B483] transition-colors">
                  Executive Courses
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('blogs')} className="hover:text-[#D4B483] transition-colors">
                  Legal Hub & Articles
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('team')} className="hover:text-[#D4B483] transition-colors">
                  Our Counsel Bench
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('learn')} className="hover:text-[#D4B483] transition-colors">
                  My Learning LMS
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('admin')} className="hover:text-[#D4B483] transition-colors">
                  CMS Administration
                </button>
              </li>
            </ul>
          </div>

          {/* Practice Areas */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4B483] mb-4">
              Core Practice Areas
            </h4>
            <ul className="space-y-2.5 text-sm text-[#F7F3EB]/75">
              <li>
                <button onClick={() => navigateTo('blogs', undefined, { category: 'Arbitration' })} className="hover:text-[#D4B483] transition-colors text-left">
                  International Arbitration
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('blogs', undefined, { category: 'Cross-Border Contracts' })} className="hover:text-[#D4B483] transition-colors text-left">
                  Cross-Border Contracts
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('blogs', undefined, { category: 'Data & Privacy' })} className="hover:text-[#D4B483] transition-colors text-left">
                  GDPR & AI Governance
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('blogs', undefined, { category: 'Consumer Protection' })} className="hover:text-[#D4B483] transition-colors text-left">
                  E-Commerce & Consumers
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('blogs', undefined, { category: 'Legal Writing' })} className="hover:text-[#D4B483] transition-colors text-left">
                  Appellate Advocacy Craft
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4B483] mb-4">
              The Legal Dispatch
            </h4>
            <p className="text-xs text-[#F7F3EB]/70 leading-relaxed mb-3">
              Fortnightly analysis of supranational jurisprudence, treaty updates, and upcoming academic courses.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs">
                <Check className="w-4 h-4" />
                <span>Subscription confirmed. Thank you.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="counsel@chambers.com"
                    required
                    className="w-full pl-3 pr-9 py-2 text-xs rounded-lg bg-[#0F2647] border border-[#B08D57]/30 text-[#F7F3EB] placeholder-[#F7F3EB]/40 focus:outline-none focus:border-[#B08D57]"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 p-1 rounded-md bg-[#B08D57] text-[#0A1D37] hover:bg-[#D4B483] transition-colors"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="block text-[11px] text-[#F7F3EB]/50">
                  Strictly confidential. No spam or marketing third-parties.
                </span>
              </form>
            )}

            <div className="mt-6 pt-4 border-t border-[#F7F3EB]/10 flex items-center justify-between">
              <button
                onClick={resetToDemoData}
                className="text-[11px] text-[#D4B483] hover:underline"
                title="Reset all local changes and reload initial courses, posts & comments"
              >
                Reset Demo Articles & Progress
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 border-t border-[#F7F3EB]/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#F7F3EB]/55">
          <p>
            © {new Date().getFullYear()} Lex Global Advocacy Institute. All rights reserved.
          </p>
          <p className="max-w-xl text-center md:text-right text-[11px]">
            <strong>Statutory Notice:</strong> Content published on Lex Global Advocacy is provided solely for academic study, general knowledge, and comparative analysis. It does not constitute formal individualized legal counsel or establish a client-lawyer relationship.
          </p>
        </div>
      </div>
    </footer>
  );
};

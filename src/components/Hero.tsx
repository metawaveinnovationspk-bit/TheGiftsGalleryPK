import React from 'react';
import { ArrowRight, Gift, Clock, MoonStar, ShieldCheck } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface HeroProps {
  onExplore: () => void;
  onCustomBox: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onCustomBox }) => {
  return (
    <section className="relative overflow-hidden bg-[#14382C] text-[#FBF9F5] pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* Subtle background glow */}
      <div 
        className="absolute top-0 right-1/4 w-96 h-96 bg-[#C59B27]/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-0 left-10 w-80 h-80 bg-[#0D261E]/50 rounded-full blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C4332] border border-[#C59B27]/40 text-xs font-semibold text-[#DFC066]">
                <BrandLogo type="mark" size="sm" />
                <span>The Gifts Gallery · Pakistan</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.12] text-balance text-[#FBF9F5]">
                Gifts for Every Moment. Crafted with Uncompromising Care.
              </h1>
            </div>

            <p className="text-base sm:text-lg text-[#D2DFD8] leading-relaxed max-w-xl font-normal">
              From our signature Watch & Perfume hampers and artisanal chocolate baskets to bespoke personalized keepsakes, we turn genuine heartfelt feelings into extraordinary unboxing memories.
            </p>

            {/* Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExplore}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#14382C] bg-[#DFC066] hover:bg-[#E8CC77] rounded-md transition-all shadow-md hover:shadow-lg whitespace-nowrap cursor-pointer"
              >
                <span>Explore Curated Hampers</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onCustomBox}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-[#FBF9F5] border border-[#DFC066]/40 hover:border-[#DFC066] hover:bg-white/5 rounded-md transition-all whitespace-nowrap cursor-pointer"
              >
                <Gift className="w-4 h-4 text-[#DFC066]" />
                <span>Bespoke Box Studio</span>
              </button>
            </div>

            {/* Quiet trust markers with clean typographic alignment */}
            <div className="pt-8 border-t border-[#1C4332] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-[#BED2C7]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#DFC066] shrink-0" />
                <span>1-2 Days Notice</span>
              </div>
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-[#DFC066] shrink-0" />
                <span>1 PM – 10 PM Slots</span>
              </div>
              <div className="flex items-center gap-2">
                <MoonStar className="w-4 h-4 text-[#DFC066] shrink-0" />
                <span>12 AM Surprises</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#DFC066] shrink-0" />
                <span>Advance Secured</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none group cursor-pointer" onClick={onExplore}>
              {/* Image Frame with luxury golden hairline border & interactive glow */}
              <div className="relative rounded-2xl overflow-hidden border border-[#C59B27]/50 shadow-2xl bg-[#0D261E] group-hover:border-[#DFC066] group-hover:shadow-[0_20px_45px_rgba(223,192,102,0.18)] transition-all duration-500">
                <img
                  src="/public/assets/images/hero.webp"
                  alt="The Gifts Gallery Signature Luxury Gift Box with Watch and Perfume"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/src/assets/images/tgg_hero_luxury_gift_hamper_1790959632270.jpg';
                  }}
                  className="w-full h-auto aspect-4/3 object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Floating caption bar with interactive CTA */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5 text-white">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-[#DFC066] font-semibold mb-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#DFC066] animate-pulse" />
                        <span>Signature Edition</span>
                      </div>
                      <p className="font-display text-lg sm:text-xl font-medium text-white group-hover:text-[#DFC066] transition-colors">
                        Bespoke Emerald & Gold Hamper
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="block text-[10px] text-[#BED2C7]">Curated Set</span>
                      <span className="text-xs sm:text-sm font-mono font-bold text-[#DFC066] tabular-nums">From PKR 8,500</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative accent element */}
              <div className="absolute -bottom-4 -left-4 bg-[#FBF9F5] text-[#14382C] p-3 rounded-xl shadow-xl border border-[#EADBCE] hidden sm:flex items-center gap-3 transform group-hover:scale-105 transition-transform duration-300">
                <div className="w-9 h-9 rounded-full bg-[#14382C] flex items-center justify-center text-[#DFC066] shadow-xs">
                  <Gift className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#14382C]">Handcrafted in Karachi & Lahore</div>
                  <div className="text-[11px] text-[#64746B]">1,500+ unboxing smiles delivered</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

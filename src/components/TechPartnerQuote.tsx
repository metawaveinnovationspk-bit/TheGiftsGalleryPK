import React from 'react';
import { Quote, ExternalLink, Sparkles } from 'lucide-react';

export const TechPartnerQuote: React.FC = () => {
  return (
    <section className="relative bg-[#FAF7F0] border-y border-[#EADBCE] py-10 sm:py-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle background ambient gold glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#C59B27_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-48 bg-[#DFC066]/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto text-center space-y-5">
        {/* Top Emblem Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DFC066]/60 shadow-2xs text-xs font-medium text-[#14382C]">
          <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
          <span className="tracking-wide text-[11px] uppercase font-semibold text-[#8C6D15]">
            Global Technology & Experience Partnership
          </span>
        </div>

        {/* Decorative Quote Mark */}
        <div className="flex justify-center text-[#C59B27]/40">
          <Quote className="w-8 h-8 rotate-180" />
        </div>

        {/* The Quote Statement */}
        <blockquote className="font-display italic text-lg sm:text-xl md:text-2xl text-[#14382C] leading-relaxed tracking-tight px-2 sm:px-6">
          “Every unforgettable gift begins with extraordinary attention to detail. In technology partnership with The Gifts Gallery, we combine artisanal gifting traditions with world-class digital precision—empowering seamless midnight surprises, real-time rider dispatch, and moments of unboxing delight that linger forever.”
        </blockquote>

        {/* Attribution & Official Link */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-xs">
          <span className="text-[#526359] font-medium">
            On behalf of
          </span>
          <a
            href="https://www.metawaveinnovations.com/projects/TheGiftsGallery.pk"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#14382C] text-[#FAF8F5] hover:bg-[#1C4E3D] transition-all shadow-xs"
            title="Visit MetaWave Innovations LTD"
          >
            <span className="font-bold text-[#DFC066]">MetaWave Innovations LTD</span>
            <span className="text-[#BED2C7] text-[11px]">— Global Tech Partners</span>
            <ExternalLink className="w-3 h-3 text-[#DFC066] group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

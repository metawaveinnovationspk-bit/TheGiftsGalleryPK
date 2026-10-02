import React from 'react';
import { BrandLogo } from './BrandLogo';
import { Instagram, MessageCircle, MapPin, Clock, ShieldCheck, ExternalLink, Mail } from 'lucide-react';

interface FooterProps {
  onScrollToPolicies: () => void;
  onScrollToBuilder: () => void;
  onSelectCategory: (category: string) => void;
  onOpenTracker?: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onScrollToPolicies,
  onScrollToBuilder,
  onSelectCategory,
  onOpenTracker,
  onOpenAdmin
}) => {
  return (
    <footer className="bg-[#0A261D] text-[#FAF8F5] pt-16 pb-12 border-t border-[#1C4336]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#1C4336]">
          
          {/* Col 1: Brand & Slogan (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-[#FAF7F0] rounded-lg shadow-xs inline-flex shrink-0">
                <img
                  src="/TGG.png"
                  alt="The Gifts Gallery (TGG)"
                  className="h-12 sm:h-14 w-auto object-contain rounded"
                />
              </div>
              <div className="flex flex-col leading-tight text-white">
                <span className="font-display text-2xl font-bold tracking-tight">
                  The Gifts Gallery
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#DFC066] font-semibold">
                  Gifts for Every Moment.
                </span>
              </div>
            </div>
            <p className="text-xs text-[#BED2C7] leading-relaxed max-w-sm pt-2">
              Bespoke luxury hampers, watch & fragrance gift sets, artisanal snack baskets, and heartfelt personalized surprises across Pakistan.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://www.instagram.com/thegiftsgallery.pk/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#153B2F] hover:bg-[#C5A059] hover:text-[#0A261D] transition-colors flex items-center justify-center text-[#E5CCA0]"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/923000000000?text=Hi%20The%20Gifts%20Gallery!"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#153B2F] hover:bg-[#C5A059] hover:text-[#0A261D] transition-colors flex items-center justify-center text-[#E5CCA0]"
                aria-label="Order on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="mailto:team@metawaveinnovations.com"
                className="w-8 h-8 rounded-full bg-[#153B2F] hover:bg-[#C5A059] hover:text-[#0A261D] transition-colors flex items-center justify-center text-[#E5CCA0]"
                aria-label="Email MetaWave Innovations LTD"
                title="team@metawaveinnovations.com"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Curations (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#DFBA6B]">
              Curated Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#BED2C7]">
              <li>
                <button
                  onClick={() => onSelectCategory('for-him')}
                  className="hover:text-white transition-colors"
                >
                  Luxury Gifts for Him (Watch & Perfume)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('baskets')}
                  className="hover:text-white transition-colors"
                >
                  Snacks & Chocolates Gourmet Baskets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('baskets')}
                  className="hover:text-white transition-colors"
                >
                  Jewelry & Makeup Vanity Boxes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('personalized')}
                  className="hover:text-white transition-colors"
                >
                  Personalized Frames, Mugs & Journals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('accessories')}
                  className="hover:text-white transition-colors"
                >
                  Clover Bracelets & Elegant Accessories
                </button>
              </li>
              <li>
                <button
                  onClick={onScrollToBuilder}
                  className="hover:text-white transition-colors font-medium text-[#DFBA6B]"
                >
                  Build Your Own Custom Box →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Policies (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#DFBA6B]">
              Order Policies
            </h4>
            <ul className="space-y-2 text-xs text-[#BED2C7]">
              <li>
                <button
                  onClick={onScrollToPolicies}
                  className="hover:text-white transition-colors text-left"
                >
                  1-2 Days Prior Notice
                </button>
              </li>
              <li>
                <button
                  onClick={onScrollToPolicies}
                  className="hover:text-white transition-colors text-left"
                >
                  Standard Delivery (1 PM – 10 PM)
                </button>
              </li>
              <li>
                <button
                  onClick={onScrollToPolicies}
                  className="hover:text-white transition-colors text-left"
                >
                  12 AM Midnight Surprises
                </button>
              </li>
              <li>
                <button
                  onClick={onScrollToPolicies}
                  className="hover:text-white transition-colors text-left"
                >
                  Advance Payment Policy
                </button>
              </li>
              <li>
                <button
                  onClick={onScrollToPolicies}
                  className="hover:text-white transition-colors text-left"
                >
                  New Customer Discounts
                </button>
              </li>
              {onOpenTracker && (
                <li>
                  <button
                    onClick={onOpenTracker}
                    className="hover:text-white transition-colors text-left text-[#DFBA6B] font-medium"
                  >
                    Track Your Delivery →
                  </button>
                </li>
              )}
              {onOpenAdmin && (
                <li className="pt-2">
                  <button
                    onClick={onOpenAdmin}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#14382C] hover:bg-[#1C4E3D] text-[#DFC066] border border-[#DFC066]/50 text-xs font-bold transition-all shadow-xs cursor-pointer group"
                    title="Studio Operations (Admin / Owner / Manager Portal)"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#DFC066] group-hover:scale-110 transition-transform" />
                    <span>Studio Portal</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 4: Studio Contact & Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-3 text-xs text-[#BED2C7]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#DFBA6B]">
              Studio & Dispatch
            </h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#DFBA6B] shrink-0 mt-0.5" />
                <span>Karachi, Lahore & Islamabad Dedicated Hand-Delivery. Express Courier Nationwide.</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#DFBA6B] shrink-0 mt-0.5" />
                <span>Response Time: 3-4 Hours (Active Handcrafting Studio)</span>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#DFBA6B] shrink-0 mt-0.5" />
                <span>Bank Transfer · JazzCash · EasyPaisa</span>
              </div>
              <div className="flex items-start gap-2 pt-1 border-t border-[#1C4336]">
                <Mail className="w-4 h-4 text-[#DFBA6B] shrink-0 mt-0.5" />
                <a
                  href="mailto:team@metawaveinnovations.com"
                  className="hover:text-white transition-colors hover:underline text-[#BED2C7]"
                  title="Direct Support & Inquiries"
                >
                  team@metawaveinnovations.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Management Partner Credit */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#BED2C7] gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p>© {new Date().getFullYear()} The Gifts Gallery (TGG). All rights reserved.</p>
            <span className="hidden sm:inline text-[#1C4E3D]">·</span>
            <div className="flex items-center gap-2 text-[11px] text-[#8BA496]">
              <span>Gifts</span>
              <span>·</span>
              <span>Surprises</span>
              <span>·</span>
              <span>Memories</span>
            </div>
            {onOpenAdmin && (
              <>
                <span className="hidden sm:inline text-[#1C4E3D]">·</span>
                <button
                  onClick={onOpenAdmin}
                  className="inline-flex items-center gap-1 text-[11px] text-[#DFC066] hover:text-white transition-colors cursor-pointer"
                  title="Studio Operations Portal"
                >
                  <ShieldCheck className="w-3 h-3 text-[#DFC066]" />
                  <span>Studio Portal</span>
                </button>
              </>
            )}
          </div>

          {/* Managed by MetaWave Innovations LTD - Global Tech Partners */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs bg-[#14382C] px-3.5 py-1.5 rounded-lg border border-[#1C4E3D] shadow-xs">
            <span className="text-[#BED2C7]">Managed by</span>
            <a
              href="https://www.metawaveinnovations.com/projects/TheGiftsGallery.pk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-[#DFC066] hover:text-white transition-colors underline decoration-[#DFC066]/40 underline-offset-2 hover:decoration-white"
              title="MetaWave Innovations LTD - Global Tech Partners"
            >
              <span>MetaWave Innovations LTD</span>
              <span className="text-[#BED2C7] font-normal text-[11px]">- Global Tech Partners</span>
              <ExternalLink className="w-3 h-3 text-[#DFC066]" />
            </a>
            <span className="text-[#1C4E3D] hidden xs:inline">|</span>
            <a
              href="mailto:team@metawaveinnovations.com"
              className="inline-flex items-center gap-1.5 text-[#E5CCA0] hover:text-white transition-colors hover:underline"
              title="Email team@metawaveinnovations.com"
              aria-label="Email team@metawaveinnovations.com"
            >
              <Mail className="w-3.5 h-3.5 text-[#DFC066]" />
              <span className="text-[11px] font-mono">team@metawaveinnovations.com</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

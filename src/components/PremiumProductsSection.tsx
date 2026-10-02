import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { 
  ShoppingBag, 
  User, 
  Sparkles, 
  Gem, 
  Package, 
  Send, 
  ShieldCheck, 
  Gift, 
  Heart,
  ArrowRight,
  Check
} from 'lucide-react';
import { Category } from '../types';

interface PremiumProductsSectionProps {
  onSelectCategory: (category: Category) => void;
  onOpenBuilder: () => void;
  onOpenPackagingModal?: () => void;
}

interface ProductPostCard {
  id: string;
  category: Category;
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  tag: string;
  badge: string;
  priceNote: string;
  itemsPreview: string[];
  rating: string;
}

export const PremiumProductsSection: React.FC<PremiumProductsSectionProps> = ({
  onSelectCategory,
  onOpenBuilder,
  onOpenPackagingModal
}) => {
  const [selectedPackaging, setSelectedPackaging] = useState<string>('rigid-box');
  const [packagingAdded, setPackagingAdded] = useState(false);
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [activeTagNotice, setActiveTagNotice] = useState<string | null>(null);

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // The 4 Post Cards matching the design of the post image with rich interactive metadata
  const POST_CARDS: ProductPostCard[] = [
    {
      id: 'post-baskets',
      category: 'baskets',
      title: 'Customized Gift Baskets',
      description: 'Thoughtfully curated baskets with your choice of items — perfect for birthdays, anniversaries & corporate celebrations.',
      image: '/src/assets/images/tgg_snack_chocolate_wicker_basket_1790959662671.jpg',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <path d="M4 10h16l-2 10H6L4 10z" />
          <path d="M8 10V6a4 4 0 018 0v4" />
          <line x1="4" y1="10" x2="20" y2="10" />
        </svg>
      ),
      tag: 'A Little Happiness for You',
      badge: 'Best-Selling Hamper',
      priceNote: 'From PKR 1,800',
      itemsPreview: ['Gourmet Snacks', 'Ferrero Rocher', 'Handwoven Wicker'],
      rating: '4.9 ★ (380+ orders)'
    },
    {
      id: 'post-personalized',
      category: 'personalized',
      title: 'Personalized Keepsakes',
      description: 'Make it truly yours! Photo frames, thermal cups, calligraphy mugs, and engraved acrylic plaques customized with style.',
      image: '/src/assets/images/tgg_personalized_mug_tumbler_frame_1790959695246.jpg',
      icon: <User className="w-5 h-5" />,
      tag: 'Together Forever',
      badge: 'Bespoke Customization',
      priceNote: 'From PKR 1,600',
      itemsPreview: ['Laser Engraved Names', 'Framed Memories', 'Gold Leaf Accents'],
      rating: '4.9 ★ (420+ reviews)'
    },
    {
      id: 'post-special',
      category: 'for-him',
      title: 'Luxury Watch & Fragrance',
      description: 'Premium Curren watches, french perfumes, and exclusive velvet gift boxes handcrafted for milestone celebrations.',
      image: '/src/assets/images/tgg_watch_perfume_luxury_box_1790959645361.jpg',
      icon: <Gem className="w-5 h-5" />,
      tag: 'Timeless Elegance',
      badge: 'Signature Edition',
      priceNote: 'From PKR 4,800',
      itemsPreview: ['Curren Quartz Watch', 'French Eau de Parfum', 'Emerald Bow Box'],
      rating: '5.0 ★ (650+ reviews)'
    },
    {
      id: 'post-accessories',
      category: 'accessories',
      title: 'Clover Jewelry & Accents',
      description: 'Iconic four-leaf clover bracelets, stainless steel jewelry, and dainty vanity keepsakes with protective velvet pouches.',
      image: '/src/assets/images/tgg_jewelry_makeup_round_box_1790959683065.jpg',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="4" r="1.5" fill="currentColor" />
          <circle cx="20" cy="12" r="1.5" fill="currentColor" />
          <circle cx="12" cy="20" r="1.5" fill="currentColor" />
          <circle cx="4" cy="12" r="1.5" fill="currentColor" />
        </svg>
      ),
      tag: 'Little Details Big Smiles',
      badge: 'Trending Collection',
      priceNote: 'From PKR 1,900',
      itemsPreview: ['Four-Leaf Clover', 'Anti-Tarnish Gold', 'Signature Velvet Case'],
      rating: '4.8 ★ (290+ reviews)'
    }
  ];

  const handlePackagingSelect = (pkg: string) => {
    setSelectedPackaging(pkg);
    setPackagingAdded(true);
    setTimeout(() => setPackagingAdded(false), 2000);
  };

  return (
    <section className="py-20 bg-[#FBF9F5] border-b border-[#EADBCE] relative overflow-hidden">
      {/* Decorative leaf / botanical subtle shadows */}
      <div 
        className="absolute top-0 right-0 w-80 h-80 bg-[#C59B27]/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-[#14382C]/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ================= SECTION HEADER (Matching Post Image & Interactivity) ================= */}
        <div className="relative text-center max-w-3xl mx-auto mb-16 space-y-4">
          
          {/* Top Left Floating Gift Tag (Interactive with tooltip & gentle tilt) */}
          <div 
            onClick={() => {
              setActiveTagNotice('Every gift comes adorned with wax-sealed ribbon and personalized calligraphy notes.');
              setTimeout(() => setActiveTagNotice(null), 3500);
            }}
            className="hidden md:flex absolute -left-12 -top-6 flex-col items-center rotate-[-12deg] hover:rotate-[-6deg] hover:scale-105 transition-all duration-300 cursor-pointer select-none group"
            title="Click to learn about our signature handwritten tags"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#C59B27] mb-1 ring-2 ring-[#C59B27]/30" />
            <div className="bg-[#FAF7F0] border border-[#DFC066] p-2.5 rounded-lg shadow-sm text-center group-hover:shadow-md transition-shadow">
              <span className="font-display italic text-xs text-[#14382C] block font-medium">Small Gifts</span>
              <span className="font-display italic text-xs text-[#C59B27] block font-medium">Big Feelings</span>
              <span className="text-[10px] text-[#C59B27] group-hover:scale-125 inline-block transition-transform">♡</span>
            </div>
            {activeTagNotice && (
              <div className="absolute top-16 left-0 w-52 p-2 bg-[#14382C] text-[#FAF8F5] text-[10px] rounded-md shadow-lg z-30 leading-snug">
                {activeTagNotice}
              </div>
            )}
          </div>

          {/* Top Right Script Accent (Interactive heart and subtle tilt) */}
          <div 
            onClick={() => onSelectCategory('all')}
            className="hidden md:block absolute -right-16 top-0 rotate-[8deg] hover:rotate-[4deg] hover:scale-105 transition-all duration-300 cursor-pointer select-none text-right group"
            title="Click to browse all handcrafted moments"
          >
            <p className="font-display italic text-sm sm:text-base text-[#14382C] group-hover:text-[#C59B27] font-semibold leading-tight transition-colors">
              Thoughtful Gifts<br />
              for Every<br />
              Special Moment
            </p>
            <span className="text-xs text-[#C59B27] inline-block group-hover:scale-125 transition-transform">♡</span>
          </div>

          {/* Official TGG Circular Seal with Subtle Ambient Glow Halo */}
          <div className="flex justify-center mb-3">
            <div 
              onClick={() => onSelectCategory('all')}
              className="relative p-1 rounded-full cursor-pointer group"
              title="The Gifts Gallery · Master Studio Signature Seal"
            >
              <div className="absolute inset-0 rounded-full bg-[#DFC066]/20 blur-md group-hover:blur-lg transition-all" />
              <div className="relative transform group-hover:scale-105 transition-transform duration-300">
                <BrandLogo type="seal" size="lg" />
              </div>
            </div>
          </div>

          {/* Kicker & Main Title matching post text */}
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FAF7F0] border border-[#DFC066]/50 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#C59B27] mb-1 shadow-2xs">
              <Sparkles className="w-3 h-3 text-[#C59B27]" />
              <span>EXPLORE OUR CURATED COLLECTIONS</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#14382C] tracking-tight">
              Premium Products
            </h2>
          </div>

          {/* Slogan flanked by interactive badge pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-medium tracking-wide text-[#526359] pt-2">
            <span className="px-2.5 py-1 rounded-full bg-white border border-[#EADBCE] text-[11px] font-semibold text-[#14382C] shadow-2xs">
              ✦ 100% Handcrafted In Studio
            </span>
            <span className="px-2.5 py-1 rounded-full bg-white border border-[#EADBCE] text-[11px] font-semibold text-[#14382C] shadow-2xs">
              ✦ 12 AM Midnight Surprises
            </span>
            <span className="px-2.5 py-1 rounded-full bg-white border border-[#EADBCE] text-[11px] font-semibold text-[#14382C] shadow-2xs">
              ✦ Nationwide Secured Dispatch
            </span>
          </div>
        </div>

        {/* ================= 4 POST CARDS (Matching Post Image Layout with Interactive Depth) ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {POST_CARDS.map((card) => (
            <div
              key={card.id}
              onClick={() => onSelectCategory(card.category)}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative bg-[#FDFBF7] rounded-2xl border border-[#EADBCE] hover:border-[#C59B27] overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-400 hover:-translate-y-2 flex flex-col justify-between cursor-pointer ring-1 ring-transparent hover:ring-[#C59B27]/30"
            >
              {/* Card Image Area with Rounded Corners & Interactive Overlays */}
              <div className="relative aspect-4/3 w-full bg-[#F4EFE6] overflow-hidden p-2.5">
                <div className="w-full h-full rounded-xl overflow-hidden relative">
                  <img
                    src={card.image}
                    alt={card.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle Gradient Scrim on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#14382C]/90 text-white text-xs font-semibold tracking-wide backdrop-blur-xs shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <span>Explore Collection</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#DFC066]" />
                    </span>
                  </div>

                  {/* Top-Left Bestseller / Signature Badge */}
                  <div className="absolute top-2 left-2 z-10 bg-[#14382C] text-[#DFC066] text-[9.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-[#DFC066]" />
                    <span>{card.badge}</span>
                  </div>

                  {/* Top-Right Heart Wishlist Toggle */}
                  <button
                    type="button"
                    onClick={(e) => toggleWishlist(card.id, e)}
                    className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/85 hover:bg-white text-[#14382C] shadow-sm hover:scale-110 active:scale-95 transition-all cursor-pointer backdrop-blur-xs"
                    aria-label={`Save ${card.title} to favorites`}
                    title="Add to wishlist"
                  >
                    <Heart 
                      className={`w-3.5 h-3.5 ${
                        wishlist[card.id] 
                          ? 'fill-[#C59B27] text-[#C59B27]' 
                          : 'text-[#14382C] hover:text-[#C59B27]'
                      } transition-colors`} 
                    />
                  </button>

                  {/* Corner Script Tag (from post img) */}
                  <div className="absolute bottom-2 right-2 bg-[#14382C]/85 backdrop-blur-xs text-[#E5CCA0] text-[9.5px] px-2 py-0.5 rounded font-display italic shadow-xs">
                    {card.tag}
                  </div>
                </div>

                {/* Circular Badge Icon overlapping the bottom edge with active metallic sheen */}
                <div className="absolute -bottom-4.5 left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-[#14382C] border-2 border-[#C59B27] text-white flex items-center justify-center shadow-md z-10 group-hover:scale-115 group-hover:bg-[#1C4E3D] transition-all duration-300">
                  {card.icon}
                </div>
              </div>

              {/* Card Text Content with creative brand typography & item preview tags */}
              <div className="p-5 pt-7 text-center flex flex-col flex-1 justify-between space-y-3">
                <div className="space-y-2">
                  <div className="text-[10.5px] font-medium text-[#C59B27] flex items-center justify-center gap-1">
                    <span>{card.rating}</span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-[#14382C] group-hover:text-[#C59B27] transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs text-[#526359] leading-relaxed line-clamp-2">
                    {card.description}
                  </p>

                  {/* Interactive Micro-Tags Preview */}
                  <div className="flex flex-wrap items-center justify-center gap-1 pt-1">
                    {card.itemsPreview.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-[9.5px] px-2 py-0.5 rounded-full bg-[#FAF7F0] border border-[#EADBCE] text-[#405349]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Action with bold pricing & hover CTA */}
                <div className="pt-3 border-t border-[#F0EBE1] flex items-center justify-between text-xs">
                  <div className="text-left">
                    <span className="block text-[9px] uppercase tracking-wider text-[#8E9B93] font-semibold">Starting</span>
                    <span className="font-mono text-xs font-bold text-[#14382C] tabular-nums">
                      {card.priceNote}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold text-xs text-[#14382C] bg-[#FAF7F0] border border-[#DFC066]/50 group-hover:bg-[#14382C] group-hover:text-[#DFC066] transition-all duration-300 shadow-2xs">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ================= CUSTOMIZED PACKAGING & BOXES BANNER (From Post Image) ================= */}
        <div className="rounded-2xl bg-white border border-[#EADBCE] shadow-sm p-6 sm:p-8 mb-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Icon & Headline */}
            <div className="lg:col-span-7 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-[#14382C] border-2 border-[#C59B27] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Package className="w-7 h-7 text-[#DFC066]" />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <h3 className="font-display text-2xl font-bold text-[#14382C]">
                    Customized Packaging & Boxes
                  </h3>
                  <span className="h-px flex-1 max-w-[80px] bg-[#C59B27]/40 hidden sm:block" />
                </div>
                <p className="text-xs sm:text-sm text-[#526359] leading-relaxed max-w-xl">
                  Elegant packaging options and premium boxes available at a separate cost, customized as per your needs. Hand-tied emerald satin bows, gold foil lettering, and luxury keepsakes.
                </p>
              </div>
            </div>

            {/* Right Column: Packaging Options Selector */}
            <div className="lg:col-span-5 flex flex-wrap sm:flex-nowrap items-center gap-3">
              <button
                type="button"
                onClick={() => handlePackagingSelect('rigid-box')}
                className={`flex-1 p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                  selectedPackaging === 'rigid-box'
                    ? 'border-[#14382C] bg-[#FAF8F5] ring-1 ring-[#14382C]'
                    : 'border-[#EADBCE] bg-white text-[#526359]'
                }`}
              >
                <div className="font-semibold text-[#14382C]">Emerald Rigid Box</div>
                <div className="text-[10px] text-[#C59B27] font-mono tabular-nums">+PKR 1,500</div>
              </button>

              <button
                type="button"
                onClick={() => handlePackagingSelect('gold-bag')}
                className={`flex-1 p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                  selectedPackaging === 'gold-bag'
                    ? 'border-[#14382C] bg-[#FAF8F5] ring-1 ring-[#14382C]'
                    : 'border-[#EADBCE] bg-white text-[#526359]'
                }`}
              >
                <div className="font-semibold text-[#14382C]">Gold Gift Bag</div>
                <div className="text-[10px] text-[#C59B27] font-mono tabular-nums">+PKR 450</div>
              </button>

              <button
                type="button"
                onClick={onOpenBuilder}
                className="px-4 py-2.5 text-xs font-semibold text-white bg-[#14382C] hover:bg-[#1C4E3D] rounded-lg transition-colors whitespace-nowrap shadow-xs cursor-pointer"
              >
                {packagingAdded ? 'Selected ✓' : 'Add to Box'}
              </button>
            </div>

          </div>
        </div>

        {/* ================= BOTTOM CTA: DM US NOW & 3 TRUST BADGES ================= */}
        <div className="text-center space-y-6 pt-4">
          {/* DM US NOW Button (Exact button style from the post image!) */}
          <div className="inline-block">
            <a
              href="https://wa.me/923000000000?text=Hello%20The%20Gifts%20Gallery!%20I%20saw%20your%20Premium%20Products%20showcase%20and%20would%20like%20to%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#14382C] hover:bg-[#1B4B3B] text-white rounded-full font-sans font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Send className="w-4 h-4 text-[#DFC066]" />
              <span>DM US NOW</span>
            </a>
          </div>

          {/* Script handle matching post */}
          <div>
            <p className="font-display italic text-lg sm:text-xl text-[#14382C] font-semibold">
              The Gifts Gallery . Pk ♡
            </p>
          </div>

          {/* 3 Trust Markers directly from the post image */}
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 pt-2 text-xs text-[#14382C] font-semibold">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#14382C] text-[#DFC066] flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span>Premium Quality</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#14382C] text-[#DFC066] flex items-center justify-center">
                <Gift className="w-4 h-4" />
              </div>
              <span>Beautiful Packaging</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#14382C] text-[#DFC066] flex items-center justify-center">
                <Heart className="w-4 h-4" />
              </div>
              <span>Perfect for Every Occasion</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

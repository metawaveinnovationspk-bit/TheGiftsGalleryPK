import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Sparkles, 
  MessageCircle, 
  Menu, 
  X, 
  User, 
  Truck, 
  Gift, 
  Home, 
  ShieldCheck, 
  ChevronRight 
} from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  cartCount: number;
  currentUser: UserProfile | null;
  onOpenCart: () => void;
  onOpenQuiz: () => void;
  onOpenTracker: () => void;
  onOpenProfile: () => void;
  onSelectCategory: (category: string) => void;
  onScrollToPolicies: () => void;
  onScrollToBuilder: () => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  currentUser,
  onOpenCart,
  onOpenQuiz,
  onOpenTracker,
  onOpenProfile,
  onSelectCategory,
  onScrollToPolicies,
  onScrollToBuilder,
  onOpenAdmin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (action: () => void) => {
    action();
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E1D5] transition-all">
        {/* Top Banner Notice - Responsive typography and padding */}
        <div className="bg-[#14382C] text-[#E5CCA0] px-3 sm:px-4 py-1.5 text-center text-[10px] sm:text-xs tracking-wide border-b border-[#1C4E3D]">
          <span className="font-semibold text-white">Notice:</span> 1-2 Days Advance Booking Required · 12 AM Midnight Surprises · Use Code <strong className="text-white tracking-widest font-mono">NEWTGG</strong> for 10% Off
        </div>

        {/* Selected Element: Main Top Bar - Responsive layout for Mobile, Tablet & Large Screens */}
        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 h-16 sm:h-18 lg:h-20 flex items-center justify-between gap-2 sm:gap-4 transition-all">
          
          {/* Zone 1: Brand title with exact original TGG logo image */}
          <a 
            href="/" 
            className="flex items-center gap-2 sm:gap-3 hover:opacity-95 transition-opacity shrink-0 py-1"
            aria-label="The Gifts Gallery Home"
          >
            <img
              src="/TGG.png"
              alt="The Gifts Gallery (TGG)"
              className="h-8 xs:h-9 sm:h-11 lg:h-12 w-auto object-contain rounded drop-shadow-xs"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-display text-lg xs:text-xl sm:text-2xl lg:text-[26px] font-bold tracking-tight text-[#14382C]">
                The Gifts Gallery
              </span>
              <span className="hidden xs:block text-[8px] sm:text-[9.5px] lg:text-[10px] font-sans tracking-[0.18em] sm:tracking-[0.22em] uppercase font-semibold text-[#C59B27]">
                Gifts for Every Moment.
              </span>
            </div>
          </a>

          {/* Zone 2: 4-6 text navigation links (Hidden on Mobile/Tablet portrait, beautifully spacious on Laptop/Desktop) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-8 text-sm xl:text-[15px] font-medium text-[#405349]">
            <button
              onClick={() => onSelectCategory('all')}
              className="hover:text-[#14382C] transition-colors hover:underline underline-offset-8 decoration-[#C59B27] decoration-2 cursor-pointer"
            >
              Collections
            </button>
            <button
              onClick={onScrollToBuilder}
              className="hover:text-[#14382C] transition-colors hover:underline underline-offset-8 decoration-[#C59B27] decoration-2 cursor-pointer"
            >
              Build a Box
            </button>
            <button
              onClick={onOpenTracker}
              className="hover:text-[#14382C] transition-colors hover:underline underline-offset-8 decoration-[#C59B27] decoration-2 cursor-pointer"
            >
              Track Order
            </button>
            <button
              onClick={onScrollToPolicies}
              className="hover:text-[#14382C] transition-colors hover:underline underline-offset-8 decoration-[#C59B27] decoration-2 cursor-pointer"
            >
              Customer Policies
            </button>
          </nav>

          {/* Zone 3: Primary responsive actions (Tailored for Mobile tap targets & Desktop elegance) */}
          <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 shrink-0">
            
            {/* Account Profile Action */}
            <button
              onClick={onOpenProfile}
              className="inline-flex items-center gap-1.5 p-2 sm:px-2.5 sm:py-1.5 text-xs font-medium text-[#14382C] hover:bg-[#F0EBE1] rounded-lg transition-colors cursor-pointer"
              title={currentUser ? `Logged in as ${currentUser.username}` : 'Sign In / Account'}
              aria-label="User Account"
            >
              <div className="w-6 h-6 sm:w-5 sm:h-5 rounded-full bg-[#14382C]/10 flex items-center justify-center text-[#14382C]">
                <User className="w-3.5 h-3.5" />
              </div>
              <span className="hidden md:inline font-semibold">
                {currentUser ? currentUser.username.split(' ')[0] : 'Sign In'}
              </span>
            </button>

            {/* Gift Concierge Quiz - desktop and tablet landscape */}
            <button
              onClick={onOpenQuiz}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#14382C] bg-[#F0EBE1] hover:bg-[#E8E1D5] rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-2xs"
              title="Interactive Gift Finder Quiz"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Gift Concierge</span>
            </button>

            {/* Shopping Bag Button with Live Item Badge */}
            <button
              onClick={onOpenCart}
              aria-label="View Shopping Bag"
              className="relative p-2 text-[#14382C] hover:bg-[#F0EBE1] rounded-lg transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
              {cartCount > 0 && (
                <span className="absolute 0 top-0.5 right-0.5 flex items-center justify-center min-w-4.5 h-4.5 px-1 text-[10px] font-bold text-white bg-[#C59B27] rounded-full tabular-nums shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Direct WhatsApp CTA Button */}
            <a
              href="https://wa.me/923000000000?text=Hi%20The%20Gifts%20Gallery,%20I%20would%20like%20to%20inquire%20about%20ordering%20a%20luxury%20gift%20box!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 xs:px-3 sm:px-3.5 py-1.5 sm:py-2 text-xs font-semibold text-white bg-[#14382C] hover:bg-[#1C4E3D] rounded-lg shadow-xs transition-all whitespace-nowrap cursor-pointer hover:shadow-md"
              aria-label="WhatsApp Us"
            >
              <MessageCircle className="w-4 h-4 text-[#DFC066]" />
              <span className="hidden sm:inline">WhatsApp Us</span>
              <span className="sm:hidden text-[11px]">Chat</span>
            </a>

            {/* Mobile & Tablet Drawer Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#14382C] hover:bg-[#F0EBE1] rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Slide-Down App Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E8E1D5] bg-[#FAF8F5]/98 backdrop-blur-lg px-4 py-5 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
            {/* Quick App Shortcuts Grid */}
            <div className="grid grid-cols-2 gap-2 pb-2">
              <button
                onClick={() => handleNavClick(onScrollToBuilder)}
                className="flex items-center gap-2 p-3 rounded-xl bg-white border border-[#E8E1D5] shadow-xs text-left cursor-pointer hover:border-[#14382C]"
              >
                <div className="w-8 h-8 rounded-lg bg-[#14382C]/10 text-[#14382C] flex items-center justify-center shrink-0">
                  <Gift className="w-4 h-4 text-[#C59B27]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#14382C]">Build Box</div>
                  <div className="text-[10px] text-[#526359]">Custom Studio</div>
                </div>
              </button>

              <button
                onClick={() => handleNavClick(onOpenTracker)}
                className="flex items-center gap-2 p-3 rounded-xl bg-white border border-[#E8E1D5] shadow-xs text-left cursor-pointer hover:border-[#14382C]"
              >
                <div className="w-8 h-8 rounded-lg bg-[#14382C]/10 text-[#14382C] flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4 text-[#C59B27]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#14382C]">Track Order</div>
                  <div className="text-[10px] text-[#526359]">Live Dispatch</div>
                </div>
              </button>
            </div>

            {/* Navigation Links */}
            <div className="space-y-1 pt-1">
              <button
                onClick={() => handleNavClick(() => onSelectCategory('all'))}
                className="flex items-center justify-between w-full text-left text-sm font-semibold text-[#14382C] py-2 px-2 rounded-lg hover:bg-white transition-colors"
              >
                <span>All Collections</span>
                <ChevronRight className="w-4 h-4 text-[#8E9B93]" />
              </button>
              <button
                onClick={() => handleNavClick(() => onSelectCategory('for-him'))}
                className="flex items-center justify-between w-full text-left text-sm font-semibold text-[#14382C] py-2 px-2 rounded-lg hover:bg-white transition-colors"
              >
                <span>Luxury Gifts for Him</span>
                <ChevronRight className="w-4 h-4 text-[#8E9B93]" />
              </button>
              <button
                onClick={() => handleNavClick(() => onSelectCategory('baskets'))}
                className="flex items-center justify-between w-full text-left text-sm font-semibold text-[#14382C] py-2 px-2 rounded-lg hover:bg-white transition-colors"
              >
                <span>Gourmet Baskets & Vanity</span>
                <ChevronRight className="w-4 h-4 text-[#8E9B93]" />
              </button>
              <button
                onClick={() => handleNavClick(() => onSelectCategory('personalized'))}
                className="flex items-center justify-between w-full text-left text-sm font-semibold text-[#14382C] py-2 px-2 rounded-lg hover:bg-white transition-colors"
              >
                <span>Personalized Keepsakes</span>
                <ChevronRight className="w-4 h-4 text-[#8E9B93]" />
              </button>
              <button
                onClick={() => handleNavClick(() => onSelectCategory('accessories'))}
                className="flex items-center justify-between w-full text-left text-sm font-semibold text-[#14382C] py-2 px-2 rounded-lg hover:bg-white transition-colors"
              >
                <span>Clover Bracelets & Jewelry</span>
                <ChevronRight className="w-4 h-4 text-[#8E9B93]" />
              </button>
              <button
                onClick={() => handleNavClick(onScrollToPolicies)}
                className="flex items-center justify-between w-full text-left text-sm font-semibold text-[#14382C] py-2 px-2 rounded-lg hover:bg-white transition-colors"
              >
                <span>Customer & Delivery Policies</span>
                <ChevronRight className="w-4 h-4 text-[#8E9B93]" />
              </button>
            </div>

            {/* Profile & Concierge Bottom Row */}
            <div className="pt-3 border-t border-[#E8E1D5] flex items-center justify-between gap-3">
              <button
                onClick={() => handleNavClick(onOpenProfile)}
                className="flex items-center gap-2 py-2 px-3 rounded-lg bg-white border border-[#E8E1D5] text-xs font-semibold text-[#14382C] flex-1 justify-center shadow-2xs"
              >
                <User className="w-3.5 h-3.5 text-[#C59B27]" />
                <span>{currentUser ? currentUser.username : 'Account / Sign In'}</span>
              </button>

              <button
                onClick={() => handleNavClick(onOpenQuiz)}
                className="flex items-center gap-1.5 py-2 px-3 rounded-lg bg-[#14382C] text-xs font-semibold text-[#DFC066] flex-1 justify-center shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#DFC066]" />
                <span>Gift Finder</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Native Mobile App-Like Bottom Navigation Dock (Visible on Mobile & Tablet Portrait, Hidden on Desktop) */}
      <nav 
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF8F5]/98 backdrop-blur-md border-t border-[#E8E1D5] px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] flex items-center justify-around"
        aria-label="Mobile Bottom App Navigation"
      >
        <button
          onClick={() => onSelectCategory('all')}
          className="flex flex-col items-center justify-center py-1 px-2 text-[#405349] hover:text-[#14382C] active:scale-95 transition-all cursor-pointer"
        >
          <Home className="w-5 h-5 text-[#14382C]" />
          <span className="text-[10px] font-semibold mt-0.5">Explore</span>
        </button>

        <button
          onClick={onScrollToBuilder}
          className="flex flex-col items-center justify-center py-1 px-2 text-[#405349] hover:text-[#14382C] active:scale-95 transition-all cursor-pointer"
        >
          <Gift className="w-5 h-5 text-[#C59B27]" />
          <span className="text-[10px] font-semibold mt-0.5">Build Box</span>
        </button>

        <button
          onClick={onOpenTracker}
          className="flex flex-col items-center justify-center py-1 px-2 text-[#405349] hover:text-[#14382C] active:scale-95 transition-all cursor-pointer"
        >
          <Truck className="w-5 h-5 text-[#14382C]" />
          <span className="text-[10px] font-semibold mt-0.5">Track</span>
        </button>

        <button
          onClick={onOpenCart}
          className="relative flex flex-col items-center justify-center py-1 px-2 text-[#405349] hover:text-[#14382C] active:scale-95 transition-all cursor-pointer"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-[#14382C]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 flex items-center justify-center min-w-4 h-4 px-1 text-[9px] font-bold text-white bg-[#C59B27] rounded-full tabular-nums shadow-xs">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold mt-0.5">Bag</span>
        </button>

        <button
          onClick={onOpenProfile}
          className="flex flex-col items-center justify-center py-1 px-2 text-[#405349] hover:text-[#14382C] active:scale-95 transition-all cursor-pointer"
        >
          <User className="w-5 h-5 text-[#14382C]" />
          <span className="text-[10px] font-semibold mt-0.5">
            {currentUser ? 'Profile' : 'Sign In'}
          </span>
        </button>
      </nav>
    </>
  );
};

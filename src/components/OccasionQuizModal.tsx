import React, { useState } from 'react';
import { Product, ProductVariant } from '../types';
import { PRODUCTS } from '../data/products';
import { X, Sparkles, ArrowRight, Check } from 'lucide-react';

interface OccasionQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product, variant: ProductVariant) => void;
}

export const OccasionQuizModal: React.FC<OccasionQuizModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<number>(1);
  const [recipient, setRecipient] = useState<string>('him');
  const [occasion, setOccasion] = useState<string>('birthday');
  const [budget, setBudget] = useState<string>('medium');

  const getRecommendedProducts = (): Product[] => {
    if (recipient === 'him') {
      if (budget === 'high') {
        return PRODUCTS.filter((p) => p.id === 'tgg-watch-perfume' || p.id === 'tgg-wallet-chain');
      }
      return PRODUCTS.filter((p) => p.id === 'tgg-wallet-chain' || p.id === 'tgg-snacks-chocolate-basket');
    } else if (recipient === 'her') {
      if (budget === 'high') {
        return PRODUCTS.filter((p) => p.id === 'tgg-jewelry-makeup-basket' || p.id === 'tgg-personalized-suite');
      }
      return PRODUCTS.filter((p) => p.id === 'tgg-jewelry-makeup-basket' || p.id === 'tgg-accessories-suite');
    } else {
      // Couple or General
      return PRODUCTS.filter((p) => p.id === 'tgg-personalized-suite' || p.id === 'tgg-snacks-chocolate-basket');
    }
  };

  const recommendations = getRecommendedProducts();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl border border-[#E8E1D5] shadow-2xl p-6 sm:p-8 space-y-6 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#526359] hover:text-[#0A261D] rounded-full hover:bg-[#FAF8F5]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E8E1D5] text-xs font-semibold text-[#B89344]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TGG Gift Concierge</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#0A261D]">
            {step <= 3 ? 'Find the Perfect Gift in 3 Questions' : 'Curated Just for You'}
          </h2>
          <p className="text-xs text-[#64746B]">
            {step <= 3 ? `Step ${step} of 3` : 'Based on your occasion, recipient, and budget'}
          </p>
        </div>

        {/* Step 1: Who is it for */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0A261D] text-center">
              1. Who are you celebrating?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'him', title: 'For Him', desc: 'Boyfriend, Husband, Brother, Father' },
                { id: 'her', title: 'For Her', desc: 'Girlfriend, Wife, Sister, Best Friend' },
                { id: 'couple', title: 'Couple / Special', desc: 'Anniversary, Wedding, Cherished Duo' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setRecipient(opt.id)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    recipient === opt.id
                      ? 'border-[#0A261D] bg-[#FAF8F5] ring-1 ring-[#0A261D]'
                      : 'border-[#E8E1D5] hover:border-[#B89344]'
                  }`}
                >
                  <div className="font-display font-semibold text-base text-[#0A261D] mb-1">
                    {opt.title}
                  </div>
                  <div className="text-xs text-[#64746B]">{opt.desc}</div>
                </button>
              ))}
            </div>
            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0A261D] rounded-md hover:bg-[#153B2F] flex items-center gap-1.5"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Occasion */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0A261D] text-center">
              2. What is the occasion?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'birthday', title: 'Birthday / 12 AM Midnight', desc: 'Celebrate with sweet snacks or luxury timepieces' },
                { id: 'anniversary', title: 'Anniversary / Romance', desc: 'Thoughtful keepsakes, jewelry, and engraved photos' },
                { id: 'achievement', title: 'Graduation / Promotion', desc: 'Executive accessories, watches & leather wallets' },
                { id: 'gratitude', title: 'Gratitude & Love', desc: 'Gourmet chocolates and custom personalized mugs' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setOccasion(opt.id)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    occasion === opt.id
                      ? 'border-[#0A261D] bg-[#FAF8F5] ring-1 ring-[#0A261D]'
                      : 'border-[#E8E1D5] hover:border-[#B89344]'
                  }`}
                >
                  <div className="font-display font-semibold text-base text-[#0A261D] mb-1">
                    {opt.title}
                  </div>
                  <div className="text-xs text-[#64746B]">{opt.desc}</div>
                </button>
              ))}
            </div>
            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs font-medium text-[#526359] hover:text-[#0A261D]"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0A261D] rounded-md hover:bg-[#153B2F] flex items-center gap-1.5"
              >
                <span>Next Question</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Budget in PKR */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0A261D] text-center">
              3. Desired Budget Range in PKR
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'low', title: 'Under PKR 3,500', desc: 'Chocolates, mugs & accessory sets' },
                { id: 'medium', title: 'PKR 3,500 – 8,000', desc: 'Vanity baskets, keepsake suites, leather' },
                { id: 'high', title: 'PKR 8,000 – 25,000+', desc: 'Executive Watch & Fragrance hampers' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setBudget(opt.id)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    budget === opt.id
                      ? 'border-[#0A261D] bg-[#FAF8F5] ring-1 ring-[#0A261D]'
                      : 'border-[#E8E1D5] hover:border-[#B89344]'
                  }`}
                >
                  <div className="font-display font-semibold text-base text-[#0A261D] mb-1">
                    {opt.title}
                  </div>
                  <div className="text-xs text-[#64746B]">{opt.desc}</div>
                </button>
              ))}
            </div>
            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2 text-xs font-medium text-[#526359] hover:text-[#0A261D]"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="px-5 py-2.5 text-xs font-semibold text-[#0A261D] bg-[#DFBA6B] hover:bg-[#F2DEB0] rounded-md shadow-xs flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Show Matches</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Results */}
        {step === 4 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommendations.map((prod) => (
                <div
                  key={prod.id}
                  className="p-4 rounded-xl border border-[#E8E1D5] bg-[#FAF8F5] flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <img
                      src={prod.image}
                      alt={prod.title}
                      referrerPolicy="no-referrer"
                      className="w-full aspect-4/3 object-cover rounded-lg border border-[#E0D8CB]"
                    />
                    <div className="text-[11px] text-[#64746B]">{prod.categoryLabel}</div>
                    <h4 className="font-display text-base font-semibold text-[#0A261D]">
                      {prod.title}
                    </h4>
                    <p className="text-xs text-[#526359] line-clamp-2">
                      {prod.tagline}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#E8E1D5] flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-[#0A261D] tabular-nums">
                      From PKR {prod.basePrice.toLocaleString()}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        onSelectProduct(prod, prod.variants[0]);
                        onClose();
                      }}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-[#0A261D] hover:bg-[#153B2F] rounded-md"
                    >
                      Customize
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-between items-center text-xs">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-[#64746B] hover:text-[#0A261D] underline"
              >
                Retake Quiz
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-[#0A261D] bg-[#F4EFE6] rounded-md"
              >
                Close Concierge
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Product, ProductVariant } from '../types';
import { X, Check, Gift, Sparkles, MessageCircle, ShieldCheck } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  initialVariant?: ProductVariant;
  onClose: () => void;
  onAddToCart: (
    product: Product, 
    variant: ProductVariant, 
    customization: {
      recipientName?: string;
      customNote?: string;
      addOns: { name: string; price: number }[];
    }
  ) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  initialVariant,
  onClose,
  onAddToCart
}) => {
  if (!product) return null;

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    initialVariant || product.variants[0]
  );
  const [recipientName, setRecipientName] = useState('');
  const [occasion, setOccasion] = useState('Birthday');
  const [customNote, setCustomNote] = useState('');
  const [includeFairyLights, setIncludeFairyLights] = useState(false);
  const [includeBabysBreath, setIncludeBabysBreath] = useState(false);
  const [includeExtraFerrero, setIncludeExtraFerrero] = useState(false);

  const addOns: { name: string; price: number }[] = [];
  if (includeFairyLights) addOns.push({ name: 'Warm LED Fairy Lights', price: 350 });
  if (includeBabysBreath) addOns.push({ name: 'Fresh Baby’s Breath Spray', price: 450 });
  if (includeExtraFerrero) addOns.push({ name: 'Ferrero Rocher (3 pcs extra)', price: 450 });

  const addOnsTotal = addOns.reduce((sum, item) => sum + item.price, 0);
  const totalPrice = selectedVariant.price + addOnsTotal;

  const handleAdd = () => {
    onAddToCart(product, selectedVariant, {
      recipientName: recipientName.trim() || undefined,
      customNote: customNote.trim() ? `[${occasion}] ${customNote.trim()}` : undefined,
      addOns
    });
    onClose();
  };

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hello The Gifts Gallery! 🎁\n\nI want to order:\n*${product.title}* (${selectedVariant.name})\nPrice: PKR ${totalPrice.toLocaleString()}\nRecipient: ${recipientName || 'Not specified'}\nOccasion: ${occasion}\nNote: ${customNote || 'None'}\nAdd-ons: ${addOns.map(a => a.name).join(', ') || 'None'}\n\nPlease confirm availability for 1-2 days advance booking!`
    );
    window.open(`https://wa.me/923000000000?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-2xl border border-[#E8E1D5] shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-[#526359] hover:text-[#0A261D] bg-white/90 rounded-full hover:bg-white transition-colors shadow-xs"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Image & Highlights */}
          <div className="bg-[#FAF8F5] p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E8E1D5]">
            <div className="space-y-4">
              <div className="relative aspect-4/3 rounded-xl overflow-hidden border border-[#E8E1D5] shadow-xs bg-[#F4EFE6]">
                <img
                  src={product.image}
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-[#0A261D] text-white text-[11px] font-medium px-2.5 py-1 rounded-sm">
                    {product.badge}
                  </span>
                )}
              </div>

              <div>
                <div className="text-xs text-[#64746B] mb-1">{product.categoryLabel}</div>
                <h3 className="font-display text-2xl font-semibold text-[#0A261D] leading-tight">
                  {product.title}
                </h3>
                <p className="text-xs text-[#526359] mt-1 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* What is inside this variant */}
              <div className="pt-3 border-t border-[#E8E1D5]">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0A261D] mb-2">
                  Items Inside ({selectedVariant.name}):
                </h4>
                <ul className="space-y-1.5 text-xs text-[#405349]">
                  {selectedVariant.itemsIncluded.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#B89344] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Packaging and Lead Time Callout */}
            <div className="mt-6 pt-4 border-t border-[#E8E1D5] text-[11px] text-[#64746B] space-y-1">
              <div className="flex items-center gap-2">
                <Gift className="w-3.5 h-3.5 text-[#B89344]" />
                <span>{product.packaging}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B89344]" />
                <span>Policy: 1-2 Days Advance Notice Required</span>
              </div>
            </div>
          </div>

          {/* Right Column: Customization & Purchase */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              {/* Variant Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#0A261D] mb-2">
                  Select Size & Curation Tier
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={`p-2.5 text-left rounded-lg border text-xs transition-all ${
                        selectedVariant.id === v.id
                          ? 'border-[#0A261D] bg-[#0A261D] text-white shadow-xs'
                          : 'border-[#E8E1D5] bg-white text-[#405349] hover:border-[#0A261D]/50'
                      }`}
                    >
                      <div className="font-semibold">{v.name.replace(' (Premium)', '')}</div>
                      <div className={`mt-0.5 font-mono text-[11px] tabular-nums ${selectedVariant.id === v.id ? 'text-[#E5CCA0]' : 'text-[#64746B]'}`}>
                        PKR {v.price.toLocaleString()}
                      </div>
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-[#64746B] mt-2 italic">
                  {selectedVariant.description}
                </p>
              </div>

              {/* Personalization Inputs */}
              <div className="pt-3 border-t border-[#F0EBE1] space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0A261D]">
                  Personalize Your Gift
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-[#526359] mb-1">
                      Recipient’s Name
                    </label>
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="e.g. Zaid / Ayesha"
                      className="w-full text-xs px-3 py-2 bg-[#FAF8F5] border border-[#DCD5C8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A261D]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#526359] mb-1">
                      Occasion
                    </label>
                    <select
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-[#FAF8F5] border border-[#DCD5C8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A261D]"
                    >
                      <option value="Birthday">Birthday</option>
                      <option value="Anniversary">Anniversary</option>
                      <option value="12 AM Midnight Surprise">12 AM Midnight Surprise</option>
                      <option value="Eid Mubarak">Eid Mubarak</option>
                      <option value="Congratulations">Congratulations</option>
                      <option value="With Love & Gratitude">With Love & Gratitude</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#526359] mb-1">
                    Calligraphy Card Message
                  </label>
                  <textarea
                    rows={2}
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    placeholder="Write a heartfelt note. We write this by hand with luxury wax seal stamp..."
                    className="w-full text-xs px-3 py-2 bg-[#FAF8F5] border border-[#DCD5C8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A261D]"
                  />
                </div>
              </div>

              {/* Studio Add-Ons */}
              <div className="pt-3 border-t border-[#F0EBE1] space-y-2">
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#0A261D]">
                  Enhance the Unboxing Experience
                </span>

                <div className="space-y-1.5">
                  <label className="flex items-center justify-between p-2 rounded-md hover:bg-[#FAF8F5] border border-[#E8E1D5] cursor-pointer text-xs">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={includeFairyLights}
                        onChange={(e) => setIncludeFairyLights(e.target.checked)}
                        className="rounded text-[#0A261D] focus:ring-[#0A261D]"
                      />
                      <span>Warm LED Fairy Lights</span>
                    </div>
                    <span className="font-mono text-[#64746B] tabular-nums">+PKR 350</span>
                  </label>

                  <label className="flex items-center justify-between p-2 rounded-md hover:bg-[#FAF8F5] border border-[#E8E1D5] cursor-pointer text-xs">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={includeBabysBreath}
                        onChange={(e) => setIncludeBabysBreath(e.target.checked)}
                        className="rounded text-[#0A261D] focus:ring-[#0A261D]"
                      />
                      <span>Fresh Baby’s Breath Spray</span>
                    </div>
                    <span className="font-mono text-[#64746B] tabular-nums">+PKR 450</span>
                  </label>

                  <label className="flex items-center justify-between p-2 rounded-md hover:bg-[#FAF8F5] border border-[#E8E1D5] cursor-pointer text-xs">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={includeExtraFerrero}
                        onChange={(e) => setIncludeExtraFerrero(e.target.checked)}
                        className="rounded text-[#0A261D] focus:ring-[#0A261D]"
                      />
                      <span>Ferrero Rocher Trio Box</span>
                    </div>
                    <span className="font-mono text-[#64746B] tabular-nums">+PKR 450</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Total and Actions */}
            <div className="pt-4 border-t border-[#E8E1D5] space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-[#64746B]">Total Price (Incl. Packaging):</span>
                <span className="font-mono text-xl font-bold text-[#0A261D] tabular-nums">
                  PKR {totalPrice.toLocaleString()}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleAdd}
                  className="w-full py-3 px-4 text-xs font-semibold text-white bg-[#0A261D] hover:bg-[#153B2F] rounded-md transition-colors shadow-xs flex items-center justify-center gap-2"
                >
                  <Gift className="w-4 h-4 text-[#DFBA6B]" />
                  <span>Add to Shopping Bag</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppInquiry}
                  className="w-full py-3 px-4 text-xs font-semibold text-[#0A261D] bg-[#F4EFE6] hover:bg-[#E8E1D5] border border-[#DCD5C8] rounded-md transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#0A261D]" />
                  <span>Order on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

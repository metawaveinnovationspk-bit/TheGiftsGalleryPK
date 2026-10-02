import React from 'react';
import { Instagram, Star, Heart, Sparkles, CheckCircle2 } from 'lucide-react';

export const BrandStory: React.FC = () => {
  const testimonials = [
    {
      name: 'Mahnoor Tariq',
      city: 'Lahore (Gulberg)',
      occasion: '12 AM Birthday Surprise',
      quote: 'The 12 AM midnight delivery for my husband’s birthday was executed to absolute perfection! The green velvet box, the chronograph watch, and the handwritten calligraphy card brought tears to his eyes. Worth every rupee.',
      rating: 5
    },
    {
      name: 'Hamza Farooqi',
      city: 'Karachi (DHA)',
      occasion: 'Anniversary Vanity Hamper',
      quote: 'Ordered the Luxury Jewelry & Makeup vanity box for our 2nd anniversary. The packaging, satin bow, and Dior-inspired fragrance smelled incredible. TGG customer support is super polite and responsive.',
      rating: 5
    },
    {
      name: 'Zainab & Asad',
      city: 'Islamabad (F-7)',
      occasion: 'Personalized Keepsake Suite',
      quote: 'The custom wooden frame and engraved thermal tumbler turned out so crisp and elegant. You can truly tell how much love and energy their team puts into hand-crafting each piece.',
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B89344]">
              Our Studio Philosophy
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#0A261D] leading-tight">
              "Because It's More Than Just a Gift."
            </h2>
            <p className="text-sm text-[#526359] leading-relaxed">
              At <strong>The Gifts Gallery (TGG)</strong>, we believe every relationship has its own language of intimacy, inside jokes, and cherished moments. A gift shouldn’t just be an item purchased off a shelf—it should be an experience that makes hearts skip a beat.
            </p>
            <p className="text-sm text-[#526359] leading-relaxed">
              From hand-weaving raw cane baskets and tying lush satin emerald ribbons to meticulously testing fragrance flacons and scripting personalized greetings on textured card stock, we invest our heartfelt energy into each package.
            </p>

            <div className="pt-2 flex items-center gap-6 text-xs text-[#0A261D] font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B89344]" />
                <span>100% Studio Handcrafted</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B89344]" />
                <span>Safe Delivery Across PK</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://www.instagram.com/thegiftsgallery.pk/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#0A261D] bg-white border border-[#DCD5C8] hover:border-[#0A261D] rounded-md transition-all shadow-2xs"
              >
                <Instagram className="w-4 h-4 text-[#E1306C]" />
                <span>Follow @thegiftsgallery.pk on Instagram</span>
              </a>
            </div>
          </div>

          {/* Visual Flatlay Bento preview */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-xl overflow-hidden border border-[#E8E1D5] shadow-xs">
                <img
                  src="/src/assets/images/tgg_watch_perfume_luxury_box_1790959645361.jpg"
                  alt="Men's Luxury Watch & Perfume Hamper"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-square object-cover"
                />
              </div>
              <div className="p-4 bg-white rounded-xl border border-[#E8E1D5] text-xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#B89344]">Signature Craft</span>
                <p className="font-display font-semibold text-[#0A261D]">Emerald & Gold Rigid Boxes</p>
                <p className="text-[11px] text-[#64746B]">Hand-stamped with our golden wax seal.</p>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <div className="p-4 bg-[#0A261D] text-white rounded-xl space-y-2">
                <div className="flex items-center gap-1 text-[#DFBA6B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs font-medium leading-relaxed">
                  "Over 1,500+ birthday surprises, anniversary moments, and proposal keepsakes delivered nationwide."
                </p>
              </div>
              <div className="rounded-xl overflow-hidden border border-[#E8E1D5] shadow-xs">
                <img
                  src="/src/assets/images/tgg_snack_chocolate_wicker_basket_1790959662671.jpg"
                  alt="Wicker Chocolate Basket"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-square object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Real Customer Experiences */}
        <div className="pt-10 border-t border-[#E8E1D5]">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B89344]">
              Customer Love
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#0A261D]">
              Moments We’ve Had The Honor to Share
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-6 bg-white rounded-xl border border-[#E8E1D5] shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#B89344]">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[11px] text-[#64746B]">{t.occasion}</span>
                  </div>

                  <p className="text-xs text-[#405349] leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F0EBE1] text-xs">
                  <div className="font-semibold text-[#0A261D]">{t.name}</div>
                  <div className="text-[11px] text-[#8E9B93]">{t.city}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

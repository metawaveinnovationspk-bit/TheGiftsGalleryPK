import React, { useState } from 'react';
import { POLICIES } from '../data/policies';
import { 
  CalendarClock, 
  Clock, 
  Sparkles, 
  Scale, 
  FileText, 
  Wallet, 
  HeartHandshake, 
  Key, 
  MessageSquare,
  ShieldAlert,
  ChevronDown
} from 'lucide-react';

const ICONS_MAP: Record<string, React.ReactNode> = {
  CalendarClock: <CalendarClock className="w-5 h-5 text-[#B89344]" />,
  Clock: <Clock className="w-5 h-5 text-[#B89344]" />,
  Sparkles: <Sparkles className="w-5 h-5 text-[#B89344]" />,
  Scale: <Scale className="w-5 h-5 text-[#B89344]" />,
  FileText: <FileText className="w-5 h-5 text-[#B89344]" />,
  Wallet: <Wallet className="w-5 h-5 text-[#B89344]" />,
  HeartHandshake: <HeartHandshake className="w-5 h-5 text-[#B89344]" />,
  Key: <Key className="w-5 h-5 text-[#B89344]" />,
  MessageSquare: <MessageSquare className="w-5 h-5 text-[#B89344]" />
};

export const PoliciesSection: React.FC = () => {
  const [expandedPolicyId, setExpandedPolicyId] = useState<number | null>(null);

  const togglePolicy = (id: number) => {
    setExpandedPolicyId(expandedPolicyId === id ? null : id);
  };

  return (
    <section id="policies" className="py-20 bg-[#F4EFE6] border-y border-[#E8E1D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header matching official poster */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          {/* Gold Seal Icon */}
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#0A261D] text-[#E5CCA0] border-2 border-[#C5A059] shadow-md mb-2">
            <span className="font-display font-bold text-sm tracking-widest">TGG</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0A261D] tracking-tight">
            Customer & Order Policies
          </h2>
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#B89344] font-medium">
            Our Uncompromising Commitment to You
          </p>
          <p className="text-sm text-[#526359] pt-1">
            To ensure a smooth and delightful shopping experience, please take a moment to read our policies below.
          </p>
        </div>

        {/* 9 Policies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {POLICIES.map((policy) => {
            const isExpanded = expandedPolicyId === policy.id;
            return (
              <div
                key={policy.id}
                onClick={() => togglePolicy(policy.id)}
                className={`group relative bg-white p-6 rounded-xl border transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-between ${
                  isExpanded
                    ? 'border-[#0A261D] ring-1 ring-[#0A261D]'
                    : 'border-[#E0D8CB] hover:border-[#B89344]'
                }`}
              >
                <div className="space-y-3">
                  {/* Card Header with Number and Icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#E0D8CB] flex items-center justify-center font-display font-semibold text-xs text-[#0A261D] group-hover:bg-[#0A261D] group-hover:text-white transition-colors">
                        {policy.id}
                      </div>
                      <h3 className="font-display text-lg font-semibold text-[#0A261D] group-hover:text-[#B89344] transition-colors">
                        {policy.title}
                      </h3>
                    </div>
                    <div className="p-1.5 rounded-full bg-[#FAF8F5]">
                      {ICONS_MAP[policy.iconName] || <Sparkles className="w-4 h-4 text-[#B89344]" />}
                    </div>
                  </div>

                  {/* Short Highlight from Poster */}
                  <p className="text-xs font-medium text-[#2C3E33] leading-relaxed">
                    {policy.shortDesc}
                  </p>

                  {/* Expanded Detailed Policy */}
                  {isExpanded && (
                    <div className="pt-3 border-t border-[#F0EBE1] text-xs text-[#526359] leading-relaxed animate-fadeIn">
                      {policy.fullDesc}
                    </div>
                  )}
                </div>

                {/* Footer of card */}
                <div className="pt-3 mt-3 border-t border-[#F4EFE6] flex items-center justify-between text-[11px] text-[#64746B]">
                  <span>{policy.tag}</span>
                  <div className="flex items-center gap-1 text-[#B89344] font-medium">
                    <span>{isExpanded ? 'Less' : 'Details'}</span>
                    <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing Note directly from the poster */}
        <div className="mt-14 max-w-xl mx-auto text-center space-y-2 border-t border-[#E0D8CB] pt-8">
          <p className="font-display italic text-base sm:text-lg text-[#0A261D]">
            "Thank you for allowing us to share your moment."
          </p>
          <p className="font-display text-sm font-semibold tracking-wider text-[#B89344]">
            The Gifts Gallery
          </p>
          <div className="text-[11px] uppercase tracking-[0.25em] text-[#64746B] pt-2">
            Gifts · Surprises · Memories
          </div>
        </div>

      </div>
    </section>
  );
};

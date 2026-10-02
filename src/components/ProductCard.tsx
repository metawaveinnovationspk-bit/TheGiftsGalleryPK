import React, { useState } from 'react';
import { Product, ProductVariant } from '../types';
import { Eye, Plus, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product, selectedVariant: ProductVariant) => void;
  onAddToCart: (product: Product, variant: ProductVariant) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart
}) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [isAddedBriefly, setIsAddedBriefly] = useState(false);
  const [imageError, setImageError] = useState(false);

  const currentVariant = product.variants[selectedVariantIndex] || product.variants[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, currentVariant);
    setIsAddedBriefly(true);
    setTimeout(() => setIsAddedBriefly(false), 1600);
  };

  return (
    <div 
      onClick={() => onQuickView(product, currentVariant)}
      className="group relative flex flex-col bg-white rounded-xl border border-[#E8E1D5] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
    >
      {/* Product Image Stage (65-75% visual weight) */}
      <div className="relative aspect-4/3 w-full bg-[#F4EFE6] overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.title}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br ${product.fallbackGradient} p-6 text-white text-center`}>
            <span className="font-display text-xl font-medium">{product.title}</span>
            <span className="text-xs text-[#E5CCA0] mt-1">{product.tagline}</span>
          </div>
        )}

        {/* Quiet badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-[#0A261D]/90 backdrop-blur-xs text-[#FAF8F5] text-[11px] font-medium px-2.5 py-1 rounded-sm tracking-wide">
            {product.badge}
          </div>
        )}

        {/* Hover Quick Action overlay */}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product, currentVariant);
            }}
            className="px-3.5 py-2 text-xs font-medium text-[#0A261D] bg-white rounded-md shadow-md hover:bg-[#FAF8F5] transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div className="space-y-2">
          {/* Metadata without pills */}
          <div className="flex items-center gap-2 text-xs text-[#64746B]">
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{product.variants.length} Sizes</span>
          </div>

          <h3 className="font-display text-lg font-semibold text-[#0A261D] leading-snug group-hover:text-[#B89344] transition-colors">
            {product.title}
          </h3>

          <p className="text-xs text-[#526359] line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Size Variant Switcher (Interactive segmented buttons) */}
        <div className="pt-2 border-t border-[#F0EBE1] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-[#64746B] uppercase tracking-wider">
              Select Size
            </span>
            <span className="text-xs font-mono font-semibold text-[#0A261D] tabular-nums">
              PKR {currentVariant.price.toLocaleString()}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 bg-[#FAF8F5] p-1 rounded-lg border border-[#E8E1D5]">
            {product.variants.map((variant, idx) => (
              <button
                key={variant.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedVariantIndex(idx);
                }}
                className={`py-1 text-[11px] font-medium rounded-md transition-all whitespace-nowrap truncate px-1 ${
                  selectedVariantIndex === idx
                    ? 'bg-[#0A261D] text-[#FAF8F5] shadow-xs'
                    : 'text-[#526359] hover:text-[#0A261D] hover:bg-[#F0EBE1]'
                }`}
              >
                {variant.name.replace(' (Premium)', '')}
              </button>
            ))}
          </div>

          {/* Action button */}
          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={isAddedBriefly}
            className={`w-full py-2.5 px-4 text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-1.5 ${
              isAddedBriefly
                ? 'bg-[#15573F] text-white'
                : 'bg-[#F4EFE6] text-[#0A261D] hover:bg-[#0A261D] hover:text-white border border-[#E0D8CB]'
            }`}
          >
            {isAddedBriefly ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add to Bag · PKR {currentVariant.price.toLocaleString()}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

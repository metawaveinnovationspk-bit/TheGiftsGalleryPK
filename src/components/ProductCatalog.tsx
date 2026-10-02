import React, { useState, useMemo } from 'react';
import { Product, ProductVariant, Category } from '../types';
import { ProductCard } from './ProductCard';
import { Search, SlidersHorizontal } from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
  selectedCategory: Category;
  onSelectCategory: (cat: Category) => void;
  onQuickView: (product: Product, selectedVariant: ProductVariant) => void;
  onAddToCart: (product: Product, variant: ProductVariant) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onQuickView,
  onAddToCart
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriceTier, setSelectedPriceTier] = useState<string>('all');
  const [selectedSort, setSelectedSort] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const categories: { id: Category; label: string }[] = [
    { id: 'all', label: 'All Curations' },
    { id: 'for-him', label: 'Luxury Gifts for Him' },
    { id: 'baskets', label: 'Thoughtful Baskets' },
    { id: 'personalized', label: 'Personalized Keepsakes' },
    { id: 'accessories', label: 'Elegant Accessories' }
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchTagline = p.tagline.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchItems = p.variants.some((v) =>
            v.itemsIncluded.some((item) => item.toLowerCase().includes(q))
          );
          if (!matchTitle && !matchTagline && !matchDesc && !matchItems) {
            return false;
          }
        }

        // Price tier filter
        if (selectedPriceTier === 'under-3000') {
          return p.basePrice <= 3000;
        } else if (selectedPriceTier === '3000-8000') {
          return p.basePrice > 3000 && p.basePrice <= 8000;
        } else if (selectedPriceTier === 'above-8000') {
          return p.basePrice > 8000;
        }

        return true;
      })
      .sort((a, b) => {
        if (selectedSort === 'price-asc') return a.basePrice - b.basePrice;
        if (selectedSort === 'price-desc') return b.basePrice - a.basePrice;
        return 0; // featured default
      });
  }, [products, selectedCategory, searchQuery, selectedPriceTier, selectedSort]);

  return (
    <section id="collections" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#E8E1D5]">
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B89344]">
            Handcrafted With Care
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#0A261D]">
            Curated Gift Hampers & Collections
          </h2>
          <p className="text-sm text-[#526359] max-w-xl">
            Each piece is assembled by hand in our studio with premium keepsake packaging, satin ribbons, and your personalized greeting.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72 shrink-0">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search hampers, watches, chocolates..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-[#DCD5C8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A261D] focus:border-[#0A261D] transition-colors placeholder:text-[#8E9B93]"
          />
          <Search className="w-4 h-4 text-[#8E9B93] absolute left-3 top-2.5" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2 text-xs text-[#8E9B93] hover:text-[#0A261D]"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Filter and Segment Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        {/* Category Tabs (Segmented control buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3.5 py-2 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#0A261D] text-[#FAF8F5] shadow-xs'
                  : 'bg-white text-[#526359] hover:text-[#0A261D] border border-[#E8E1D5]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Secondary Filters */}
        <div className="flex items-center gap-3 self-end lg:self-auto text-xs text-[#526359]">
          <div className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#B89344]" />
            <select
              value={selectedPriceTier}
              onChange={(e) => setSelectedPriceTier(e.target.value)}
              className="bg-white border border-[#DCD5C8] rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#0A261D]"
            >
              <option value="all">All Prices</option>
              <option value="under-3000">Under PKR 3,000</option>
              <option value="3000-8000">PKR 3,000 – 8,000</option>
              <option value="above-8000">PKR 8,000+</option>
            </select>
          </div>

          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value as any)}
            className="bg-white border border-[#DCD5C8] rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#0A261D]"
          >
            <option value="featured">Featured Order</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Unboxed Metadata Counter */}
      <div className="mb-6 flex items-center justify-between text-xs text-[#64746B]">
        <div>
          <span>Showing {filteredProducts.length} curations</span>
          <span aria-hidden="true" className="mx-2">·</span>
          <span>PKR Currency</span>
          <span aria-hidden="true" className="mx-2">·</span>
          <span>Delivery Across Pakistan</span>
        </div>
      </div>

      {/* Grid or Empty State */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-[#DCD5C8] p-8">
          <p className="font-display text-xl text-[#0A261D] mb-2">No Hampers Matched Your Criteria</p>
          <p className="text-xs text-[#64746B] mb-4">
            Try adjusting your search query or reset the filters to browse our full collection.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedPriceTier('all');
              onSelectCategory('all');
            }}
            className="px-4 py-2 text-xs font-semibold text-[#0A261D] bg-[#F4EFE6] hover:bg-[#E8E1D5] rounded-md transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </section>
  );
};

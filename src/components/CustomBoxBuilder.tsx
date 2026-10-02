import React, { useState } from 'react';
import { Gift, Check, Sparkles, Plus, Trash2, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CustomBoxBuilderProps {
  onAddCustomBoxToCart: (item: CartItem) => void;
}

interface BoxType {
  id: string;
  name: string;
  material: string;
  basePrice: number;
  image: string;
}

const BOX_TYPES: BoxType[] = [
  {
    id: 'box-emerald',
    name: 'Signature Emerald Velvet Box',
    material: 'Hardboard rigid case lined with hunter green velvet and gold foil crest',
    basePrice: 1500,
    image: '/src/assets/images/tgg_watch_perfume_luxury_box_1790959645361.jpg'
  },
  {
    id: 'box-noir-hatbox',
    name: 'Noir Circular Vanity Hatbox',
    material: 'Matte black cylindrical luxury box with satin bow closure',
    basePrice: 1200,
    image: '/src/assets/images/tgg_jewelry_makeup_round_box_1790959683065.jpg'
  },
  {
    id: 'box-wicker',
    name: 'Artisanal Woven Wicker Basket',
    material: 'Natural hand-woven cane basket with carry handle and straw nesting',
    basePrice: 950,
    image: '/src/assets/images/tgg_snack_chocolate_wicker_basket_1790959662671.jpg'
  },
  {
    id: 'box-wooden-crate',
    name: 'Personalized Keepsake Box',
    material: 'Smooth pine craft box with magnetic closure and personalized acrylic tag',
    basePrice: 1400,
    image: '/src/assets/images/tgg_personalized_mug_tumbler_frame_1790959695246.jpg'
  }
];

const AVAILABLE_ITEMS = [
  { id: 'item-perfume', name: 'Designer Fragrance Flacon (Bleu / Sauvage note)', category: 'Luxury', price: 2600 },
  { id: 'item-watch', name: 'Chronograph Metal Strap Timepiece', category: 'Timepiece', price: 3900 },
  { id: 'item-wallet', name: 'Genuine Leather Monogram Wallet', category: 'Leather', price: 2200 },
  { id: 'item-clover-set', name: 'Four-Leaf Clover Necklace & Studs', category: 'Jewelry', price: 1800 },
  { id: 'item-pearl-bracelet', name: 'Freshwater Pearl Charm Bracelet', category: 'Jewelry', price: 1200 },
  { id: 'item-ferrero', name: 'Ferrero Rocher Truffles (8 Pcs)', category: 'Gourmet', price: 1150 },
  { id: 'item-choc-trio', name: 'Dairy Milk & KitKat Chocolate Assortment', category: 'Gourmet', price: 650 },
  { id: 'item-pringles', name: 'Pringles Original Crisps Can', category: 'Gourmet', price: 480 },
  { id: 'item-frame', name: 'Solid Wood Photo Frame (with high-res print)', category: 'Personalized', price: 1500 },
  { id: 'item-mug', name: 'Customized Calligraphy Ceramic Mug', category: 'Personalized', price: 1100 },
  { id: 'item-tumbler', name: 'Matte Emerald Insulated Travel Tumbler', category: 'Personalized', price: 1850 },
  { id: 'item-journal', name: 'Gold Foil Monogram Journal & Brass Pen', category: 'Personalized', price: 1600 },
  { id: 'item-sunglasses', name: 'Classic Aviator Sunglasses & Case', category: 'Accessories', price: 1400 },
  { id: 'item-lights', name: 'Warm Golden LED Fairy Lights (Embedded)', category: 'Experience', price: 350 },
  { id: 'item-florals', name: 'Fresh White Baby’s Breath Spray Stems', category: 'Experience', price: 450 }
];

export const CustomBoxBuilder: React.FC<CustomBoxBuilderProps> = ({ onAddCustomBoxToCart }) => {
  const [selectedBox, setSelectedBox] = useState<BoxType>(BOX_TYPES[0]);
  const [selectedSize, setSelectedSize] = useState<'Small' | 'Medium' | 'Large (Premium)'>('Medium');
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([
    'item-perfume',
    'item-watch',
    'item-ferrero',
    'item-lights'
  ]);
  const [ribbonColor, setRibbonColor] = useState('Emerald Green & Gold');
  const [recipientName, setRecipientName] = useState('');
  const [occasion, setOccasion] = useState('Birthday');
  const [messageCard, setMessageCard] = useState('');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const sizeMultiplier = {
    'Small': 0,
    'Medium': 400,
    'Large (Premium)': 900
  };

  const selectedItemsData = AVAILABLE_ITEMS.filter((item) => selectedItemIds.includes(item.id));
  const itemsTotal = selectedItemsData.reduce((sum, item) => sum + item.price, 0);
  const totalCost = selectedBox.basePrice + sizeMultiplier[selectedSize] + itemsTotal;

  const toggleItem = (id: string) => {
    if (selectedItemIds.includes(id)) {
      setSelectedItemIds(selectedItemIds.filter((item) => item !== id));
    } else {
      setSelectedItemIds([...selectedItemIds, id]);
    }
  };

  const handleAddToCart = () => {
    const customItem: CartItem = {
      id: `custom-box-${Date.now()}`,
      productId: 'custom-bespoke-box',
      title: `Bespoke ${selectedBox.name}`,
      image: selectedBox.image,
      variantName: `${selectedSize} (${selectedItemsData.length} items)`,
      unitPrice: totalCost,
      quantity: 1,
      isCustomBox: true,
      recipientName: recipientName.trim() || undefined,
      customizationNote: `[${occasion}] Ribbon: ${ribbonColor}. Message: ${messageCard || 'None'}. Included: ${selectedItemsData.map(i => i.name).join(', ')}`,
      addOns: selectedItemsData.map(i => ({ name: i.name, price: i.price }))
    };

    onAddCustomBoxToCart(customItem);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  return (
    <section id="builder" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B89344]">
          Bespoke Gifting Studio
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#0A261D]">
          Build Your Custom Gift Box
        </h2>
        <p className="text-sm text-[#526359]">
          Handpick every single item, choose your presentation box, select your ribbon, and let our studio hand-tie your dream surprise.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 4-Step Builder Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-8 bg-white p-6 sm:p-8 rounded-xl border border-[#E8E1D5] shadow-xs">
          
          {/* Step 1: Select Box Style */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0A261D] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#0A261D] text-white flex items-center justify-center text-[10px]">1</span>
                <span>Select Packaging Vessel</span>
              </h3>
              <span className="text-xs text-[#64746B]">Base includes bed, ribbon & tag</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BOX_TYPES.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setSelectedBox(b)}
                  className={`p-3 text-left rounded-lg border transition-all cursor-pointer ${
                    selectedBox.id === b.id
                      ? 'border-[#0A261D] bg-[#FAF8F5] ring-1 ring-[#0A261D]'
                      : 'border-[#E8E1D5] hover:border-[#B89344]/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-[#0A261D]">{b.name}</span>
                    <span className="font-mono text-xs text-[#B89344] tabular-nums">PKR {b.basePrice}</span>
                  </div>
                  <p className="text-[11px] text-[#64746B] line-clamp-2 leading-relaxed">
                    {b.material}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Choose Box Size */}
          <div className="space-y-3 pt-4 border-t border-[#F0EBE1]">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0A261D] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#0A261D] text-white flex items-center justify-center text-[10px]">2</span>
              <span>Choose Box Volume</span>
            </h3>

            <div className="grid grid-cols-3 gap-2">
              {(['Small', 'Medium', 'Large (Premium)'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedSize(s)}
                  className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                    selectedSize === s
                      ? 'bg-[#0A261D] text-white border-[#0A261D] shadow-xs'
                      : 'bg-white text-[#405349] border-[#E8E1D5] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <div>{s.replace(' (Premium)', '')}</div>
                  <div className="text-[10px] text-[#E5CCA0] font-mono tabular-nums">
                    {sizeMultiplier[s] > 0 ? `+PKR ${sizeMultiplier[s]}` : 'Base'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Pick Curated Items */}
          <div className="space-y-3 pt-4 border-t border-[#F0EBE1]">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0A261D] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#0A261D] text-white flex items-center justify-center text-[10px]">3</span>
                <span>Select Contents ({selectedItemIds.length} chosen)</span>
              </h3>
              <span className="text-[11px] text-[#64746B]">Click to toggle items</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
              {AVAILABLE_ITEMS.map((item) => {
                const isSelected = selectedItemIds.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    className={`flex items-center justify-between p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#0A261D] bg-[#F4EFE6] text-[#0A261D]'
                        : 'border-[#E8E1D5] bg-white text-[#526359] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate pr-2">
                      <div className={`w-4 h-4 rounded-sm flex items-center justify-center border shrink-0 ${
                        isSelected ? 'bg-[#0A261D] border-[#0A261D] text-white' : 'border-[#C5BDAF]'
                      }`}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                      <span className="truncate">{item.name}</span>
                    </div>
                    <span className="font-mono text-xs text-[#0A261D] font-medium shrink-0 tabular-nums">
                      PKR {item.price}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: Ribbon, Recipient & Handwritten Card */}
          <div className="space-y-3 pt-4 border-t border-[#F0EBE1]">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0A261D] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#0A261D] text-white flex items-center justify-center text-[10px]">4</span>
              <span>Ribbon & Calligraphy Card</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-[#526359] mb-1">
                  Satin Ribbon Color
                </label>
                <select
                  value={ribbonColor}
                  onChange={(e) => setRibbonColor(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-[#FAF8F5] border border-[#DCD5C8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A261D]"
                >
                  <option value="Emerald Green & Gold">Signature Emerald Green & Gold Bow</option>
                  <option value="Champagne Gold">Champagne Gold Satin Ribbon</option>
                  <option value="Midnight Velvet Noir">Midnight Velvet Noir</option>
                  <option value="Burgundy Silk">Burgundy Silk</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#526359] mb-1">
                  Recipient Name
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="e.g. Bilal / Fatima"
                  className="w-full text-xs px-3 py-2 bg-[#FAF8F5] border border-[#DCD5C8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A261D]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-[#526359] mb-1">
                Handwritten Message Card (Included Free)
              </label>
              <textarea
                rows={2}
                value={messageCard}
                onChange={(e) => setMessageCard(e.target.value)}
                placeholder="Write your personal message. We will script this on textured card stock with our golden wax stamp..."
                className="w-full text-xs px-3 py-2 bg-[#FAF8F5] border border-[#DCD5C8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A261D]"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Live Manifest & Summary Card (5 cols, sticky) */}
        <div className="lg:col-span-5 bg-[#FAF8F5] p-6 rounded-xl border border-[#E8E1D5] shadow-xs sticky top-24 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E1D5]">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#B89344] font-semibold">Your Curation</span>
              <h4 className="font-display text-lg font-semibold text-[#0A261D]">
                {selectedBox.name} ({selectedSize.replace(' (Premium)', '')})
              </h4>
            </div>
            <Sparkles className="w-5 h-5 text-[#B89344]" />
          </div>

          {/* Itemized Manifest */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between text-[#526359]">
              <span>Box Vessel & Ribbon Packaging</span>
              <span className="font-mono tabular-nums">PKR {selectedBox.basePrice + sizeMultiplier[selectedSize]}</span>
            </div>

            {selectedItemsData.length > 0 ? (
              <div className="space-y-1.5 pt-2 border-t border-[#E8E1D5]">
                <div className="text-[11px] font-semibold uppercase text-[#64746B]">Chosen Contents:</div>
                {selectedItemsData.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-[#37493E]">
                    <span className="truncate pr-2">· {item.name}</span>
                    <span className="font-mono text-xs tabular-nums shrink-0">PKR {item.price}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#9B8977] italic py-2">
                No add-in items selected yet. Choose items on the left to fill your hamper.
              </p>
            )}

            {recipientName && (
              <div className="pt-2 text-[11px] text-[#64746B]">
                <span className="font-medium text-[#0A261D]">Recipient:</span> {recipientName}
              </div>
            )}
            <div className="text-[11px] text-[#64746B]">
              <span className="font-medium text-[#0A261D]">Ribbon:</span> {ribbonColor}
            </div>
          </div>

          {/* Total & Action */}
          <div className="pt-4 border-t border-[#E8E1D5] space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-medium text-[#64746B]">Total Hamper Price:</span>
              <span className="font-mono text-2xl font-bold text-[#0A261D] tabular-nums">
                PKR {totalCost.toLocaleString()}
              </span>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={selectedItemsData.length === 0}
              className={`w-full py-3 px-4 text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                addedSuccess
                  ? 'bg-[#15573F] text-white'
                  : selectedItemsData.length === 0
                  ? 'bg-[#E8E1D5] text-[#8E9B93] cursor-not-allowed'
                  : 'bg-[#0A261D] text-white hover:bg-[#153B2F] shadow-sm'
              }`}
            >
              {addedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Custom Box Added to Bag!</span>
                </>
              ) : (
                <>
                  <Gift className="w-4 h-4 text-[#DFBA6B]" />
                  <span>Add Bespoke Box to Shopping Bag</span>
                </>
              )}
            </button>

            <p className="text-[11px] text-center text-[#64746B]">
              1-2 Days advance notice required for bespoke handcrafting.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

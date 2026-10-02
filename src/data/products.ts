import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'tgg-watch-perfume',
    title: 'Watch & Perfume Luxury Hamper',
    tagline: 'Timeless style. Lasting impression.',
    category: 'for-him',
    categoryLabel: 'Luxury Gifts for Him',
    image: '/src/assets/images/tgg_watch_perfume_luxury_box_1790959645361.jpg',
    fallbackGradient: 'from-[#0A261D] to-[#153B2F]',
    badge: 'Signature Best-Seller',
    basePrice: 8500,
    description: 'Our quintessential gentlemen’s curation. Nestled inside a rigid hunter green or black embossed TGG keepsake box, pairing a sleek metallic chronograph timepiece with a premium French-inspired fragrance, gold ribbon accents, and an embossed personalized note card.',
    features: [
      'Precision Chronograph Watch with Stainless Steel or Mesh Strap',
      'Designer Eau De Parfum (Bleu de Chanel / Sauvage inspired note profile)',
      'Custom gold-stamped TGG rigid keepsake gift box',
      'Hand-tied emerald green satin bow with branded charm',
      'Personalized calligraphy greeting card with wax seal'
    ],
    packaging: 'Rigid emerald green presentation box with ivory velvet bed and satin ribbon',
    leadTime: '1-2 Days Prior Notice Required',
    variants: [
      {
        id: 'wp-sm',
        name: 'Small',
        price: 8500,
        description: 'Chronograph watch, 50ml Eau de Parfum, velvet presentation tray & note card.',
        itemsIncluded: ['Chronograph Watch', '50ml Signature Perfume', 'Gift Box & Card']
      },
      {
        id: 'wp-md',
        name: 'Medium',
        price: 14500,
        description: 'Premium dual-dial chronograph, 100ml Eau de Parfum, leather cardholder & baby’s breath flora.',
        itemsIncluded: ['Premium Chronograph', '100ml Luxury Perfume', 'Leather Cardholder', 'Baby’s Breath Accents']
      },
      {
        id: 'wp-lg',
        name: 'Large (Premium)',
        price: 22500,
        description: 'Elite heavy chronograph, 100ml luxury fragrance, genuine leather bi-fold wallet, chain accessory & LED fairy lights.',
        itemsIncluded: ['Elite Chronograph', '100ml Luxury Perfume', 'Pure Leather Wallet', 'Steel Chain Keychain', 'LED Warm Lights']
      }
    ]
  },
  {
    id: 'tgg-snacks-chocolate-basket',
    title: 'Snacks & Chocolates Gourmet Basket',
    tagline: 'A perfect mix of tasty snacks and chocolates for every sweet moment.',
    category: 'baskets',
    categoryLabel: 'Thoughtful Gift Baskets',
    image: '/src/assets/images/tgg_snack_chocolate_wicker_basket_1790959662671.jpg',
    fallbackGradient: 'from-[#2B1B17] to-[#4A3B32]',
    badge: 'Popular Favorite',
    basePrice: 1800,
    description: 'An artisanal hand-woven wicker basket lined with rustic straw and delicate white baby’s breath florals, overflowing with world-favorite chocolates and gourmet savories, crowned with an emerald TGG bow and custom acrylic charm tag.',
    features: [
      'Ferrero Rocher golden truffles & Cadbury Dairy Milk bars',
      'Crisp Pringles potato crisps, KitKat four-finger, and Snickers bars',
      'Artisanal natural wicker basket with woven carry handle',
      'Fresh/dried baby’s breath floral spray decoration',
      'Branded green satin ribbon & customized wooden charm'
    ],
    packaging: 'Handcrafted woven wicker basket with satin ribbon and botanical sprays',
    leadTime: '1-2 Days Prior Notice Required',
    variants: [
      {
        id: 'sc-sm',
        name: 'Small',
        price: 1800,
        description: 'Ferrero Rocher 3-pack, Dairy Milk, KitKat, Snickers, mini Lays & baby’s breath.',
        itemsIncluded: ['Ferrero Rocher (3 pcs)', 'Cadbury Dairy Milk', 'KitKat Bar', 'Snickers', 'Wicker Basket']
      },
      {
        id: 'sc-md',
        name: 'Medium',
        price: 2600,
        description: 'Ferrero Rocher 8-pack, Pringles can, 2x Dairy Milk, 2x KitKat, Snickers & hazelnut chocolates.',
        itemsIncluded: ['Ferrero Rocher (8 pcs)', 'Pringles Original', '2x Cadbury Bars', '2x KitKat', 'Snickers', 'Wicker Basket']
      },
      {
        id: 'sc-lg',
        name: 'Large (Premium)',
        price: 4500,
        description: 'Ferrero Rocher 16-pack, 2x Pringles, imported wafers, assorted chocolate bars, gourmet nuts & fairy lights.',
        itemsIncluded: ['Ferrero Rocher (16 pcs)', '2x Pringles Cans', 'Premium Imported Bars', 'Hazelnut Wafers', 'Warm LED Glow']
      }
    ]
  },
  {
    id: 'tgg-jewelry-makeup-basket',
    title: 'Jewelry & Makeup Vanity Box',
    tagline: 'Elegant essentials for beauty, style and confidence.',
    category: 'baskets',
    categoryLabel: 'Thoughtful Gift Baskets',
    image: '/src/assets/images/tgg_jewelry_makeup_round_box_1790959683065.jpg',
    fallbackGradient: 'from-[#1A1A1A] to-[#2E2028]',
    badge: 'Luxe For Her',
    basePrice: 2500,
    description: 'A circular luxury vanity presentation box in rich matte noir and satin emerald ribbon, curated for her special milestone. Features elegant jewelry sets, designer cosmetic favorites, plush brushes, and fragrance mist.',
    features: [
      'Four-leaf clover pendant necklace & matching stud earrings',
      'Designer cosmetic essentials & velvety matte lipstick',
      'Soft champagne makeup blending brush set',
      'Luxury shimmering body mist / Eau de Parfum bottle',
      'Satin hair scrunchie, sweet chocolates & fairy lights option'
    ],
    packaging: 'Rigid round hatbox in noir velvet finish with gold foil TGG seal',
    leadTime: '1-2 Days Prior Notice Required',
    variants: [
      {
        id: 'jm-sm',
        name: 'Small',
        price: 2500,
        description: 'Clover necklace & earrings set, velvet matte lipstick, satin scrunchie & chocolate treats.',
        itemsIncluded: ['Clover Jewelry Set', 'Matte Lip Color', 'Silk Scrunchie', 'Chocolates', 'Hatbox']
      },
      {
        id: 'jm-md',
        name: 'Medium',
        price: 4200,
        description: 'Clover necklace, earrings, pearl bracelet, makeup brush set, lipstick, compact powder & sweet treat.',
        itemsIncluded: ['Necklace & Earrings', 'Pearl Bracelet', '5-pc Brush Set', 'Lipstick & Compact', 'Round Vanity Box']
      },
      {
        id: 'jm-lg',
        name: 'Large (Premium)',
        price: 7200,
        description: 'Complete luxury vanity hamper: jewelry suite, luxury fragrance mist, Dior/MAC inspired cosmetics, full brush kit, silk scrunchie & fairy lights.',
        itemsIncluded: ['Full Jewelry Suite', 'Designer Fragrance Mist', 'Luxe Lip & Cheek Palette', 'Full Brush Kit', 'Fairy Lights']
      }
    ]
  },
  {
    id: 'tgg-wallet-chain',
    title: 'Wallet & Chain Keepsake Set',
    tagline: 'Classic style. Everyday essential.',
    category: 'for-him',
    categoryLabel: 'Luxury Gifts for Him',
    image: '/src/assets/images/tgg_hero_luxury_gift_hamper_1790959632270.jpg',
    fallbackGradient: 'from-[#111827] to-[#0A261D]',
    badge: 'Timeless Classic',
    basePrice: 4800,
    description: 'Crafted for refined daily carry. A genuine smooth grain leather bi-fold wallet paired with a precision-machined steel key chain, dark chocolate bar, and custom laser-engraved monogram tag in our signature box.',
    features: [
      'Genuine leather bi-fold wallet with multiple RFID-blocking card slots',
      'Heavyweight stainless steel curb chain or custom monogram keychain',
      'Custom gold-foil lettered keepsake presentation box',
      'Dark Belgian or Swiss chocolate bar companion',
      'Complimentary handwritten calligraphy note card'
    ],
    packaging: 'Magnetic closure rigid matte black gift box with gold logo embossing',
    leadTime: '1-2 Days Prior Notice Required',
    variants: [
      {
        id: 'wc-sm',
        name: 'Small',
        price: 4800,
        description: 'Leather wallet, steel keychain with custom tag & gift packaging.',
        itemsIncluded: ['Leather Wallet', 'Steel Keychain', 'Gift Box & Card']
      },
      {
        id: 'wc-md',
        name: 'Medium',
        price: 9500,
        description: 'Premium top-grain leather wallet, biker curb chain / steel keychain, Aviator sunglasses & chocolate bar.',
        itemsIncluded: ['Premium Wallet', 'Steel Chain', 'Aviator Sunglasses', 'Gourmet Chocolate Bar']
      },
      {
        id: 'wc-lg',
        name: 'Large (Premium)',
        price: 14800,
        description: 'Full gentleman’s ensemble: Premium leather wallet, belt, heavy chain, Aviator sunglasses, pocket perfume & luxury box.',
        itemsIncluded: ['Leather Wallet & Belt', 'Heavy Steel Chain', 'Designer Sunglasses', 'Pocket Perfume', 'Luxury Box']
      }
    ]
  },
  {
    id: 'tgg-personalized-suite',
    title: 'Personalized Keepsake Collection',
    tagline: 'Your Story · Our Creativity · A Gift That Feels Personal',
    category: 'personalized',
    categoryLabel: 'Personalized Gifts',
    image: '/src/assets/images/tgg_personalized_mug_tumbler_frame_1790959695246.jpg',
    fallbackGradient: 'from-[#2F3E34] to-[#1E2B23]',
    badge: 'Heartfelt Keepsake',
    basePrice: 2800,
    description: 'Turn your cherished memories and inside jokes into timeless gifts. Includes custom ceramic mugs, wooden photo frames with high-definition matte photo prints, engraved thermal tumblers, and gold-foiled notebooks.',
    features: [
      'Solid natural oak wood photo frame with high-resolution photo print',
      'Ceramic mug printed with couple quote, anniversary date or custom design',
      'Matte emerald insulated stainless steel travel tumbler with custom engraving',
      'Gold foil embossed journal & executive brass rollerball pen',
      'Custom engraved brass keepsake keychain with personalized quote'
    ],
    packaging: 'Eco-luxury gift box with emerald satin ribbon and wood excelsior bedding',
    leadTime: '1-2 Days Prior Notice Required',
    variants: [
      {
        id: 'ps-sm',
        name: 'Small',
        price: 2800,
        description: 'Customized ceramic mug + Engraved brass keychain + Personalized photo print card.',
        itemsIncluded: ['Custom Ceramic Mug', 'Brass Keychain', 'Gift Card with Photo']
      },
      {
        id: 'ps-md',
        name: 'Medium',
        price: 4600,
        description: 'Oak wood photo frame (5x7) + Custom ceramic mug + Gold foil journal & pen.',
        itemsIncluded: ['Solid Wood Photo Frame', 'Custom Mug', 'Gold Foil Journal & Pen', 'Gift Box']
      },
      {
        id: 'ps-lg',
        name: 'Large (Premium)',
        price: 7500,
        description: 'The Complete Personalized Keepsake Suite: Insulated tumbler, oak photo frame, custom mug, gold notebook, keychain & Ferrero Rocher.',
        itemsIncluded: ['Engraved Tumbler', 'Oak Photo Frame', 'Custom Mug', 'Gold Notebook', 'Keyring', 'Ferrero Chocolates']
      }
    ]
  },
  {
    id: 'tgg-accessories-suite',
    title: 'Stylish & Elegant Accessories Suite',
    tagline: 'Trendy pieces for every unique you. Little Details, Big Smiles.',
    category: 'accessories',
    categoryLabel: 'Stylish Accessories',
    image: '/src/assets/images/tgg_jewelry_makeup_round_box_1790959683065.jpg',
    fallbackGradient: 'from-[#143226] to-[#081B13]',
    badge: 'Trending',
    basePrice: 2200,
    description: 'Curated accessory pieces that speak of understated elegance. From emerald four-leaf clovers and delicate freshwater pearl bracelets to matte black onyx crowns and aviator shades.',
    features: [
      'Four-leaf clover motifs symbolizing luck, love, and fortune',
      'Dainty layered pearl & gold-plated links with durable lobster clasps',
      'Natural matte black onyx stone beads with imperial crown spacer',
      'High-clarity UV400 Aviator sunglasses with protective hard case',
      'Branded velvet pouch & gold-embossed TGG gift packaging'
    ],
    packaging: 'Velvet jewelry roll or presentation box with gold satin ribbon',
    leadTime: '1-2 Days Prior Notice Required',
    variants: [
      {
        id: 'as-sm',
        name: 'Small',
        price: 2200,
        description: 'Choice of Clover & Pearl bracelet set OR Onyx crown bracelet in velvet pouch.',
        itemsIncluded: ['Designer Bracelet', 'Velvet Jewelry Pouch', 'Care Card']
      },
      {
        id: 'as-md',
        name: 'Medium',
        price: 3800,
        description: 'Clover necklace & earrings set + matching pearl bracelet in luxury presentation case.',
        itemsIncluded: ['Clover Necklace', 'Clover Earrings', 'Pearl Bracelet', 'Gift Box']
      },
      {
        id: 'as-lg',
        name: 'Large (Premium)',
        price: 5800,
        description: 'Full His & Hers or Duo Accessory Box: Aviator shades, full clover jewelry set, onyx bracelet & custom keychain.',
        itemsIncluded: ['Aviator Sunglasses', 'Full Clover Set', 'Onyx Crown Bracelet', 'Custom Keychain']
      }
    ]
  }
];

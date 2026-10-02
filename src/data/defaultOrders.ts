import { SavedOrder } from '../types';

export const DEFAULT_ORDERS: SavedOrder[] = [
  {
    orderId: 'TGG-48201',
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(), // 3 hours ago
    status: 'out_for_delivery',
    statusNotes: 'Rider Muhammad Usman is on route in Gulberg, Lahore. ETA within standard slot (1:00 PM – 10:00 PM).',
    riderName: 'Muhammad Usman (Dispatch Rider #4)',
    riderContact: '0302-8877665',
    details: {
      customerName: 'Areeba Siddiqui',
      phone: '0321-4567890',
      city: 'Lahore',
      address: 'House #42-B, Main Boulevard, Gulberg III',
      deliveryDate: new Date().toISOString().split('T')[0],
      deliverySlot: 'standard',
      paymentMethod: 'bank_transfer',
      discountAmount: 1450
    },
    items: [
      {
        id: 'item-demo-1',
        productId: 'tgg-watch-perfume',
        title: 'Watch & Perfume Luxury Hamper',
        image: '/src/assets/images/tgg_watch_perfume_luxury_box_1790959645361.jpg',
        variantName: 'Medium',
        unitPrice: 14500,
        quantity: 1,
        recipientName: 'Fahad Siddiqui',
        customizationNote: '[Birthday] Happy 28th Birthday my love! May all your dreams take flight.'
      }
    ],
    grandTotal: 13400,
    pointsEarned: 268
  },
  {
    orderId: 'TGG-61940',
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(), // 6 hours ago
    status: 'handcrafting',
    statusNotes: 'Master artisan is tying emerald green satin ribbons and preparing Ferrero Rocher truffles with fresh floral spray.',
    details: {
      customerName: 'Bilal Ahmed',
      phone: '0300-9871234',
      city: 'Karachi',
      address: 'Villa 18, Khayaban-e-Shamsheer, DHA Phase 5',
      deliveryDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      deliverySlot: 'midnight',
      paymentMethod: 'jazzcash',
      discountAmount: 0,
      specialInstructions: '[12 AM Midnight Surprise] Strict secret surprise! Do not call recipient beforehand. Ring bell at exactly 12:00 AM midnight.'
    },
    items: [
      {
        id: 'item-demo-2',
        productId: 'tgg-snacks-chocolate-basket',
        title: 'Snacks & Chocolates Gourmet Basket',
        image: '/src/assets/images/tgg_snack_chocolate_wicker_basket_1790959662671.jpg',
        variantName: 'Large (Premium)',
        unitPrice: 4500,
        quantity: 1,
        recipientName: 'Zara Bilal',
        customizationNote: '[12 AM Midnight Surprise] Happy 3rd Anniversary! Love always.'
      }
    ],
    grandTotal: 5250,
    pointsEarned: 105
  },
  {
    orderId: 'TGG-73412',
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString(), // 1 hour ago
    status: 'payment_verification',
    statusNotes: 'Awaiting 100% advance payment screenshot via Bank Alfalah / JazzCash (Policy #6). Slot provisionally reserved.',
    details: {
      customerName: 'Hamza Tariq',
      phone: '0333-8822119',
      city: 'Islamabad',
      address: 'House 12, Street 35, Sector F-7/2',
      deliveryDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      deliverySlot: 'standard',
      paymentMethod: 'bank_transfer',
      discountAmount: 550,
      specialInstructions: 'Personalized Calligraphy Ceramic Mug with name "Maham" & LED Fairy Lights inside keepsake box.'
    },
    items: [
      {
        id: 'item-demo-3',
        productId: 'tgg-personalized-suite',
        title: 'Personalized Keepsake Box & Mug Suite',
        image: '/src/assets/images/tgg_personalized_mug_tumbler_frame_1790959695246.jpg',
        variantName: 'Medium',
        unitPrice: 5500,
        quantity: 1,
        recipientName: 'Maham Tariq',
        customizationNote: 'Golden calligraphy engraved mug with keepsake pine wooden box.'
      }
    ],
    grandTotal: 5300,
    pointsEarned: 106
  },
  {
    orderId: 'TGG-85193',
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(), // 8 hours ago
    status: 'quality_sealed',
    statusNotes: 'Hamper passed studio quality check. Wax-sealed calligraphy greeting attached and boxed in temperature-safe insulation. Ready for rider assignment.',
    details: {
      customerName: 'Dr. Mahnoor Khan',
      phone: '0345-6677889',
      city: 'Rawalpindi',
      address: 'House 88, Sector C, Bahria Town Phase 4',
      deliveryDate: new Date().toISOString().split('T')[0],
      deliverySlot: 'standard',
      paymentMethod: 'easypaisa',
      discountAmount: 0,
      specialInstructions: 'Ring bell softly. Hand-deliver directly to recipient Dr. Mahnoor.'
    },
    items: [
      {
        id: 'item-demo-4',
        productId: 'tgg-jewelry-makeup-basket',
        title: 'Circular Vanity Jewelry & Makeup Hatbox',
        image: '/src/assets/images/tgg_jewelry_makeup_round_box_1790959683065.jpg',
        variantName: 'Medium',
        unitPrice: 6500,
        quantity: 1,
        recipientName: 'Dr. Mahnoor Khan',
        customizationNote: 'Four-leaf clover necklace set with velvet round hatbox.'
      }
    ],
    grandTotal: 6850,
    pointsEarned: 137
  },
  {
    orderId: 'TGG-92518',
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString(), // Yesterday
    status: 'delivered',
    statusNotes: 'Package hand-delivered successfully to recipient with signature and sealed greeting envelope.',
    riderName: 'Farhan Ali (Express Dispatch)',
    riderContact: '0312-3344556',
    details: {
      customerName: 'Natasha Malik',
      phone: '0333-5554321',
      city: 'Islamabad',
      address: 'Executive Apartments, Sector E-11/3',
      deliveryDate: new Date(Date.now() - 86400000).toISOString().split('T')[0],
      deliverySlot: 'standard',
      paymentMethod: 'bank_transfer',
      discountAmount: 0
    },
    items: [
      {
        id: 'item-demo-5',
        productId: 'tgg-watch-perfume',
        title: 'Watch & Perfume Luxury Hamper',
        image: '/src/assets/images/tgg_watch_perfume_luxury_box_1790959645361.jpg',
        variantName: 'Small',
        unitPrice: 8500,
        quantity: 1,
        recipientName: 'Zayd Malik',
        customizationNote: 'Congratulations on your graduation!'
      }
    ],
    grandTotal: 8850,
    pointsEarned: 177
  }
];

import React, { useState, useEffect } from 'react';
import { SavedOrder, OrderStatusStep } from '../types';
import { DEFAULT_ORDERS } from '../data/defaultOrders';
import { 
  Search, 
  X, 
  CheckCircle2, 
  Clock, 
  Package, 
  Truck, 
  Gift, 
  ShieldCheck, 
  MessageCircle, 
  Sparkles,
  ArrowRight,
  RefreshCw,
  MapPin,
  Calendar
} from 'lucide-react';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderId?: string;
  savedOrders: SavedOrder[];
}

// Built-in authentic sample orders for instant testing if user hasn't ordered yet
const SAMPLE_ORDERS: Record<string, SavedOrder> = {
  'TGG-48201': {
    orderId: 'TGG-48201',
    createdAt: '2026-10-01T14:30:00Z',
    status: 'out_for_delivery',
    statusNotes: 'Rider Muhammad Usman is on route in Gulberg, Lahore. ETA within standard slot (1:00 PM – 10:00 PM).',
    riderName: 'Muhammad Usman (Dispatch Rider #4)',
    riderContact: '0302-8877665',
    details: {
      customerName: 'Areeba Siddiqui',
      phone: '0321-4567890',
      city: 'Lahore',
      address: 'House #42-B, Main Boulevard, Gulberg III',
      deliveryDate: '2026-10-02',
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
    grandTotal: 13400
  },
  'TGG-61940': {
    orderId: 'TGG-61940',
    createdAt: '2026-10-02T08:15:00Z',
    status: 'handcrafting',
    statusNotes: 'Master artisan is tying emerald green ribbons and arranging Ferrero Rocher truffles.',
    details: {
      customerName: 'Bilal Ahmed',
      phone: '0300-9871234',
      city: 'Karachi',
      address: 'Villa 18, Khayaban-e-Shamsheer, DHA Phase 5',
      deliveryDate: '2026-10-03',
      deliverySlot: 'midnight',
      paymentMethod: 'jazzcash',
      discountAmount: 0
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
    grandTotal: 5250
  },
  'TGG-92518': {
    orderId: 'TGG-92518',
    createdAt: '2026-09-30T11:00:00Z',
    status: 'delivered',
    statusNotes: 'Delivered in hand to recipient with fresh flowers and greeting card.',
    riderName: 'Farhan Ali (Express Dispatch)',
    details: {
      customerName: 'Natasha Malik',
      phone: '0333-5554321',
      city: 'Islamabad',
      address: 'Street 14, Sector F-7/2',
      deliveryDate: '2026-10-01',
      deliverySlot: 'standard',
      paymentMethod: 'easypaisa',
      discountAmount: 420
    },
    items: [
      {
        id: 'item-demo-3',
        productId: 'tgg-jewelry-makeup-basket',
        title: 'Jewelry & Makeup Vanity Box',
        image: '/src/assets/images/tgg_jewelry_makeup_round_box_1790959683065.jpg',
        variantName: 'Medium',
        unitPrice: 4200,
        quantity: 1,
        recipientName: 'Alizeh Malik',
        customizationNote: '[Congratulations] Proud of your graduation achievement!'
      }
    ],
    grandTotal: 4130
  }
};

const STATUS_STEPS: {
  key: OrderStatusStep;
  label: string;
  subtitle: string;
  icon: React.ReactNode;
}[] = [
  {
    key: 'payment_verification',
    label: 'Payment Verified',
    subtitle: 'Advance payment confirmed via Bank / Mobile Wallet (Policy #6)',
    icon: <ShieldCheck className="w-4 h-4" />
  },
  {
    key: 'handcrafting',
    label: 'Studio Handcrafting',
    subtitle: 'Artisans hand-arranging items, ribbons, florals & keepsakes',
    icon: <Gift className="w-4 h-4" />
  },
  {
    key: 'quality_sealed',
    label: 'Wax Sealed & Ready',
    subtitle: 'Inspected, boxed, and sealed with our gold TGG wax crest',
    icon: <Package className="w-4 h-4" />
  },
  {
    key: 'out_for_delivery',
    label: 'Out with Rider',
    subtitle: 'Assigned to dedicated surprise rider for careful transit',
    icon: <Truck className="w-4 h-4" />
  },
  {
    key: 'delivered',
    label: 'Delivered & Celebrated',
    subtitle: 'Safely handed over to create unforgettable memories',
    icon: <CheckCircle2 className="w-4 h-4" />
  }
];

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  initialOrderId,
  savedOrders
}) => {
  const [searchInput, setSearchInput] = useState(initialOrderId || '');
  const [currentOrder, setCurrentOrder] = useState<SavedOrder | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Find order helper
  const findOrder = (id: string): SavedOrder | null => {
    const cleanId = id.trim().toUpperCase();
    if (!cleanId) return null;

    // 1. Search in user's placed orders
    const fromUser = savedOrders.find((o) => o.orderId.toUpperCase() === cleanId);
    if (fromUser) return fromUser;

    // 2. Search in built-in mock samples
    if (SAMPLE_ORDERS[cleanId]) return SAMPLE_ORDERS[cleanId];

    // 3. Fallback: generate a realistic simulated order on the fly for any valid TGG ID format!
    if (cleanId.startsWith('TGG-') || /^\d{5}$/.test(cleanId)) {
      const formattedId = cleanId.startsWith('TGG-') ? cleanId : `TGG-${cleanId}`;
      return {
        orderId: formattedId,
        createdAt: new Date().toISOString(),
        status: 'handcrafting',
        statusNotes: 'Studio team is procuring premium items and hand-scripting your calligraphy card.',
        details: {
          customerName: 'Valued TGG Client',
          phone: '0300-XXXXXXX',
          city: 'Karachi / Lahore / Islamabad',
          address: 'Confidential Client Delivery Address',
          deliveryDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          deliverySlot: 'standard',
          paymentMethod: 'bank_transfer',
          discountAmount: 0
        },
        items: [
          {
            id: `item-${formattedId}`,
            productId: 'tgg-watch-perfume',
            title: 'Watch & Perfume Luxury Hamper',
            image: '/src/assets/images/tgg_watch_perfume_luxury_box_1790959645361.jpg',
            variantName: 'Medium',
            unitPrice: 14500,
            quantity: 1,
            recipientName: 'Special Someone'
          }
        ],
        grandTotal: 14850
      };
    }

    return null;
  };

  const availableOrderIds = Array.from(
    new Set([
      ...savedOrders.map((o) => o.orderId),
      ...DEFAULT_ORDERS.map((o) => o.orderId),
      ...Object.keys(SAMPLE_ORDERS)
    ])
  ).slice(0, 6);

  useEffect(() => {
    if (isOpen) {
      if (initialOrderId) {
        setSearchInput(initialOrderId);
        const order = findOrder(initialOrderId);
        setCurrentOrder(order);
      } else if (savedOrders.length > 0) {
        // Default to latest placed order (first in array)
        const latest = savedOrders[0];
        setSearchInput(latest.orderId);
        setCurrentOrder(latest);
      } else {
        // Default to sample order for immediate preview
        setSearchInput('TGG-48201');
        setCurrentOrder(SAMPLE_ORDERS['TGG-48201']);
      }
    }
  }, [isOpen, initialOrderId, savedOrders]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    const match = findOrder(searchInput);
    if (match) {
      setCurrentOrder(match);
    } else {
      setErrorMsg(`No order found with ID "${searchInput}". Please check your order code (e.g. TGG-48201) or try one of the samples below.`);
    }
  };

  // Status simulation: cycle to next status for interactive testing
  const handleSimulateNextStatus = () => {
    if (!currentOrder) return;
    const stepOrder: OrderStatusStep[] = [
      'payment_verification',
      'handcrafting',
      'quality_sealed',
      'out_for_delivery',
      'delivered'
    ];
    const currentIndex = stepOrder.indexOf(currentOrder.status);
    const nextIndex = (currentIndex + 1) % stepOrder.length;
    const nextStatus = stepOrder[nextIndex];

    const updatedNotes: Record<OrderStatusStep, string> = {
      payment_verification: 'Advance payment screenshot submitted. Awaiting finance confirmation.',
      handcrafting: 'Active handcrafting in studio: wrapping ribbons, arranging florals & confectionery.',
      quality_sealed: 'Quality checked, sealed with gold wax crest, and staged for dispatch.',
      out_for_delivery: 'Rider is en route. Contact dispatch if address landmark details need updating.',
      delivered: 'Delivered in hand! Thank you for allowing us to share your moment.'
    };

    setCurrentOrder({
      ...currentOrder,
      status: nextStatus,
      statusNotes: updatedNotes[nextStatus]
    });
  };

  if (!isOpen) return null;

  const currentStepIndex = currentOrder
    ? STATUS_STEPS.findIndex((s) => s.key === currentOrder.status)
    : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-2xl border border-[#E8E1D5] shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-[#0A261D] text-white flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-widest text-[#E5CCA0] font-semibold">
              Live Order Dispatch
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">
              Track Your Gift Delivery
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#BED2C7] hover:text-white rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="space-y-3">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value.toUpperCase())}
                  placeholder="Enter your Order ID (e.g. TGG-48201)"
                  className="w-full pl-9 pr-4 py-2.5 text-xs font-mono bg-[#FAF8F5] border border-[#DCD5C8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A261D] tracking-wider"
                />
                <Search className="w-4 h-4 text-[#8E9B93] absolute left-3 top-3" />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0A261D] hover:bg-[#153B2F] rounded-md transition-colors cursor-pointer shadow-xs whitespace-nowrap"
              >
                Track Order
              </button>
            </div>

            {/* Quick Sample IDs / Active Queue */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#64746B]">
              <span className="text-[11px] font-semibold text-[#0A261D]">Live Queue:</span>
              {availableOrderIds.map((sampleId) => (
                <button
                  key={sampleId}
                  type="button"
                  onClick={() => {
                    setSearchInput(sampleId);
                    const found = findOrder(sampleId);
                    if (found) setCurrentOrder(found);
                    setErrorMsg('');
                  }}
                  className={`px-2 py-0.5 text-[11px] font-mono rounded border transition-colors cursor-pointer ${
                    currentOrder?.orderId === sampleId
                      ? 'bg-[#0A261D] text-[#DFC066] border-[#0A261D] font-bold'
                      : 'bg-[#F4EFE6] text-[#0A261D] border-[#DCD5C8] hover:border-[#0A261D]'
                  }`}
                >
                  {sampleId}
                </button>
              ))}
            </div>

            {errorMsg && (
              <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-md border border-red-200">
                {errorMsg}
              </p>
            )}
          </form>

          {/* Current Order View */}
          {currentOrder && (
            <div className="space-y-6 pt-2">
              {/* Order Status Banner */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E1D5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-[#0A261D]">
                      Order #{currentOrder.orderId}
                    </span>
                    <span className="text-xs text-[#64746B]">·</span>
                    <span className="text-xs text-[#64746B]">
                      Placed {new Date(currentOrder.createdAt).toLocaleDateString('en-PK', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-[#526359] flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#B89344]" />
                    <span>{currentOrder.details.city} · {currentOrder.details.address}</span>
                  </div>
                </div>

                {/* Simulation trigger */}
                <button
                  type="button"
                  onClick={handleSimulateNextStatus}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium text-[#0A261D] bg-white border border-[#DCD5C8] rounded-md hover:bg-[#F4EFE6] transition-colors shadow-2xs self-start sm:self-auto cursor-pointer"
                  title="Simulate dispatch progression"
                >
                  <RefreshCw className="w-3 h-3 text-[#B89344]" />
                  <span>Advance Status (Simulate)</span>
                </button>
              </div>

              {/* Progress Timeline Tracker */}
              <div className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0A261D]">
                  Delivery Progress Timeline
                </h3>

                <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#E8E1D5]">
                  {STATUS_STEPS.map((step, idx) => {
                    const isCompleted = idx <= currentStepIndex;
                    const isCurrent = idx === currentStepIndex;

                    return (
                      <div key={step.key} className="relative group">
                        {/* Status Node Circle */}
                        <div
                          className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                            isCurrent
                              ? 'bg-[#0A261D] text-[#DFBA6B] ring-4 ring-[#DFBA6B]/20 shadow-xs'
                              : isCompleted
                              ? 'bg-[#15573F] text-white'
                              : 'bg-white border-2 border-[#DCD5C8] text-[#8E9B93]'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-current" />
                          )}
                        </div>

                        {/* Status Content */}
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-semibold ${isCurrent ? 'text-[#0A261D]' : isCompleted ? 'text-[#15573F]' : 'text-[#8E9B93]'}`}>
                              {step.label}
                            </span>
                            {isCurrent && (
                              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm bg-[#0A261D] text-[#E5CCA0]">
                                Current Stage
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[#64746B] leading-relaxed">
                            {step.subtitle}
                          </p>
                          {isCurrent && currentOrder.statusNotes && (
                            <div className="mt-1.5 p-2.5 rounded-md bg-[#FAF8F5] border border-[#E8E1D5] text-[11px] text-[#405349] font-medium">
                              📢 {currentOrder.statusNotes}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Manifest & Rider Details */}
              <div className="pt-4 border-t border-[#E8E1D5] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Delivery Information */}
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E1D5] space-y-2">
                  <span className="text-[10px] uppercase font-semibold text-[#B89344] tracking-wider">
                    Scheduled Surprise Details
                  </span>
                  <div className="text-[#405349] space-y-1">
                    <div>
                      <span className="text-[#64746B]">Recipient:</span> <strong>{currentOrder.items[0]?.recipientName || currentOrder.details.customerName}</strong>
                    </div>
                    <div>
                      <span className="text-[#64746B]">Target Date:</span> <strong>{currentOrder.details.deliveryDate}</strong>
                    </div>
                    <div>
                      <span className="text-[#64746B]">Time Slot:</span>{' '}
                      <strong>
                        {currentOrder.details.deliverySlot === 'midnight'
                          ? '12:00 AM Midnight Birthday Surprise'
                          : 'Standard (1:00 PM – 10:00 PM)'}
                      </strong>
                    </div>
                    {currentOrder.riderName && (
                      <div className="pt-1 text-[#0A261D]">
                        <span className="text-[#64746B]">Rider:</span> {currentOrder.riderName}
                      </div>
                    )}
                  </div>
                </div>

                {/* Contents Brief */}
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E1D5] space-y-2">
                  <span className="text-[10px] uppercase font-semibold text-[#B89344] tracking-wider">
                    Hamper Contents
                  </span>
                  <div className="space-y-1.5">
                    {currentOrder.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-[#405349]">
                        <span className="truncate pr-2">· {item.title} ({item.variantName})</span>
                        <span className="font-mono tabular-nums shrink-0 font-medium">
                          PKR {(item.unitPrice * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-[#E8E1D5] flex justify-between font-bold text-[#0A261D]">
                      <span>Grand Total:</span>
                      <span className="font-mono tabular-nums">PKR {currentOrder.grandTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/923000000000?text=${encodeURIComponent(`Hi The Gifts Gallery! Inquiring on dispatch status of Order #${currentOrder.orderId}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 text-xs font-semibold text-white bg-[#0A261D] hover:bg-[#153B2F] rounded-md transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 text-[#DFBA6B]" />
                  <span>Contact Studio Dispatch on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="py-3 px-6 text-xs font-medium text-[#526359] hover:text-[#0A261D] bg-[#FAF8F5] rounded-md border border-[#DCD5C8]"
                >
                  Close Tracker
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

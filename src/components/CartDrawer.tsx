import React, { useState } from 'react';
import { CartItem, DeliveryDetails, UserProfile } from '../types';
import { X, Trash2, Plus, Minus, MessageCircle, ShieldCheck, Tag, AlertCircle, Sparkles, BellOff } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  currentUser?: UserProfile | null;
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onPlaceOrder: (details: DeliveryDetails, grandTotal: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  currentUser,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder
}) => {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState(currentUser?.username || '');
  const [phone, setPhone] = useState(currentUser?.phoneNumber || '');
  const [city, setCity] = useState(currentUser?.deliveryProfile?.city || 'Karachi');
  const [address, setAddress] = useState(
    currentUser?.deliveryProfile?.address
      ? `${currentUser.deliveryProfile.address}${currentUser.deliveryProfile.unit ? `, ${currentUser.deliveryProfile.unit}` : ''}`
      : ''
  );
  
  // Default delivery date: tomorrow or 2 days ahead
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 2);
  const defaultDateStr = defaultDate.toISOString().split('T')[0];
  const [deliveryDate, setDeliveryDate] = useState(defaultDateStr);

  const [deliverySlot, setDeliverySlot] = useState<'standard' | 'midnight'>('standard');
  const [specialInstructions, setSpecialInstructions] = useState(
    currentUser?.deliveryProfile?.riderCustomNote || ''
  );
  const [secretSurpriseNote, setSecretSurpriseNote] = useState(
    currentUser?.deliveryProfile?.secretSurpriseRiderNote ?? true
  );
  const [paymentMethod, setPaymentMethod] = useState<'bank_transfer' | 'jazzcash' | 'easypaisa'>('bank_transfer');
  
  // Promo code (auto VIP if premium)
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(
    currentUser?.isPremiumMember ? 'VIPGOLD15' : null
  );
  const [promoError, setPromoError] = useState('');
  const [policyAccepted, setPolicyAccepted] = useState(false);

  // Loyalty points redemption
  const availablePoints = currentUser?.loyaltyPoints || 0;
  const [redeemPoints, setRedeemPoints] = useState(false);

  const itemsSubtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  // Delivery fee calculation (Free midnight for Imperial Gold VIP!)
  const deliveryFee = currentUser?.isPremiumMember
    ? 0
    : deliverySlot === 'midnight'
    ? 750
    : 350;

  // Discount (15% for VIP, 10% for new customer code)
  const discountRate = appliedPromo === 'VIPGOLD15' ? 0.15 : appliedPromo ? 0.1 : 0;
  const discountAmount = Math.round(itemsSubtotal * discountRate);

  // Points Discount: 1 Point = 1 PKR
  const pointsToRedeem = Math.min(availablePoints, Math.max(0, itemsSubtotal - discountAmount));
  const pointsDiscountAmount = redeemPoints ? pointsToRedeem : 0;

  const grandTotal = Math.max(0, itemsSubtotal - discountAmount - pointsDiscountAmount + deliveryFee);

  // Points earned on this order (1 pt per 50 PKR, 1.5x for VIP)
  const pointsEarnedOnOrder = Math.floor(grandTotal / 50) * (currentUser?.isPremiumMember ? 1.5 : 1);

  const handleApplyPromo = () => {
    setPromoError('');
    const code = promoCodeInput.trim().toUpperCase();
    if (code === 'NEWTGG' || code === 'FIRSTGIFT' || code === 'TGG10') {
      setAppliedPromo(code);
      setPromoCodeInput('');
    } else {
      setPromoError('Invalid promo code. Try "NEWTGG" for new customer discount.');
    }
  };

  const handleWhatsAppCheckout = () => {
    if (!customerName || !phone || !address) {
      alert('Please fill in your name, phone number, and delivery address.');
      return;
    }
    if (!policyAccepted) {
      alert('Please acknowledge the 1-2 days notice and advance payment policy.');
      return;
    }

    const orderDetailsText = cartItems
      .map(
        (item, idx) =>
          `${idx + 1}. *${item.title}* (${item.variantName}) x${item.quantity} - PKR ${(item.unitPrice * item.quantity).toLocaleString()}${
            item.recipientName ? `\n   Recipient: ${item.recipientName}` : ''
          }${item.customizationNote ? `\n   Note: ${item.customizationNote}` : ''}`
      )
      .join('\n\n');

    const message = `*NEW ORDER - THE GIFTS GALLERY* 🎁✨\n--------------------------------\n*Customer Details:*\n👤 Name: ${customerName}\n📱 Phone: ${phone}\n📍 City: ${city}\n🏠 Address: ${address}\n📅 Date: ${deliveryDate}\n⏰ Slot: ${deliverySlot === 'midnight' ? '12:00 AM Midnight Surprise' : 'Standard (1:00 PM – 10:00 PM)'}\n--------------------------------\n*Ordered Hampers:*\n${orderDetailsText}\n--------------------------------\n💵 Subtotal: PKR ${itemsSubtotal.toLocaleString()}\n🚚 Delivery Fee: PKR ${deliveryFee.toLocaleString()} (${deliverySlot === 'midnight' ? 'Midnight Surge' : 'Standard'})${
      appliedPromo ? `\n🏷️ Discount (${appliedPromo}): -PKR ${discountAmount.toLocaleString()}` : ''
    }${
      pointsDiscountAmount > 0 ? `\n⭐ Loyalty Points Redeemed (${pointsDiscountAmount} pts): -PKR ${pointsDiscountAmount.toLocaleString()}` : ''
    }\n*TOTAL PAYABLE: PKR ${grandTotal.toLocaleString()}*\n🎁 Points to Earn on this Order: +${pointsEarnedOnOrder} Points\n--------------------------------\n💳 Payment Choice: ${paymentMethod.replace('_', ' ').toUpperCase()}\n📝 Instructions: ${specialInstructions || 'None'}\n\n✅ I have reviewed the Customer Policies (1-2 days notice & 100% advance payment). Ready to proceed with bank / wallet transfer!`;

    window.open(`https://wa.me/923000000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleInAppCheckout = () => {
    if (!customerName || !phone || !address) {
      alert('Please fill in your name, phone number, and delivery address.');
      return;
    }
    if (!policyAccepted) {
      alert('Please acknowledge the 1-2 days notice and advance payment policy.');
      return;
    }

    const details: DeliveryDetails = {
      customerName,
      phone,
      city,
      address,
      deliveryDate,
      deliverySlot,
      specialInstructions: secretSurpriseNote 
        ? `[Strict Secret Surprise - Do Not Call Before Arrival] ${specialInstructions}`.trim()
        : specialInstructions,
      paymentMethod,
      appliedPromo: appliedPromo || undefined,
      discountAmount,
      pointsRedeemed: pointsDiscountAmount,
      pointsDiscountAmount
    };

    onPlaceOrder(details, grandTotal);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E8E1D5] bg-[#FAF8F5] flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <h2 className="font-display text-xl font-semibold text-[#0A261D]">
              Your Shopping Bag
            </h2>
            <span className="text-xs text-[#64746B] tabular-nums">
              ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} items)
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#526359] hover:text-[#0A261D] rounded-full hover:bg-[#E8E1D5] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-6 flex-1 overflow-y-auto">
          {/* Cart Items List */}
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#E8E1D5] flex items-center justify-center mx-auto text-[#8E9B93]">
                🛍️
              </div>
              <p className="font-display text-lg text-[#0A261D]">Your shopping bag is empty</p>
              <p className="text-xs text-[#64746B]">
                Explore our curated hampers or create your bespoke gift box.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 text-xs font-semibold text-white bg-[#0A261D] rounded-md hover:bg-[#153B2F]"
              >
                Browse Collections
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-lg border border-[#E8E1D5] bg-[#FAF8F5] flex gap-3.5 items-start justify-between"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-md object-cover border border-[#E0D8CB] shrink-0"
                    />

                    <div className="flex-1 min-w-0 space-y-1">
                      <h4 className="text-xs font-semibold text-[#0A261D] truncate">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#64746B]">
                        Variant: {item.variantName}
                      </p>
                      {item.recipientName && (
                        <p className="text-[11px] text-[#0A261D] font-medium">
                          For: {item.recipientName}
                        </p>
                      )}
                      {item.customizationNote && (
                        <p className="text-[10px] text-[#526359] truncate italic">
                          {item.customizationNote}
                        </p>
                      )}

                      <div className="font-mono text-xs font-semibold text-[#0A261D] tabular-nums pt-1">
                        PKR {(item.unitPrice * item.quantity).toLocaleString()}
                      </div>
                    </div>

                    {/* Stepper & Trash */}
                    <div className="flex flex-col items-end justify-between h-16 shrink-0">
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#8E9B93] hover:text-red-700 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-1.5 bg-white border border-[#E0D8CB] rounded-md p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-[#F0EBE1] text-[#0A261D] rounded"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-medium px-1 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-[#F0EBE1] text-[#0A261D] rounded"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Details Form */}
              <div className="pt-4 border-t border-[#E8E1D5] space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0A261D]">
                    Delivery Information
                  </h3>
                  <span className="text-[10px] text-[#B89344] font-medium">
                    1-2 Days Notice Required
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-[#526359] mb-1">
                      Your Name / Sender *
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Daniyal Khan"
                      className="w-full text-xs px-3 py-2 bg-white border border-[#DCD5C8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A261D]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#526359] mb-1">
                      WhatsApp / Phone *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0300-1234567"
                      className="w-full text-xs px-3 py-2 bg-white border border-[#DCD5C8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A261D]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-[#526359] mb-1">
                      Destination City *
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-white border border-[#DCD5C8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A261D]"
                    >
                      <option value="Karachi">Karachi (Rider Hand-Delivery)</option>
                      <option value="Lahore">Lahore (Rider Hand-Delivery)</option>
                      <option value="Islamabad">Islamabad (Rider Hand-Delivery)</option>
                      <option value="Rawalpindi">Rawalpindi (Rider Hand-Delivery)</option>
                      <option value="Faisalabad">Faisalabad</option>
                      <option value="Multan">Multan</option>
                      <option value="Peshawar">Peshawar</option>
                      <option value="Sialkot">Sialkot</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Quetta">Quetta</option>
                      <option value="Other City">Other Cities (Express Courier)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#526359] mb-1">
                      Surprise Date *
                    </label>
                    <input
                      type="date"
                      value={deliveryDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-white border border-[#DCD5C8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A261D]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#526359] mb-1">
                    Complete Address & Landmark *
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House/Apartment #, Street, Block/Phase, Landmark"
                    className="w-full text-xs px-3 py-2 bg-white border border-[#DCD5C8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A261D]"
                  />
                </div>

                {/* Delivery Slot Choice */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#0A261D] mb-1.5">
                    Select Delivery Slot (Policy #2 & #3)
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setDeliverySlot('standard')}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        deliverySlot === 'standard'
                          ? 'border-[#0A261D] bg-[#0A261D] text-white'
                          : 'border-[#E8E1D5] bg-white text-[#526359]'
                      }`}
                    >
                      <div className="font-semibold">Standard Slot</div>
                      <div className="text-[10px] opacity-80">1:00 PM – 10:00 PM</div>
                      <div className="mt-1 font-mono text-[11px] tabular-nums font-bold">PKR 350</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliverySlot('midnight')}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        deliverySlot === 'midnight'
                          ? 'border-[#0A261D] bg-[#0A261D] text-white'
                          : 'border-[#E8E1D5] bg-white text-[#526359]'
                      }`}
                    >
                      <div className="font-semibold flex items-center gap-1">
                        <span>12 AM Midnight</span>
                        <Sparkles className="w-3 h-3 text-[#DFBA6B]" />
                      </div>
                      <div className="text-[10px] opacity-80">Special Birthday Surprise</div>
                      <div className="mt-1 font-mono text-[11px] tabular-nums font-bold">PKR 750</div>
                    </button>
                  </div>
                </div>

                {/* Promo Code Input */}
                <div className="pt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value)}
                      placeholder="Promo code (e.g. NEWTGG)"
                      className="flex-1 text-xs px-3 py-1.5 bg-white border border-[#DCD5C8] rounded-md uppercase"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-3 py-1.5 text-xs font-semibold bg-[#F4EFE6] text-[#0A261D] hover:bg-[#E8E1D5] rounded-md border border-[#DCD5C8]"
                    >
                      Apply
                    </button>
                  </div>
                  {appliedPromo && (
                    <p className="text-[11px] text-emerald-700 font-medium mt-1">
                      ✓ Promo "{appliedPromo}" applied! 10% New Customer Discount.
                    </p>
                  )}
                  {promoError && (
                    <p className="text-[11px] text-red-600 mt-1">{promoError}</p>
                  )}
                </div>

                {/* Loyalty Points Redemption Widget */}
                {currentUser && availablePoints > 0 && (
                  <div className="pt-2">
                    <div className="p-3 bg-[#FAF7F0] border border-[#DFBA6B]/40 rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#14382C]">
                          <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
                          <span>Prestige Loyalty Rewards</span>
                        </div>
                        <span className="text-[11px] font-mono font-bold text-[#C59B27]">
                          {availablePoints} pts (= PKR {availablePoints})
                        </span>
                      </div>

                      <label className="flex items-center justify-between text-xs text-[#405349] cursor-pointer pt-1 border-t border-[#DFBA6B]/20">
                        <span className="font-medium">
                          Redeem {pointsToRedeem} points for PKR {pointsToRedeem} off
                        </span>
                        <input
                          type="checkbox"
                          checked={redeemPoints}
                          onChange={(e) => setRedeemPoints(e.target.checked)}
                          className="w-4 h-4 text-[#14382C] rounded focus:ring-[#14382C] cursor-pointer"
                        />
                      </label>
                      {redeemPoints && (
                        <p className="text-[11px] text-emerald-700 font-semibold">
                          ✓ Points discount of -PKR {pointsToRedeem.toLocaleString()} applied!
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Mandatory Policy Agreement Checkbox */}
                <div className="pt-3 border-t border-[#E8E1D5]">
                  <label className="flex items-start gap-2 text-xs text-[#405349] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={policyAccepted}
                      onChange={(e) => setPolicyAccepted(e.target.checked)}
                      className="mt-0.5 rounded text-[#0A261D] focus:ring-[#0A261D]"
                    />
                    <span>
                      I understand and agree to <strong>1-2 days advance notice</strong> (Policy #1) and that <strong>100% advance payment</strong> via Bank Transfer/JazzCash/EasyPaisa is required before preparation (Policy #6).
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer / Summary Actions */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-[#E8E1D5] bg-[#FAF8F5] space-y-3 sticky bottom-0 z-10">
            {/* Breakdown */}
            <div className="space-y-1.5 text-xs text-[#526359]">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-mono tabular-nums">PKR {itemsSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge ({deliverySlot === 'midnight' ? '12 AM Midnight' : 'Standard'}):</span>
                <span className="font-mono tabular-nums">PKR {deliveryFee.toLocaleString()}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>New Customer Discount:</span>
                  <span className="font-mono tabular-nums">-PKR {discountAmount.toLocaleString()}</span>
                </div>
              )}
              {pointsDiscountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#C59B27]" />
                    <span>Prestige Points Redeemed ({pointsDiscountAmount} pts):</span>
                  </span>
                  <span className="font-mono tabular-nums">-PKR {pointsDiscountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-[#0A261D] pt-1 border-t border-[#E8E1D5]">
                <span>Total Amount:</span>
                <span className="font-mono tabular-nums">PKR {grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Points Earning Highlight */}
            {currentUser && (
              <div className="text-[11px] text-[#14382C] bg-[#FAF7F0] border border-[#DFBA6B]/40 px-3 py-1.5 rounded-md flex items-center justify-between font-medium">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>Points you'll earn on this order:</span>
                </span>
                <span className="font-mono font-bold text-[#C59B27] tabular-nums">
                  +{pointsEarnedOnOrder} Points
                </span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              <button
                type="button"
                onClick={handleWhatsAppCheckout}
                className="w-full py-3 px-4 text-xs font-semibold text-white bg-[#0A261D] hover:bg-[#153B2F] rounded-md transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#DFBA6B]" />
                <span>Send Order to WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleInAppCheckout}
                className="w-full py-3 px-4 text-xs font-semibold text-[#0A261D] bg-[#DFBA6B] hover:bg-[#F2DEB0] rounded-md transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-[#0A261D]" />
                <span>Confirm & Pay Advance</span>
              </button>
            </div>

            <p className="text-[10px] text-center text-[#8E9B93]">
              No refunds after dispatch · Bank Transfer / JazzCash / EasyPaisa accepted
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

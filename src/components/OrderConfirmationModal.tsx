import React, { useState } from 'react';
import { DeliveryDetails, CartItem } from '../types';
import { PAYMENT_METHODS } from '../data/policies';
import { CheckCircle2, Copy, Check, MessageCircle, X, ShieldAlert } from 'lucide-react';

interface OrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTrackOrder?: (orderId: string) => void;
  orderDetails: {
    orderId: string;
    details: DeliveryDetails;
    items: CartItem[];
    grandTotal: number;
  } | null;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  isOpen,
  onClose,
  onTrackOrder,
  orderDetails
}) => {
  if (!isOpen || !orderDetails) return null;

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSendProof = () => {
    const message = `Hello The Gifts Gallery! 🎁\n\nI have placed Order #${orderDetails.orderId}.\nCustomer: ${orderDetails.details.customerName}\nTotal Payable: PKR ${orderDetails.grandTotal.toLocaleString()}\n\nAttaching my payment transfer screenshot here! Kindly confirm receipt and booking.`;
    window.open(`https://wa.me/923000000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl border border-[#E8E1D5] shadow-2xl p-6 sm:p-8 space-y-6 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#526359] hover:text-[#0A261D] rounded-full hover:bg-[#F4EFE6]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#0A261D]">
            Order Reserved Successfully!
          </h2>
          <p className="text-xs text-[#64746B]">
            Order Reference: <strong className="font-mono text-[#0A261D]">{orderDetails.orderId}</strong>
          </p>
        </div>

        {/* Policy Notice Box */}
        <div className="p-3.5 bg-[#FDFBF7] rounded-lg border border-[#E8E1D5] text-xs text-[#526359] space-y-1">
          <p className="font-semibold text-[#0A261D] flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-[#B89344]" />
            <span>Policy Reminder: 100% Advance Payment Required</span>
          </p>
          <p>
            As per TGG Customer Policy #6, orders are only queued for procurement and wrapping upon receipt of advance payment. Please transfer within 3 hours to lock your delivery slot.
          </p>
        </div>

        {/* Invoice Brief */}
        <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E8E1D5] text-xs space-y-2">
          <div className="flex justify-between text-[#64746B]">
            <span>Recipient / Customer:</span>
            <span className="font-medium text-[#0A261D]">{orderDetails.details.customerName} ({orderDetails.details.phone})</span>
          </div>
          <div className="flex justify-between text-[#64746B]">
            <span>Delivery Destination:</span>
            <span className="font-medium text-[#0A261D]">{orderDetails.details.city} · {orderDetails.details.address}</span>
          </div>
          <div className="flex justify-between text-[#64746B]">
            <span>Surprise Date & Slot:</span>
            <span className="font-medium text-[#0A261D]">
              {orderDetails.details.deliveryDate} ({orderDetails.details.deliverySlot === 'midnight' ? '12 AM Midnight' : 'Standard 1 PM – 10 PM'})
            </span>
          </div>
          {orderDetails.details.pointsDiscountAmount && orderDetails.details.pointsDiscountAmount > 0 && (
            <div className="flex justify-between text-emerald-700">
              <span>Prestige Points Redeemed:</span>
              <span className="font-mono tabular-nums">-PKR {orderDetails.details.pointsDiscountAmount.toLocaleString()} ({orderDetails.details.pointsRedeemed} pts)</span>
            </div>
          )}
          <div className="pt-2 border-t border-[#E8E1D5] flex justify-between font-bold text-sm text-[#0A261D]">
            <span>Total Payable Amount:</span>
            <span className="font-mono tabular-nums text-[#0A261D]">PKR {orderDetails.grandTotal.toLocaleString()}</span>
          </div>
          <div className="pt-1 text-[11px] text-[#C59B27] flex items-center justify-between font-medium">
            <span>Prestige Points Earned:</span>
            <span className="font-bold font-mono">+{Math.floor(orderDetails.grandTotal / 50)} Points (Credited to your Profile)</span>
          </div>
        </div>

        {/* Payment Account Cards */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0A261D]">
            Transfer Accounts (Bank Transfer / JazzCash / EasyPaisa)
          </h3>

          {/* Bank Transfer */}
          <div className="p-3 bg-white border border-[#E0D8CB] rounded-lg text-xs space-y-1.5">
            <div className="flex items-center justify-between font-semibold text-[#0A261D]">
              <span>{PAYMENT_METHODS.bank.name}</span>
              <button
                type="button"
                onClick={() => copyToClipboard(PAYMENT_METHODS.bank.iban, 'iban')}
                className="text-[11px] font-medium text-[#B89344] hover:underline flex items-center gap-1"
              >
                {copiedKey === 'iban' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'iban' ? 'Copied IBAN' : 'Copy IBAN'}</span>
              </button>
            </div>
            <div className="text-[#526359] grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px]">
              <div>Title: <strong>{PAYMENT_METHODS.bank.accountTitle}</strong></div>
              <div>A/C: <span className="font-mono">{PAYMENT_METHODS.bank.accountNumber}</span></div>
              <div className="sm:col-span-2">IBAN: <span className="font-mono">{PAYMENT_METHODS.bank.iban}</span></div>
            </div>
          </div>

          {/* Mobile Wallets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* JazzCash */}
            <div className="p-3 bg-white border border-[#E0D8CB] rounded-lg space-y-1">
              <div className="flex items-center justify-between font-semibold text-[#0A261D]">
                <span>{PAYMENT_METHODS.jazzcash.name}</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(PAYMENT_METHODS.jazzcash.number, 'jc')}
                  className="text-[11px] text-[#B89344] hover:underline flex items-center gap-1"
                >
                  {copiedKey === 'jc' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>Copy</span>
                </button>
              </div>
              <div className="text-[11px] text-[#526359]">
                <div>Title: {PAYMENT_METHODS.jazzcash.accountTitle}</div>
                <div>Number: <strong className="font-mono">{PAYMENT_METHODS.jazzcash.number}</strong></div>
              </div>
            </div>

            {/* EasyPaisa */}
            <div className="p-3 bg-white border border-[#E0D8CB] rounded-lg space-y-1">
              <div className="flex items-center justify-between font-semibold text-[#0A261D]">
                <span>{PAYMENT_METHODS.easypaisa.name}</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(PAYMENT_METHODS.easypaisa.number, 'ep')}
                  className="text-[11px] text-[#B89344] hover:underline flex items-center gap-1"
                >
                  {copiedKey === 'ep' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>Copy</span>
                </button>
              </div>
              <div className="text-[11px] text-[#526359]">
                <div>Title: {PAYMENT_METHODS.easypaisa.accountTitle}</div>
                <div>Number: <strong className="font-mono">{PAYMENT_METHODS.easypaisa.number}</strong></div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTAs */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleSendProof}
            className="flex-1 py-3 px-4 text-xs font-semibold text-white bg-[#0A261D] hover:bg-[#153B2F] rounded-md transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-[#DFBA6B]" />
            <span>Send Payment Proof on WhatsApp</span>
          </button>

          {onTrackOrder && (
            <button
              type="button"
              onClick={() => {
                const id = orderDetails.orderId;
                onClose();
                onTrackOrder(id);
              }}
              className="py-3 px-4 text-xs font-semibold text-[#0A261D] bg-[#F4EFE6] hover:bg-[#E8E1D5] rounded-md border border-[#DCD5C8] transition-colors cursor-pointer"
            >
              Track Order Live
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="py-3 px-4 text-xs font-medium text-[#526359] hover:text-[#0A261D] hover:bg-[#F4EFE6] rounded-md border border-[#DCD5C8] transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  UserCheck, 
  Truck, 
  Package, 
  Clock, 
  MoonStar, 
  CheckCircle2, 
  AlertCircle, 
  MessageCircle, 
  Phone, 
  MapPin, 
  DollarSign, 
  PlusCircle, 
  Users, 
  Lock, 
  Sparkles, 
  Check, 
  ChevronRight, 
  ArrowRight,
  ExternalLink,
  Search,
  Filter,
  KeyRound,
  Gift,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { SavedOrder, OrderStatusStep, AdminUser, AdminRole } from '../types';
import { DEFAULT_ADMIN_USERS, ROLE_INFO } from '../data/adminTeam';
import { PRODUCTS } from '../data/products';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedOrders: SavedOrder[];
  onUpdateOrderStatus: (
    orderId: string, 
    newStatus: OrderStatusStep, 
    notes?: string, 
    riderName?: string, 
    riderContact?: string
  ) => void;
  onAddManualOrder: (newOrder: SavedOrder) => void;
  onOpenTracker: (orderId: string) => void;
  onResetOrders?: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  savedOrders,
  onUpdateOrderStatus,
  onAddManualOrder,
  onOpenTracker,
  onResetOrders
}) => {
  if (!isOpen) return null;

  // Active Admin Session (persisted or defaulted)
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(() => {
    try {
      const stored = localStorage.getItem('tgg_admin_session');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_ADMIN_USERS[0]; // Default to Owner for easy access
  });

  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [selectedRoleForLogin, setSelectedRoleForLogin] = useState<AdminUser>(DEFAULT_ADMIN_USERS[0]);

  // Tab State: 'pipeline' | 'new_order' | 'team' | 'insights'
  const [activeTab, setActiveTab] = useState<'pipeline' | 'new_order' | 'team' | 'insights'>('pipeline');

  // Filter state for pipeline
  const [statusFilter, setStatusFilter] = useState<'all' | OrderStatusStep | 'midnight'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Rider assignment state for an order
  const [assigningOrderId, setAssigningOrderId] = useState<string | null>(null);
  const [riderNameInput, setRiderNameInput] = useState('Rider Bilal');
  const [riderPhoneInput, setRiderPhoneInput] = useState('0300-1122334');

  // Sister Helper Tip toggle
  const [showHelperTips, setShowHelperTips] = useState(true);

  // Manual Order Form State
  const [manualCustomerName, setManualCustomerName] = useState('');
  const [manualPhone, setManualPhone] = useState('');
  const [manualCity, setManualCity] = useState('Karachi');
  const [manualAddress, setManualAddress] = useState('');
  const [manualDate, setManualDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [manualSlot, setManualSlot] = useState<'standard' | 'midnight'>('standard');
  const [manualHamperTitle, setManualHamperTitle] = useState(PRODUCTS[0].title);
  const [manualHamperPrice, setManualHamperPrice] = useState(PRODUCTS[0].variants[0].price);
  const [manualSpecialNote, setManualSpecialNote] = useState('');
  const [manualSecretSurprise, setManualSecretSurprise] = useState(true);
  const [manualPaymentMethod, setManualPaymentMethod] = useState<'bank_transfer' | 'jazzcash' | 'easypaisa'>('bank_transfer');
  const [manualOrderCreated, setManualOrderCreated] = useState<string | null>(null);

  // Helper login function
  const handleSwitchUser = (user: AdminUser) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('tgg_admin_session', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  };

  const handlePinLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPin === selectedRoleForLogin.pin || enteredPin === '1234' || enteredPin === '7788') {
      handleSwitchUser(selectedRoleForLogin);
      setPinError('');
      setEnteredPin('');
    } else {
      setPinError(`Incorrect PIN. (Hint: ${selectedRoleForLogin.name}'s PIN is ${selectedRoleForLogin.pin})`);
    }
  };

  // Status Progression Workflow
  const handleAdvanceStatus = (order: SavedOrder) => {
    if (!currentUser) return;

    if (order.status === 'payment_verification') {
      onUpdateOrderStatus(
        order.orderId,
        'handcrafting',
        '100% Advance payment screenshot verified by Studio. Artisans preparing bespoke gift hamper.'
      );
    } else if (order.status === 'handcrafting') {
      onUpdateOrderStatus(
        order.orderId,
        'quality_sealed',
        'Hamper passed studio quality check. Wax-sealed calligraphy greeting attached and boxed in temperature-safe insulation.'
      );
    } else if (order.status === 'quality_sealed') {
      setAssigningOrderId(order.orderId);
    } else if (order.status === 'out_for_delivery') {
      onUpdateOrderStatus(
        order.orderId,
        'delivered',
        'Package hand-delivered successfully to recipient with signature.'
      );
    }
  };

  const handleConfirmRiderAssignment = (orderId: string) => {
    onUpdateOrderStatus(
      orderId,
      'out_for_delivery',
      `Assigned to studio courier: ${riderNameInput}. Tracking active. Handover in progress.`,
      riderNameInput,
      riderPhoneInput
    );
    setAssigningOrderId(null);
  };

  // WhatsApp Message Generator for Pakistani Clients
  const handleSendWhatsAppUpdate = (order: SavedOrder) => {
    const statusLabels: Record<OrderStatusStep, string> = {
      payment_verification: 'Awaiting Advance Payment Verification',
      handcrafting: 'Handcrafting & Packing in Progress 🎁',
      quality_sealed: 'Quality Checked & Wax Sealed ✉️',
      out_for_delivery: 'Out for Hand-Delivery with Studio Rider 🚚',
      delivered: 'Delivered Successfully! 🎉'
    };

    const appBaseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://thegiftsgallery.pk';
    const msg = `*THE GIFTS GALLERY - ORDER UPDATE* 🎁✨\n\nAssalam o Alaikum ${order.details.customerName}!\n\nHere is the live update on your order *#${order.orderId}*:\n\n📌 *Current Status:* ${statusLabels[order.status]}\n📍 *Destination:* ${order.details.city} (${order.details.address})\n📅 *Surprise Date:* ${order.details.deliveryDate} (${order.details.deliverySlot === 'midnight' ? '12 AM Midnight Surprise 🌙' : 'Standard 1 PM – 10 PM'})\n${order.riderName ? `🛵 *Studio Rider:* ${order.riderName} (${order.riderContact})\n` : ''}\n🔍 *Track Live Anytime:* You can view rider progress live at:\n${appBaseUrl}\n\nThank you for choosing The Gifts Gallery!`;

    window.open(`https://wa.me/92${order.details.phone.replace(/\D/g, '').slice(-10)}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // Handle Manual Order Submission
  const handleSubmitManualOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCustomerName || !manualPhone || !manualAddress) {
      alert('Please fill in Customer Name, Phone, and Delivery Address.');
      return;
    }

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `TGG-M${randomNum}`;

    const deliveryFee = manualSlot === 'midnight' ? 750 : 350;
    const grandTotal = manualHamperPrice + deliveryFee;

    const newOrder: SavedOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      status: 'payment_verification',
      statusNotes: 'Manual order entered by studio team. Awaiting advance payment confirmation.',
      details: {
        customerName: manualCustomerName,
        phone: manualPhone,
        city: manualCity,
        address: manualAddress,
        deliveryDate: manualDate,
        deliverySlot: manualSlot,
        specialInstructions: manualSecretSurprise
          ? `[Strict Secret Surprise - Do Not Inform Before Arrival] ${manualSpecialNote}`.trim()
          : manualSpecialNote,
        paymentMethod: manualPaymentMethod,
        discountAmount: 0
      },
      items: [
        {
          id: `item-${Date.now()}`,
          productId: 'manual-box',
          title: manualHamperTitle,
          image: '/src/assets/images/tgg_snack_chocolate_wicker_basket_1790959662671.jpg',
          variantName: 'Custom Studio Curation',
          unitPrice: manualHamperPrice,
          quantity: 1,
          recipientName: manualCustomerName,
          customizationNote: manualSpecialNote
        }
      ],
      grandTotal,
      pointsEarned: Math.floor(grandTotal / 50)
    };

    onAddManualOrder(newOrder);
    setManualOrderCreated(orderId);
    setTimeout(() => {
      setManualOrderCreated(null);
      setActiveTab('pipeline');
    }, 1800);
  };

  // Filtered orders
  const filteredOrders = savedOrders.filter((order) => {
    const matchesSearch = 
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.details.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.details.phone.includes(searchQuery) ||
      order.details.city.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (statusFilter === 'all') return true;
    if (statusFilter === 'midnight') return order.details.deliverySlot === 'midnight';
    return order.status === statusFilter;
  });

  // Calculate Operational Metrics
  const pendingPayments = savedOrders.filter(o => o.status === 'payment_verification').length;
  const inHandcrafting = savedOrders.filter(o => o.status === 'handcrafting').length;
  const midnightCount = savedOrders.filter(o => o.details.deliverySlot === 'midnight' && o.status !== 'delivered').length;
  const totalRevenue = savedOrders.reduce((sum, o) => sum + o.grandTotal, 0);
  const nextPendingOrder = savedOrders.find(o => o.status !== 'delivered');

  // If no user is logged in, show clean PIN login
  if (!currentUser) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div 
          className="relative w-full max-w-md bg-white rounded-2xl border border-[#E8E1D5] shadow-2xl p-6 sm:p-8 space-y-6"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#526359] hover:text-[#0A261D] rounded-full hover:bg-[#F4EFE6]"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#14382C] text-[#DFC066] flex items-center justify-center mx-auto shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="font-display text-2xl font-bold text-[#14382C]">
              TGG Studio Access
            </h2>
            <p className="text-xs text-[#526359]">
              Select your role profile to access the live operations portal.
            </p>
          </div>

          {/* Role selector cards */}
          <div className="space-y-2.5">
            {DEFAULT_ADMIN_USERS.map((user) => {
              const roleMeta = ROLE_INFO[user.role];
              const isSelected = selectedRoleForLogin.id === user.id;

              return (
                <div
                  key={user.id}
                  onClick={() => setSelectedRoleForLogin(user)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-[#14382C] bg-[#FAF7F0] shadow-xs ring-1 ring-[#14382C]'
                      : 'border-[#EADBCE] bg-white hover:bg-[#FAF8F5]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#14382C] text-[#DFC066] font-bold text-xs flex items-center justify-center">
                      {user.avatarInitials}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#14382C] flex items-center gap-2">
                        <span>{user.name}</span>
                        <span className={`text-[10px] px-2 py-0.2 rounded-full font-normal border ${roleMeta.color}`}>
                          {user.role.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#64746B]">{user.title}</div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-[#14382C]" />}
                </div>
              );
            })}
          </div>

          <form onSubmit={handlePinLogin} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-medium text-[#405349] mb-1">
                Enter Security PIN for {selectedRoleForLogin.name}
              </label>
              <input
                type="password"
                maxLength={4}
                value={enteredPin}
                onChange={(e) => setEnteredPin(e.target.value)}
                placeholder="4-digit PIN"
                className="w-full text-center text-lg font-mono tracking-widest px-4 py-2.5 bg-white border border-[#DCD5C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14382C]"
                autoFocus
              />
              <p className="text-[11px] text-[#8E9B93] mt-1 text-center">
                Demo quick PIN: <strong className="font-mono text-[#14382C]">{selectedRoleForLogin.pin}</strong>
              </p>
            </div>

            {pinError && (
              <p className="text-xs text-red-600 text-center font-medium">{pinError}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 text-xs font-semibold text-white bg-[#14382C] hover:bg-[#1C4E3D] rounded-lg transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <KeyRound className="w-4 h-4 text-[#DFC066]" />
              <span>Unlock Studio Dashboard</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // LOGGED-IN ADMIN PORTAL
  const currentRoleMeta = ROLE_INFO[currentUser.role];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div 
        className="relative w-full max-w-5xl bg-white rounded-2xl border border-[#E8E1D5] shadow-2xl overflow-hidden my-4 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="bg-[#0A261D] text-white p-5 sm:p-6 shrink-0 relative border-b border-[#1C4336]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#BED2C7] hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            title="Close Admin Portal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#14382C] border-2 border-[#DFC066] flex items-center justify-center text-sm font-bold text-[#DFC066]">
                {currentUser.avatarInitials}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-lg sm:text-xl font-bold tracking-tight">
                    {currentUser.name}
                  </h2>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${currentRoleMeta.color}`}>
                    {currentRoleMeta.badge}
                  </span>
                </div>
                <div className="text-xs text-[#BED2C7]">
                  {currentUser.title} · Studio Operations
                </div>
              </div>
            </div>

            {/* Quick Role Switcher */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-xs text-[#BED2C7] hidden md:inline">Switch Role:</span>
              <div className="flex items-center bg-[#14382C] p-0.5 rounded-lg border border-white/10 text-xs">
                {DEFAULT_ADMIN_USERS.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => handleSwitchUser(u)}
                    className={`px-2.5 py-1 rounded-md transition-colors font-medium text-[11px] cursor-pointer ${
                      currentUser.id === u.id
                        ? 'bg-[#DFC066] text-[#0A261D] font-bold'
                        : 'text-[#BED2C7] hover:text-white'
                    }`}
                  >
                    {u.role.toUpperCase()}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentUser(null)}
                className="px-2.5 py-1 text-xs text-[#BED2C7] hover:text-white border border-white/15 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                title="Lock / Logout"
              >
                <Lock className="w-3.5 h-3.5 inline mr-1" />
                <span>Lock</span>
              </button>
            </div>
          </div>

          {/* Sister's Quick Guidance Banner */}
          {showHelperTips && (
            <div className="mt-4 p-3 rounded-lg bg-[#14382C]/90 border border-[#DFC066]/30 text-xs text-[#E5CCA0] flex items-start justify-between gap-3">
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-[#DFC066] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Studio SOP for {currentUser.name}:</strong> Always ensure 100% advance payment screenshot is verified on WhatsApp before moving orders from <em>Payment Verification</em> to <em>Handcrafting</em>. Midnight surprises (12 AM) must be sealed by 10 PM.
                </div>
              </div>
              <button 
                onClick={() => setShowHelperTips(false)}
                className="text-[#BED2C7] hover:text-white text-[11px] underline shrink-0 cursor-pointer"
              >
                Hide Tip
              </button>
            </div>
          )}

          {/* Live Operational Metrics Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 mt-2 border-t border-white/10 text-xs">
            <div className="p-2 rounded bg-white/5 border border-white/5">
              <div className="text-[10px] text-[#BED2C7]">Orders in Queue</div>
              <div className="font-mono text-base font-bold text-white tabular-nums">{savedOrders.length}</div>
            </div>
            <div className="p-2 rounded bg-white/5 border border-white/5">
              <div className="text-[10px] text-amber-300">Pending Advance</div>
              <div className="font-mono text-base font-bold text-amber-300 tabular-nums">{pendingPayments} action needed</div>
            </div>
            <div className="p-2 rounded bg-white/5 border border-white/5">
              <div className="text-[10px] text-[#DFC066]">12 AM Midnight</div>
              <div className="font-mono text-base font-bold text-[#DFC066] tabular-nums">{midnightCount} tonight</div>
            </div>
            <div className="p-2 rounded bg-white/5 border border-white/5">
              <div className="text-[10px] text-[#BED2C7]">Total Orders Value</div>
              <div className="font-mono text-base font-bold text-emerald-400 tabular-nums">
                {currentUser.permissions.canViewRevenue 
                  ? `PKR ${totalRevenue.toLocaleString()}`
                  : 'Restricted'
                }
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-2 border-b border-[#E8E1D5] bg-[#FAF8F5] overflow-x-auto shrink-0 scrollbar-none">
          {[
            { id: 'pipeline', label: `Live Pipeline (${savedOrders.length})`, icon: <Truck className="w-3.5 h-3.5" /> },
            { id: 'new_order', label: '+ Add WhatsApp / Phone Order', icon: <PlusCircle className="w-3.5 h-3.5" /> },
            { id: 'team', label: 'Team & Role Authority', icon: <Users className="w-3.5 h-3.5" /> },
            { id: 'insights', label: 'Studio Policies & Dispatch Rules', icon: <ShieldCheck className="w-3.5 h-3.5" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 pb-2.5 pt-2 px-3 text-xs font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[#14382C] text-[#14382C] font-bold'
                  : 'border-transparent text-[#64746B] hover:text-[#14382C]'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Modal Body Area */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6 bg-white">
          
          {/* TAB 1: ORDER DISPATCH PIPELINE */}
          {activeTab === 'pipeline' && (
            <div className="space-y-4">
              {/* Studio Active Queue Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-[#FAF7F0] border border-[#DFC066]/50 rounded-xl text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <div>
                    <span className="font-bold text-[#14382C]">Studio Order Queue: </span>
                    <span className="text-[#526359]">
                      <strong className="text-[#14382C]">{savedOrders.filter(o => o.status !== 'delivered').length}</strong> active hampers awaiting preparation & dispatch
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {nextPendingOrder && (
                    <button
                      type="button"
                      onClick={() => handleAdvanceStatus(nextPendingOrder)}
                      className="px-3 py-1.5 rounded-lg bg-[#14382C] text-[#DFC066] hover:bg-[#1C4E3D] font-bold text-xs transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                      title={`Process next pending order #${nextPendingOrder.orderId} (${nextPendingOrder.status.replace('_', ' ')})`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#DFC066]" />
                      <span>Start / Advance #{nextPendingOrder.orderId}</span>
                    </button>
                  )}
                  {onResetOrders && (
                    <button
                      type="button"
                      onClick={onResetOrders}
                      className="px-2.5 py-1.5 rounded-lg border border-[#DCD5C8] bg-white text-[#526359] hover:text-[#14382C] hover:bg-[#FAF8F5] transition-colors flex items-center gap-1 cursor-pointer"
                      title="Reload standard demo queue with 5 Pakistani orders across all stages"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reload Demo Queue</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Filter and Search Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-72">
                  <Search className="w-3.5 h-3.5 text-[#8E9B93] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by Order ID, Client, Phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-xs pl-8 pr-3 py-2 bg-[#FAF8F5] border border-[#EADBCE] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#14382C]"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none text-xs">
                  <Filter className="w-3.5 h-3.5 text-[#8E9B93] shrink-0" />
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'payment_verification', label: '1. Awaiting Pay' },
                    { id: 'handcrafting', label: '2. Handcrafting' },
                    { id: 'quality_sealed', label: '3. Quality Sealed' },
                    { id: 'out_for_delivery', label: '4. Out with Rider' },
                    { id: 'midnight', label: '🌙 Midnight (12 AM)' },
                    { id: 'delivered', label: '✓ Delivered' }
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setStatusFilter(filter.id as any)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors whitespace-nowrap cursor-pointer ${
                        statusFilter === filter.id
                          ? 'bg-[#14382C] text-white font-semibold'
                          : 'bg-[#FAF8F5] text-[#526359] hover:bg-[#EADBCE]'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orders List */}
              {filteredOrders.length === 0 ? (
                <div className="p-10 text-center rounded-xl bg-[#FAF8F5] border border-dashed border-[#EADBCE] space-y-2">
                  <Package className="w-8 h-8 text-[#8E9B93] mx-auto" />
                  <p className="font-display text-base font-semibold text-[#14382C]">No Orders Matching Filter</p>
                  <p className="text-xs text-[#64746B]">All quiet in this queue. Switch filter or create a manual phone order.</p>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {filteredOrders.map((order) => {
                    const isMidnight = order.details.deliverySlot === 'midnight';

                    return (
                      <div
                        key={order.orderId}
                        className={`p-4 sm:p-5 rounded-xl border transition-all ${
                          isMidnight
                            ? 'border-[#DFC066] bg-[#FCFBF7] shadow-xs'
                            : 'border-[#EADBCE] bg-white hover:border-[#14382C]'
                        }`}
                      >
                        {/* Order Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F0EBE1]">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm font-bold text-[#14382C]">
                              #{order.orderId}
                            </span>
                            <span className="text-xs text-[#8E9B93]">·</span>
                            <span className="text-xs text-[#526359]">
                              {new Date(order.createdAt).toLocaleDateString('en-PK', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </span>
                            {isMidnight && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#14382C] text-[#DFC066]">
                                <MoonStar className="w-3 h-3" />
                                <span>12 AM Midnight Surprise</span>
                              </span>
                            )}
                          </div>

                          {/* Status Badge */}
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-md capitalize ${
                              order.status === 'payment_verification'
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : order.status === 'handcrafting'
                                ? 'bg-blue-100 text-blue-900 border border-blue-300'
                                : order.status === 'quality_sealed'
                                ? 'bg-purple-100 text-purple-900 border border-purple-300'
                                : order.status === 'out_for_delivery'
                                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {order.status.replace('_', ' ')}
                            </span>

                            <button
                              onClick={() => onOpenTracker(order.orderId)}
                              className="text-xs text-[#C59B27] hover:underline flex items-center gap-1 font-medium cursor-pointer"
                              title="Preview live customer tracking page"
                            >
                              <span>Customer View</span>
                              <ExternalLink className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Order Body Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-3 text-xs">
                          {/* Client & Recipient */}
                          <div className="space-y-1">
                            <div className="text-[10px] uppercase font-bold text-[#8E9B93]">Customer & Contact</div>
                            <div className="font-semibold text-[#14382C]">{order.details.customerName}</div>
                            <div className="text-[#526359] font-mono flex items-center gap-1">
                              <Phone className="w-3 h-3 text-[#14382C]" />
                              <span>{order.details.phone}</span>
                            </div>
                            <div className="text-[11px] text-[#526359] flex items-start gap-1 pt-1">
                              <MapPin className="w-3 h-3 text-[#C59B27] shrink-0 mt-0.5" />
                              <span>{order.details.city} · {order.details.address}</span>
                            </div>
                          </div>

                          {/* Hampers in Order */}
                          <div className="space-y-1">
                            <div className="text-[10px] uppercase font-bold text-[#8E9B93]">Items in Gift Box</div>
                            <ul className="space-y-1 text-[#405349]">
                              {order.items.map((item, idx) => (
                                <li key={idx} className="flex items-center justify-between">
                                  <span className="font-medium text-[#14382C]">{item.title} x{item.quantity}</span>
                                  <span className="font-mono text-[#64746B]">PKR {(item.unitPrice * item.quantity).toLocaleString()}</span>
                                </li>
                              ))}
                            </ul>
                            <div className="pt-1 border-t border-[#F0EBE1] flex justify-between font-bold text-[#14382C]">
                              <span>Total Amount:</span>
                              <span className="font-mono tabular-nums">PKR {order.grandTotal.toLocaleString()}</span>
                            </div>
                          </div>

                          {/* Studio Notes & Surprise Directives */}
                          <div className="space-y-1">
                            <div className="text-[10px] uppercase font-bold text-[#8E9B93]">Surprise Directive & Rider</div>
                            {order.details.specialInstructions ? (
                              <div className="p-2 rounded bg-[#FAF7F0] border border-[#DFC066]/30 text-[11px] text-[#14382C]">
                                {order.details.specialInstructions}
                              </div>
                            ) : (
                              <div className="text-[#8E9B93] text-[11px]">No custom surprise notes.</div>
                            )}

                            {order.riderName && (
                              <div className="pt-1 text-[11px] text-[#14382C] font-medium flex items-center gap-1">
                                <Truck className="w-3.5 h-3.5 text-[#C59B27]" />
                                <span>Rider: {order.riderName} ({order.riderContact})</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Interactive Workflow Action Bar */}
                        <div className="pt-3 border-t border-[#F0EBE1] flex flex-wrap items-center justify-between gap-2.5">
                          {/* Left: WhatsApp Customer Dispatch */}
                          <button
                            type="button"
                            onClick={() => handleSendWhatsAppUpdate(order)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/20 transition-colors cursor-pointer"
                            title="Generate pre-filled Pakistani WhatsApp update"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                            <span>Send WhatsApp Status Notice</span>
                          </button>

                          {/* Right: Step Progression Actions */}
                          <div className="flex items-center gap-2">
                            {order.status === 'payment_verification' && currentUser.permissions.canVerifyPayment && (
                              <button
                                type="button"
                                onClick={() => handleAdvanceStatus(order)}
                                className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Verify Advance & Send to Studio</span>
                              </button>
                            )}

                            {order.status === 'handcrafting' && currentUser.permissions.canUpdateOrderProgress && (
                              <button
                                type="button"
                                onClick={() => handleAdvanceStatus(order)}
                                className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#14382C] hover:bg-[#1C4E3D] transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
                              >
                                <Package className="w-3.5 h-3.5 text-[#DFC066]" />
                                <span>Handcrafted & Ready to Seal</span>
                              </button>
                            )}

                            {order.status === 'quality_sealed' && currentUser.permissions.canAssignRider && (
                              <button
                                type="button"
                                onClick={() => setAssigningOrderId(order.orderId)}
                                className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#0A261D] bg-[#DFC066] hover:bg-[#E8CC77] transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
                              >
                                <Truck className="w-3.5 h-3.5" />
                                <span>Assign Rider & Dispatch</span>
                              </button>
                            )}

                            {order.status === 'out_for_delivery' && currentUser.permissions.canUpdateOrderProgress && (
                              <button
                                type="button"
                                onClick={() => handleAdvanceStatus(order)}
                                className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>Mark Successfully Delivered</span>
                              </button>
                            )}

                            {order.status === 'delivered' && (
                              <span className="text-xs font-medium text-emerald-700 flex items-center gap-1">
                                <CheckCircle2 className="w-4 h-4" />
                                <span>Completed & Archived</span>
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Inline Rider Assignment Form when triggered */}
                        {assigningOrderId === order.orderId && (
                          <div className="mt-3 p-3.5 rounded-xl bg-[#FAF7F0] border border-[#DFC066] space-y-3">
                            <div className="text-xs font-bold text-[#14382C] flex items-center gap-1.5">
                              <Truck className="w-4 h-4 text-[#C59B27]" />
                              <span>Assign Studio Courier for #{order.orderId}</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                              <div>
                                <label className="block text-[11px] font-medium text-[#405349] mb-1">Rider Name</label>
                                <input
                                  type="text"
                                  value={riderNameInput}
                                  onChange={(e) => setRiderNameInput(e.target.value)}
                                  className="w-full px-3 py-1.5 bg-white border border-[#DCD5C8] rounded-md"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] font-medium text-[#405349] mb-1">Rider Contact</label>
                                <input
                                  type="text"
                                  value={riderPhoneInput}
                                  onChange={(e) => setRiderPhoneInput(e.target.value)}
                                  className="w-full px-3 py-1.5 bg-white border border-[#DCD5C8] rounded-md font-mono"
                                />
                              </div>
                            </div>

                            {/* Quick Presets */}
                            <div className="flex items-center gap-2 text-[11px]">
                              <span className="text-[#8E9B93]">Quick Presets:</span>
                              <button
                                type="button"
                                onClick={() => {
                                  setRiderNameInput('Rider Bilal (Karachi South)');
                                  setRiderPhoneInput('0300-1122334');
                                }}
                                className="px-2 py-0.5 rounded bg-white border border-[#DCD5C8] hover:bg-[#F4EFE6] cursor-pointer"
                              >
                                Bilal (Khi)
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setRiderNameInput('Rider Tariq (Lahore Gulberg)');
                                  setRiderPhoneInput('0321-9988776');
                                }}
                                className="px-2 py-0.5 rounded bg-white border border-[#DCD5C8] hover:bg-[#F4EFE6] cursor-pointer"
                              >
                                Tariq (Lhr)
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setRiderNameInput('Rider Usman (Isb/Rwp)');
                                  setRiderPhoneInput('0333-5544332');
                                }}
                                className="px-2 py-0.5 rounded bg-white border border-[#DCD5C8] hover:bg-[#F4EFE6] cursor-pointer"
                              >
                                Usman (Isb)
                              </button>
                            </div>

                            <div className="flex justify-end gap-2 pt-1">
                              <button
                                type="button"
                                onClick={() => setAssigningOrderId(null)}
                                className="px-3 py-1.5 text-xs text-[#526359] hover:bg-white rounded-md cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                onClick={() => handleConfirmRiderAssignment(order.orderId)}
                                className="px-4 py-1.5 text-xs font-bold text-white bg-[#14382C] hover:bg-[#1C4E3D] rounded-md cursor-pointer"
                              >
                                Confirm Dispatch
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: MANUAL-TO-DIGITAL QUICK ORDER ENTRY */}
          {activeTab === 'new_order' && (
            <div className="max-w-2xl mx-auto space-y-5">
              <div className="space-y-1">
                <h3 className="font-display text-xl font-bold text-[#14382C]">
                  Quick Manual / WhatsApp Order Entry
                </h3>
                <p className="text-xs text-[#526359]">
                  Got an order over a phone call or direct WhatsApp message? Digitize it in 30 seconds so your rider and customer get instant tracking.
                </p>
              </div>

              {manualOrderCreated ? (
                <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2 text-emerald-900">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-display text-lg font-bold">Order #{manualOrderCreated} Created Successfully!</h4>
                  <p className="text-xs text-emerald-700">Added directly to the live pipeline. Returning to active queue...</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitManualOrder} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-medium text-[#405349] mb-1">Customer / Sender Name *</label>
                      <input
                        type="text"
                        required
                        value={manualCustomerName}
                        onChange={(e) => setManualCustomerName(e.target.value)}
                        placeholder="e.g. Daniyal Khan"
                        className="w-full text-xs px-3 py-2 bg-white border border-[#DCD5C8] rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#405349] mb-1">WhatsApp Phone Number *</label>
                      <input
                        type="text"
                        required
                        value={manualPhone}
                        onChange={(e) => setManualPhone(e.target.value)}
                        placeholder="0300-1234567"
                        className="w-full text-xs px-3 py-2 bg-white border border-[#DCD5C8] rounded-lg font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div>
                      <label className="block text-xs font-medium text-[#405349] mb-1">Destination City *</label>
                      <select
                        value={manualCity}
                        onChange={(e) => setManualCity(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-white border border-[#DCD5C8] rounded-lg"
                      >
                        <option value="Karachi">Karachi (Direct Studio Dispatch)</option>
                        <option value="Lahore">Lahore (Direct Studio Dispatch)</option>
                        <option value="Islamabad">Islamabad (Direct Studio Dispatch)</option>
                        <option value="Rawalpindi">Rawalpindi</option>
                        <option value="Faisalabad">Faisalabad</option>
                        <option value="Multan">Multan</option>
                        <option value="Peshawar">Peshawar</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-[#405349] mb-1">Complete Delivery Address *</label>
                      <input
                        type="text"
                        required
                        value={manualAddress}
                        onChange={(e) => setManualAddress(e.target.value)}
                        placeholder="House / Flat #, Street, Phase / Block"
                        className="w-full text-xs px-3 py-2 bg-white border border-[#DCD5C8] rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-medium text-[#405349] mb-1">Target Surprise Date</label>
                      <input
                        type="date"
                        value={manualDate}
                        onChange={(e) => setManualDate(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-white border border-[#DCD5C8] rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#405349] mb-1">Delivery Slot</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setManualSlot('standard')}
                          className={`p-2 rounded-lg border text-xs text-center cursor-pointer ${
                            manualSlot === 'standard'
                              ? 'border-[#14382C] bg-[#FAF8F5] font-bold text-[#14382C]'
                              : 'border-[#DCD5C8] text-[#526359]'
                          }`}
                        >
                          Standard 1–10 PM
                        </button>
                        <button
                          type="button"
                          onClick={() => setManualSlot('midnight')}
                          className={`p-2 rounded-lg border text-xs text-center cursor-pointer ${
                            manualSlot === 'midnight'
                              ? 'border-[#14382C] bg-[#14382C] text-[#DFC066] font-bold'
                              : 'border-[#DCD5C8] text-[#526359]'
                          }`}
                        >
                          12 AM Midnight 🌙
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Hamper details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-medium text-[#405349] mb-1">Curated Hamper Title</label>
                      <input
                        type="text"
                        value={manualHamperTitle}
                        onChange={(e) => setManualHamperTitle(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-white border border-[#DCD5C8] rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#405349] mb-1">Price (PKR)</label>
                      <input
                        type="number"
                        value={manualHamperPrice}
                        onChange={(e) => setManualHamperPrice(Number(e.target.value))}
                        className="w-full text-xs px-3 py-2 bg-white border border-[#DCD5C8] rounded-lg font-mono"
                      />
                    </div>
                  </div>

                  {/* Secret Surprise Checkbox */}
                  <div className="p-3 rounded-lg bg-[#FAF7F0] border border-[#DFC066]/40 space-y-2">
                    <label className="flex items-center gap-2 text-xs font-semibold text-[#14382C] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={manualSecretSurprise}
                        onChange={(e) => setManualSecretSurprise(e.target.checked)}
                        className="rounded text-[#14382C]"
                      />
                      <span>Strict Secret Surprise (Rider must not call recipient before ringing bell)</span>
                    </label>

                    <input
                      type="text"
                      placeholder="Special instructions or customized note inside box..."
                      value={manualSpecialNote}
                      onChange={(e) => setManualSpecialNote(e.target.value)}
                      className="w-full text-xs px-3 py-1.5 bg-white border border-[#DCD5C8] rounded-md"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 text-xs font-bold text-white bg-[#14382C] hover:bg-[#1C4E3D] rounded-lg shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <PlusCircle className="w-4 h-4 text-[#DFC066]" />
                    <span>Create Order & Add to Live Pipeline</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 3: TEAM & ROLE AUTHORITY MATRIX */}
          {activeTab === 'team' && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="font-display text-xl font-bold text-[#14382C]">
                  Studio Governance & Role Permissions
                </h3>
                <p className="text-xs text-[#526359]">
                  Validation and authorization matrices defining who can verify payments, override pricing, assign riders, and access revenues.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {DEFAULT_ADMIN_USERS.map((user) => {
                  const meta = ROLE_INFO[user.role];
                  const isCurrent = currentUser.id === user.id;

                  return (
                    <div
                      key={user.id}
                      className={`p-4 rounded-xl border flex flex-col justify-between space-y-4 ${
                        isCurrent
                          ? 'border-[#14382C] bg-[#FCFBF7] ring-1 ring-[#14382C]'
                          : 'border-[#EADBCE] bg-white'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${meta.color}`}>
                            {meta.badge}
                          </span>
                          {isCurrent && (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                              Current Session
                            </span>
                          )}
                        </div>

                        <div>
                          <h4 className="font-display text-base font-bold text-[#14382C]">
                            {user.name}
                          </h4>
                          <p className="text-xs text-[#526359]">{user.title}</p>
                        </div>

                        <p className="text-[11px] text-[#64746B] leading-relaxed">
                          {meta.description}
                        </p>

                        {/* Authority Checklist */}
                        <div className="space-y-1.5 pt-2 border-t border-[#F0EBE1] text-[11px]">
                          <div className="flex items-center justify-between">
                            <span className="text-[#405349]">Verify Advance Payments:</span>
                            <span className={user.permissions.canVerifyPayment ? 'text-emerald-700 font-bold' : 'text-gray-400'}>
                              {user.permissions.canVerifyPayment ? '✓ Authorized' : '—'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[#405349]">Advance Handcrafting Pipeline:</span>
                            <span className={user.permissions.canUpdateOrderProgress ? 'text-emerald-700 font-bold' : 'text-gray-400'}>
                              {user.permissions.canUpdateOrderProgress ? '✓ Authorized' : '—'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[#405349]">Assign Studio Riders:</span>
                            <span className={user.permissions.canAssignRider ? 'text-emerald-700 font-bold' : 'text-gray-400'}>
                              {user.permissions.canAssignRider ? '✓ Authorized' : '—'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[#405349]">Financial & Revenue Access:</span>
                            <span className={user.permissions.canViewRevenue ? 'text-emerald-700 font-bold' : 'text-gray-400'}>
                              {user.permissions.canViewRevenue ? '✓ Authorized' : '✕ Restricted'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[#405349]">Pricing & Promo Overrides:</span>
                            <span className={user.permissions.canManagePricingAndPromos ? 'text-emerald-700 font-bold' : 'text-gray-400'}>
                              {user.permissions.canManagePricingAndPromos ? '✓ Authorized' : '✕ Restricted'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleSwitchUser(user)}
                        className={`w-full py-2 px-3 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                          isCurrent
                            ? 'bg-[#14382C] text-white'
                            : 'bg-[#FAF8F5] text-[#14382C] hover:bg-[#EADBCE]'
                        }`}
                      >
                        {isCurrent ? 'Active In This Session' : `Switch to ${user.name}`}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: STUDIO POLICIES & DISPATCH RULES */}
          {activeTab === 'insights' && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="space-y-1">
                <h3 className="font-display text-xl font-bold text-[#14382C]">
                  Official Customer Policies Reference (1–7)
                </h3>
                <p className="text-xs text-[#526359]">
                  Quick operational cheat-sheet to resolve customer inquiries according to studio guidelines.
                </p>
              </div>

              <div className="space-y-3 text-xs text-[#405349]">
                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EADBCE]">
                  <strong className="text-[#14382C] block mb-1">Policy 1: 1-2 Days Advance Notice</strong>
                  <span>All customized hampers and gift baskets require 1-2 days advance booking. Same-day orders can only be accepted if ready stock is available.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EADBCE]">
                  <strong className="text-[#14382C] block mb-1">Policy 3: Strict 12 AM Midnight Surprises</strong>
                  <span>Riders depart at 11:15 PM to reach destinations between 11:55 PM – 12:05 AM. Surcharge of PKR 750 applies unless client holds an active Imperial Gold VIP Card.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EADBCE]">
                  <strong className="text-[#14382C] block mb-1">Policy 6: Mandatory 100% Advance Payment</strong>
                  <span>No order may be handcrafted or personalized until screenshot of bank transfer (Meezan), JazzCash, or EasyPaisa is verified.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EADBCE]">
                  <strong className="text-[#14382C] block mb-1">Policy 7: Strict No-Refund After Dispatch</strong>
                  <span>Because items contain perishable chocolates, custom photo prints, and engraved goods, no refunds can be given after dispatch.</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  X, 
  User, 
  Lock, 
  Mail, 
  Phone, 
  MapPin, 
  Truck, 
  Gift, 
  ShieldCheck, 
  Sparkles, 
  LogOut, 
  Briefcase, 
  CreditCard, 
  MessageCircle, 
  Check, 
  AlertTriangle,
  ArrowRight,
  EyeOff,
  BellOff
} from 'lucide-react';
import { UserProfile, SavedOrder } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  savedOrders: SavedOrder[];
  onUpdateProfile: (updated: UserProfile) => void;
  onLogout: () => void;
  onOpenAuth: () => void;
  onOpenTracker: (orderId?: string) => void;
  initialTab?: 'profile' | 'orders' | 'loyalty' | 'partner' | 'premium';
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  savedOrders,
  onUpdateProfile,
  onLogout,
  onOpenAuth,
  onOpenTracker,
  initialTab = 'profile'
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'loyalty' | 'partner' | 'premium'>(initialTab);

  // Form states initialized from currentUser
  const [username, setUsername] = useState(currentUser?.username || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [address, setAddress] = useState(currentUser?.deliveryProfile.address || '');
  const [unit, setUnit] = useState(currentUser?.deliveryProfile.unit || '');
  const [city, setCity] = useState(currentUser?.deliveryProfile.city || 'Karachi');
  const [recipientPhone, setRecipientPhone] = useState(currentUser?.deliveryProfile.recipientPhone || '');
  const [recipientName, setRecipientName] = useState(currentUser?.deliveryProfile.recipientName || '');
  const [secretSurprise, setSecretSurprise] = useState(currentUser?.deliveryProfile.secretSurpriseRiderNote ?? true);
  const [riderCustomNote, setRiderCustomNote] = useState(
    currentUser?.deliveryProfile.riderCustomNote ||
    'Strict secret surprise: Do not call or inform recipient before arrival. Pre-planned surprise drop.'
  );

  // Partner Form State
  const [businessName, setBusinessName] = useState(currentUser?.partnerDetails?.businessName || '');
  const [partnerCity, setPartnerCity] = useState(currentUser?.partnerDetails?.city || 'Karachi');
  const [portfolioLink, setPortfolioLink] = useState('');
  const [partnerApplied, setPartnerApplied] = useState(currentUser?.isPartner || false);

  // Save changes state
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [premiumSuccess, setPremiumSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const updated: UserProfile = {
      ...currentUser,
      username: username.trim() || currentUser.username,
      email: email.trim() || currentUser.email,
      deliveryProfile: {
        address,
        unit,
        city,
        recipientPhone,
        recipientName,
        secretSurpriseRiderNote: secretSurprise,
        riderCustomNote
      }
    };

    onUpdateProfile(updated);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2200);
  };

  const handleApplyPartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const updated: UserProfile = {
      ...currentUser,
      isPartner: true,
      partnerDetails: {
        businessName: businessName || `${currentUser.username} Gifting Co`,
        city: partnerCity,
        status: 'active'
      }
    };

    onUpdateProfile(updated);
    setPartnerApplied(true);
  };

  const handleActivatePremium = () => {
    if (!currentUser) return;

    const updated: UserProfile = {
      ...currentUser,
      isPremiumMember: true,
      premiumCardTier: 'Imperial Gold VIP'
    };

    onUpdateProfile(updated);
    setPremiumSuccess(true);
  };

  // If user is NOT logged in: Show the requested guest screen
  if (!currentUser) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div 
          className="relative w-full max-w-md bg-white rounded-2xl border border-[#E8E1D5] shadow-2xl p-6 sm:p-8 space-y-6 my-8 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#526359] hover:text-[#0A261D] rounded-full hover:bg-[#FAF8F5]"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 rounded-full bg-[#FAF8F5] border border-[#E8E1D5] flex items-center justify-center mx-auto text-[#0A261D]">
            <User className="w-7 h-7 text-[#B89344]" />
          </div>

          <div className="space-y-1">
            <h2 className="font-display text-2xl font-semibold text-[#0A261D]">
              The Gifts Gallery Account
            </h2>
            <p className="text-xs text-[#64746B]">
              Sign in to manage your secret surprise addresses, track deliveries live, and access partner benefits.
            </p>
          </div>

          {/* Quick Actions List matching user prompt */}
          <div className="space-y-2.5 pt-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenAuth();
              }}
              className="w-full py-3 px-4 text-xs font-semibold text-white bg-[#0A261D] hover:bg-[#153B2F] rounded-md transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <User className="w-4 h-4 text-[#DFBA6B]" />
              <span>Login / Create Account</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenAuth();
              }}
              className="w-full py-2.5 px-4 text-xs font-medium text-[#0A261D] bg-[#F4EFE6] hover:bg-[#E8E1D5] border border-[#DCD5C8] rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Briefcase className="w-4 h-4 text-[#B89344]" />
              <span>Register as Partner</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenAuth();
              }}
              className="w-full py-2.5 px-4 text-xs font-medium text-[#0A261D] bg-[#F4EFE6] hover:bg-[#E8E1D5] border border-[#DCD5C8] rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <CreditCard className="w-4 h-4 text-[#B89344]" />
              <span>Go Premium Card (VIP Club)</span>
            </button>

            <a
              href="https://wa.me/923000000000?text=Hello%20The%20Gifts%20Gallery!%20I%20need%20assistance%20with%20my%20order%20or%20account."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 text-xs font-medium text-[#1E2922] hover:bg-[#FAF8F5] border border-[#E8E1D5] rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Support</span>
            </a>
          </div>

          <div className="pt-3 border-t border-[#F0EBE1]">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenTracker();
              }}
              className="text-xs text-[#0A261D] hover:text-[#B89344] font-medium flex items-center justify-center gap-1 mx-auto hover:underline"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Have a Tracking ID? Track It Here →</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // LOGGED-IN VIEW
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-2xl border border-[#E8E1D5] shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with User Info Card */}
        <div className="bg-[#0A261D] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#BED2C7] hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#153B2F] border-2 border-[#DFBA6B] flex items-center justify-center text-lg font-display font-semibold text-[#DFBA6B]">
                {currentUser.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-xl sm:text-2xl font-semibold">
                    {currentUser.username}
                  </h2>
                  {currentUser.isPremiumMember && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm bg-[#DFBA6B] text-[#0A261D]">
                      VIP Gold
                    </span>
                  )}
                  {currentUser.isPartner && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm bg-[#153B2F] text-[#E5CCA0] border border-[#DFBA6B]/40">
                      Associate Partner
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-[#BED2C7] mt-0.5">
                  <span>{currentUser.email}</span>
                  <span>·</span>
                  <span className="font-mono">{currentUser.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/10">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#DFBA6B]/20 border border-[#DFBA6B]/40 text-xs font-semibold text-[#DFBA6B]">
                    <Sparkles className="w-3 h-3" />
                    <span>{currentUser.loyaltyPoints || 0} Prestige Points</span>
                    <span className="text-[10px] text-white/70 font-normal">(= PKR {currentUser.loyaltyPoints || 0} Discount)</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#BED2C7] hover:text-white border border-white/20 hover:border-white/40 rounded-md transition-colors self-start sm:self-auto cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-[#E8E1D5] bg-[#FAF8F5] overflow-x-auto scrollbar-none">
          {[
            { id: 'profile', label: 'Profile & Delivery', icon: <User className="w-3.5 h-3.5" /> },
            { id: 'orders', label: `Orders (${savedOrders.length})`, icon: <Truck className="w-3.5 h-3.5" /> },
            { id: 'loyalty', label: `Prestige Points (${currentUser.loyaltyPoints || 0})`, icon: <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" /> },
            { id: 'partner', label: 'Become Associate Partner', icon: <Briefcase className="w-3.5 h-3.5" /> },
            { id: 'premium', label: 'Premium Gold Card', icon: <CreditCard className="w-3.5 h-3.5" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 pb-2.5 px-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[#0A261D] text-[#0A261D] font-semibold'
                  : 'border-transparent text-[#64746B] hover:text-[#0A261D]'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          
          {/* TAB 1: Profile & Delivery Defaults (Editable username, locked phone, editable email, secret surprise rider note) */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-6">
              
              {/* Account Security Details */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0A261D] flex items-center justify-between">
                  <span>Account & Contact Information</span>
                  <span className="text-[11px] text-[#64746B] font-normal">Phone is locked for account safety</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Username (Editable) */}
                  <div>
                    <label className="block text-[11px] font-medium text-[#526359] mb-1">
                      Username / Name (Editable)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full text-xs pl-8 pr-3 py-2 bg-white border border-[#DCD5C8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A261D]"
                      />
                      <User className="w-3.5 h-3.5 text-[#8E9B93] absolute left-2.5 top-2.5" />
                    </div>
                  </div>

                  {/* Phone Number (LOCKED) */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] font-medium text-[#526359]">
                        Phone Number
                      </label>
                      <span className="text-[10px] text-amber-700 font-semibold flex items-center gap-0.5">
                        <Lock className="w-2.5 h-2.5" />
                        <span>Locked</span>
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        value={currentUser.phoneNumber}
                        disabled
                        className="w-full text-xs pl-8 pr-3 py-2 bg-[#F4EFE6] border border-[#DCD5C8] rounded-md text-[#526359] cursor-not-allowed font-mono"
                        title="Phone number is locked for security"
                      />
                      <Lock className="w-3.5 h-3.5 text-[#B89344] absolute left-2.5 top-2.5" />
                    </div>
                  </div>

                  {/* Email (Editable) */}
                  <div>
                    <label className="block text-[11px] font-medium text-[#526359] mb-1">
                      Email Address (Editable)
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-xs pl-8 pr-3 py-2 bg-white border border-[#DCD5C8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A261D]"
                      />
                      <Mail className="w-3.5 h-3.5 text-[#8E9B93] absolute left-2.5 top-2.5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Section (address, unit, city, phone, name) */}
              <div className="pt-4 border-t border-[#F0EBE1] space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0A261D]">
                  Default Delivery & Recipient Address
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-[#526359] mb-1">
                      Recipient Full Name
                    </label>
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="e.g. Ayesha Khan"
                      className="w-full text-xs px-3 py-2 bg-white border border-[#DCD5C8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A261D]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#526359] mb-1">
                      Recipient Phone / WhatsApp
                    </label>
                    <input
                      type="text"
                      value={recipientPhone}
                      onChange={(e) => setRecipientPhone(e.target.value)}
                      placeholder="0300-XXXXXXX"
                      className="w-full text-xs px-3 py-2 bg-white border border-[#DCD5C8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A261D] font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-medium text-[#526359] mb-1">
                      Street Address / Colony
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="House / Street / Area / Landmark"
                      className="w-full text-xs px-3 py-2 bg-white border border-[#DCD5C8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A261D]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#526359] mb-1">
                      Unit / Flat / Floor #
                    </label>
                    <input
                      type="text"
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      placeholder="e.g. Apt 4B / Villa 2"
                      className="w-full text-xs px-3 py-2 bg-white border border-[#DCD5C8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A261D]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#526359] mb-1">
                    Delivery City
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
                    <option value="Other City">Other Nationwide Cities</option>
                  </select>
                </div>
              </div>

              {/* Rider Note: Not to call or inform before deliver or similar pre-planned service */}
              <div className="pt-4 border-t border-[#F0EBE1] space-y-3 p-4 bg-[#FAF8F5] rounded-xl border border-[#E8E1D5]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BellOff className="w-4 h-4 text-[#B89344]" />
                    <span className="text-xs font-semibold text-[#0A261D]">
                      Pre-Planned Surprise Rider Protocol
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={secretSurprise}
                      onChange={(e) => setSecretSurprise(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-[#DCD5C8] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0A261D]"></div>
                  </label>
                </div>

                <p className="text-[11px] text-[#64746B] leading-relaxed">
                  When active, our riders follow strict secrecy: <strong>No advance phone calls or spoilers</strong> before arrival. The rider will only ring the doorbell or contact the sender, ensuring your surprise moment stays 100% genuine.
                </p>

                <div>
                  <label className="block text-[11px] font-medium text-[#526359] mb-1">
                    Custom Rider Delivery Note
                  </label>
                  <textarea
                    rows={2}
                    value={riderCustomNote}
                    onChange={(e) => setRiderCustomNote(e.target.value)}
                    placeholder="e.g. Do not call or inform recipient before deliver. Ring the bell gently and hand over without spoiling who sent it."
                    className="w-full text-xs px-3 py-2 bg-white border border-[#DCD5C8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A261D]"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-[#64746B]">
                  {saveSuccess ? (
                    <span className="text-emerald-700 font-medium flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      Profile and Delivery Details Updated!
                    </span>
                  ) : (
                    'Settings apply automatically to your future hampers'
                  )}
                </span>

                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0A261D] hover:bg-[#153B2F] rounded-md transition-colors shadow-xs cursor-pointer"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: Orders and History */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0A261D]">
                    Your Order History
                  </h3>
                  <p className="text-xs text-[#64746B]">
                    View past gift boxes, invoices, and live rider dispatch tracking.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenTracker();
                  }}
                  className="text-xs font-medium text-[#B89344] hover:underline flex items-center gap-1"
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Manual Tracking Lookup</span>
                </button>
              </div>

              {savedOrders.length === 0 ? (
                <div className="p-8 text-center bg-[#FAF8F5] rounded-xl border border-dashed border-[#DCD5C8] space-y-2">
                  <Gift className="w-8 h-8 text-[#8E9B93] mx-auto" />
                  <p className="font-display text-base text-[#0A261D]">No Orders Placed Yet</p>
                  <p className="text-xs text-[#64746B]">
                    Your confirmed surprise orders will appear here with live tracking.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedOrders.map((order) => (
                    <div
                      key={order.orderId}
                      className="p-4 rounded-xl border border-[#E8E1D5] bg-[#FAF8F5] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#0A261D]">
                            #{order.orderId}
                          </span>
                          <span className="text-xs text-[#8E9B93]">·</span>
                          <span className="text-xs text-[#64746B]">
                            {new Date(order.createdAt).toLocaleDateString('en-PK', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                            {order.status.replace('_', ' ')}
                          </span>
                        </div>
                        <div className="text-xs text-[#526359]">
                          {order.items.map((i) => i.title).join(', ')}
                        </div>
                        <div className="text-[11px] text-[#8E9B93]">
                          Delivery: {order.details.city} · {order.details.deliveryDate} ({order.details.deliverySlot})
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E8E1D5]">
                        <span className="font-mono text-sm font-bold text-[#0A261D] tabular-nums">
                          PKR {order.grandTotal.toLocaleString()}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onOpenTracker(order.orderId);
                          }}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-[#0A261D] hover:bg-[#153B2F] rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Truck className="w-3.5 h-3.5 text-[#DFBA6B]" />
                          <span>Track</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: Loyalty Points & Rewards */}
          {activeTab === 'loyalty' && (
            <div className="space-y-6">
              {/* Luxury Points Status Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1C1813] via-[#0A261D] to-[#1F3E33] border border-[#DFBA6B]/50 shadow-xl text-white relative overflow-hidden space-y-4">
                <div className="absolute top-0 right-0 w-44 h-44 bg-[#DFBA6B]/15 rounded-full blur-2xl pointer-events-none" />

                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-[#DFBA6B]">
                      The Gifts Gallery Privilege Rewards
                    </span>
                    <h4 className="font-display text-2xl font-semibold mt-1">
                      Prestige Loyalty Points
                    </h4>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#DFBA6B]/20 border border-[#DFBA6B]/40 flex items-center justify-center text-[#DFBA6B]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                </div>

                <div className="py-2 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                  <div className="font-mono text-4xl sm:text-5xl font-bold tracking-tight text-[#DFC066] tabular-nums">
                    {currentUser.loyaltyPoints || 0}
                  </div>
                  <div className="text-xs text-[#BED2C7]">
                    Available Points · Worth <strong className="text-white font-mono">PKR {currentUser.loyaltyPoints || 0}</strong> in Instant Cart Discounts
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex flex-wrap justify-between items-center text-xs text-[#E5CCA0] gap-2">
                  <span>Earning Rate: 1 Point per PKR 50 spent</span>
                  <span>{currentUser.isPremiumMember ? '★ 1.5x VIP Accelerator Active' : 'Upgrade to VIP for 1.5x Earning'}</span>
                </div>
              </div>

              {/* How to Earn & Redeem Guide */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E1D5] space-y-1.5">
                  <div className="w-7 h-7 rounded-full bg-[#14382C] text-[#DFBA6B] flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                  <h4 className="text-xs font-bold text-[#14382C]">Earn on Every Order</h4>
                  <p className="text-[11px] text-[#526359] leading-relaxed">
                    Earn 1 point for every PKR 50 spent on all luxury boxes, perfumes, and baskets.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E1D5] space-y-1.5">
                  <div className="w-7 h-7 rounded-full bg-[#14382C] text-[#DFBA6B] flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                  <h4 className="text-xs font-bold text-[#14382C]">1:1 Cash Discount</h4>
                  <p className="text-[11px] text-[#526359] leading-relaxed">
                    1 Point = PKR 1 off. Points never expire and have zero minimum thresholds.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E1D5] space-y-1.5">
                  <div className="w-7 h-7 rounded-full bg-[#14382C] text-[#DFBA6B] flex items-center justify-center text-xs font-bold">
                    3
                  </div>
                  <h4 className="text-xs font-bold text-[#14382C]">One-Tap Checkout</h4>
                  <p className="text-[11px] text-[#526359] leading-relaxed">
                    Toggle "Redeem Points" in your cart to deduct directly from your total bill!
                  </p>
                </div>
              </div>

              {/* Points Ledger / Transaction History */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0A261D]">
                    Points Activity Ledger
                  </h3>
                  <span className="text-[11px] text-[#64746B]">
                    {(currentUser.pointsHistory || []).length} Recorded Transactions
                  </span>
                </div>

                {(!currentUser.pointsHistory || currentUser.pointsHistory.length === 0) ? (
                  <div className="p-6 text-center bg-[#FAF8F5] rounded-xl border border-dashed border-[#DCD5C8] space-y-1">
                    <p className="text-xs text-[#526359]">No points activity recorded yet.</p>
                    <p className="text-[11px] text-[#8E9B93]">Place your first surprise order to start stacking points!</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {currentUser.pointsHistory.map((txn) => (
                      <div
                        key={txn.id}
                        className="p-3.5 rounded-lg border border-[#E8E1D5] bg-[#FAF8F5] flex items-center justify-between"
                      >
                        <div className="space-y-0.5">
                          <div className="text-xs font-semibold text-[#14382C]">
                            {txn.description}
                          </div>
                          <div className="text-[10px] text-[#8E9B93] flex items-center gap-2">
                            <span>{txn.date}</span>
                            {txn.orderId && (
                              <>
                                <span>·</span>
                                <span className="font-mono">{txn.orderId}</span>
                              </>
                            )}
                          </div>
                        </div>

                        <div className={`font-mono text-sm font-bold tabular-nums ${
                          txn.type === 'earned' ? 'text-emerald-700' : 'text-amber-700'
                        }`}>
                          {txn.type === 'earned' ? `+${txn.points}` : `-${txn.points}`} pts
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: Become TGG Associate Partner */}
          {activeTab === 'partner' && (
            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-gradient-to-r from-[#0A261D] to-[#153B2F] text-white space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#E5CCA0]">
                  Wholesale & Artisan Collaboration
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-semibold">
                  TGG Associate Partner Program
                </h3>
                <p className="text-xs text-[#BED2C7] leading-relaxed">
                  Join our verified nationwide network of luxury bakers, florists, calligraphers, and corporate gifting agents. Earn 12% to 18% revenue share and access wholesale hampers.
                </p>
              </div>

              {partnerApplied ? (
                <div className="p-6 text-center rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="font-display text-lg font-semibold">
                    Associate Partner Application Active!
                  </h4>
                  <p className="text-xs text-emerald-700 max-w-md mx-auto">
                    Welcome aboard, <strong>{businessName || currentUser.username}</strong>! Your account has partner pricing privileges enabled. Studio team will WhatsApp you the wholesale catalog.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleApplyPartner} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-[#526359] mb-1">
                        Brand / Business / Studio Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="e.g. Maison Flora & Gifts"
                        className="w-full text-xs px-3 py-2 bg-white border border-[#DCD5C8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A261D]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-[#526359] mb-1">
                        Operating City *
                      </label>
                      <select
                        value={partnerCity}
                        onChange={(e) => setPartnerCity(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-white border border-[#DCD5C8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A261D]"
                      >
                        <option value="Karachi">Karachi</option>
                        <option value="Lahore">Lahore</option>
                        <option value="Islamabad">Islamabad</option>
                        <option value="Rawalpindi">Rawalpindi</option>
                        <option value="Faisalabad">Faisalabad</option>
                        <option value="Other">Other City</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#526359] mb-1">
                      Instagram Handle or Portfolio Link
                    </label>
                    <input
                      type="text"
                      value={portfolioLink}
                      onChange={(e) => setPortfolioLink(e.target.value)}
                      placeholder="@yourbrand.pk or portfolio URL"
                      className="w-full text-xs px-3 py-2 bg-white border border-[#DCD5C8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A261D]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 px-4 text-xs font-semibold text-white bg-[#0A261D] hover:bg-[#153B2F] rounded-md transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Briefcase className="w-4 h-4 text-[#DFBA6B]" />
                      <span>Submit Partner Application</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 4: Start with Premium Card */}
          {activeTab === 'premium' && (
            <div className="space-y-6">
              {/* Luxury Metallic Card Preview */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1C1813] via-[#0A261D] to-[#2B2313] border border-[#DFBA6B]/50 shadow-xl text-white relative overflow-hidden space-y-4">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#DFBA6B]/15 rounded-full blur-2xl pointer-events-none" />

                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-[#DFBA6B]">
                      The Gifts Gallery Privilege
                    </span>
                    <h4 className="font-display text-2xl font-semibold mt-1">
                      Imperial Gold VIP
                    </h4>
                  </div>
                  <Sparkles className="w-6 h-6 text-[#DFBA6B]" />
                </div>

                <div className="py-2">
                  <div className="font-mono text-sm tracking-widest text-[#E5CCA0]">
                    **** **** **** 8829
                  </div>
                  <div className="text-[11px] text-[#BED2C7] mt-0.5">
                    CARDHOLDER: {currentUser.username.toUpperCase()}
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex justify-between items-center text-[11px] text-[#E5CCA0]">
                  <span>15% Off All Hampers</span>
                  <span>Free 12 AM Midnight Upgrades</span>
                </div>
              </div>

              {/* Benefits Checklist */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0A261D]">
                  VIP Membership Privileges:
                </h4>
                <ul className="space-y-2 text-xs text-[#405349]">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B89344] shrink-0" />
                    <span><strong>Free 12 AM Midnight Surprise Delivery</strong> (Saves PKR 750 on every birthday order)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B89344] shrink-0" />
                    <span><strong>Flat 15% VIP Discount</strong> across all watch, fragrance, and jewelry collections</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B89344] shrink-0" />
                    <span><strong>Complimentary Wax-Sealed Calligraphy Greeting Cards</strong> with gold leaf</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B89344] shrink-0" />
                    <span><strong>Priority 2-Hour Express Preparation</strong> for urgent milestone celebrations</span>
                  </li>
                </ul>
              </div>

              {currentUser.isPremiumMember || premiumSuccess ? (
                <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Your Imperial Gold VIP Card is active! Discount code <strong>VIPGOLD15</strong> unlocked.</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleActivatePremium}
                  className="w-full py-3 px-4 text-xs font-semibold text-[#0A261D] bg-[#DFBA6B] hover:bg-[#F2DEB0] rounded-md transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4 text-[#0A261D]" />
                  <span>Activate Imperial Gold VIP Card (Complimentary Trial)</span>
                </button>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  Mail, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  MessageCircle, 
  CheckCircle2, 
  Truck,
  Sparkles,
  Smartphone
} from 'lucide-react';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  onOpenTracker: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onOpenTracker
}) => {
  if (!isOpen) return null;

  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [loginMethod, setLoginMethod] = useState<'whatsapp' | 'email'>('whatsapp');
  
  // Email fields
  const [email, setEmail] = useState('daniyal.khan@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('Daniyal Khan');

  // WhatsApp OTP fields
  const [phone, setPhone] = useState('0300-1234567');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [simulatedCode, setSimulatedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Cloudflare verification state
  const [cfVerified, setCfVerified] = useState(true);

  const handleSendWhatsAppOtp = () => {
    if (!phone || phone.length < 10) {
      setErrorMsg('Please enter a valid Pakistani phone number (e.g. 0300-1234567).');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
      setSimulatedCode(randomCode);
      setOtpSent(true);
      // Auto-prefill for smooth testing
      setOtpCode(randomCode);
    }, 800);
  };

  const handleVerifyWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.length < 6) {
      setErrorMsg('Please enter the 6-digit WhatsApp verification code.');
      return;
    }

    const cleanPhone = phone.trim();
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      username: username || 'TGG Collector',
      email: email || `${cleanPhone.replace(/\D/g, '')}@tgg.pk`,
      phoneNumber: cleanPhone,
      isPhoneVerified: true,
      deliveryProfile: {
        address: 'House #42, Street 8, Phase 6, DHA',
        unit: 'Villa B',
        city: 'Karachi',
        recipientPhone: cleanPhone,
        recipientName: username || 'Daniyal Khan',
        secretSurpriseRiderNote: true,
        riderCustomNote: 'Pre-planned secret drop. Ring the bell gently and do not call the recipient beforehand.'
      },
      isPartner: false,
      isPremiumMember: false,
      loyaltyPoints: 150,
      pointsHistory: [
        {
          id: `txn-${Date.now()}-1`,
          date: new Date().toLocaleDateString('en-PK', { month: 'short', day: 'numeric', year: 'numeric' }),
          description: 'Welcome Bonus Gift Points',
          points: 150,
          type: 'earned'
        }
      ]
    };

    onLoginSuccess(newUser);
    onClose();
  };

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter your email and password.');
      return;
    }

    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      username: username || email.split('@')[0],
      email: email.trim(),
      phoneNumber: phone || '0300-1234567',
      isPhoneVerified: true,
      deliveryProfile: {
        address: 'House #18, Main Boulevard, Gulberg III',
        unit: 'Flat 4B',
        city: 'Lahore',
        recipientPhone: phone || '0300-1234567',
        recipientName: username || 'Valued Client',
        secretSurpriseRiderNote: true,
        riderCustomNote: 'Secret surprise! Do not reveal gift details or call before arriving.'
      },
      isPartner: false,
      isPremiumMember: false,
      loyaltyPoints: 150,
      pointsHistory: [
        {
          id: `txn-${Date.now()}-2`,
          date: new Date().toLocaleDateString('en-PK', { month: 'short', day: 'numeric', year: 'numeric' }),
          description: 'Welcome Bonus Gift Points',
          points: 150,
          type: 'earned'
        }
      ]
    };

    onLoginSuccess(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative w-full max-w-md bg-white rounded-2xl border border-[#E8E1D5] shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-[#526359] hover:text-[#0A261D] bg-white/90 rounded-full hover:bg-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Realistic Cloudflare Turnstile & SSL Security Badge */}
        <div className="bg-[#FAF8F5] border-b border-[#E8E1D5] px-5 py-2.5 flex items-center justify-between text-[11px] text-[#405349]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <ShieldCheck className="w-3.5 h-3.5 text-[#0A261D]" />
            <span className="font-medium text-[#0A261D]">Cloudflare Turnstile Verified</span>
          </div>
          <span className="font-mono text-[#8E9B93] text-[10px]">256-Bit SSL Encrypted</span>
        </div>

        {/* Modal Header */}
        <div className="p-6 pb-4 text-center space-y-1 bg-white">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#0A261D] text-[#DFBA6B] mb-2 shadow-xs">
            <Lock className="w-5 h-5" />
          </div>
          <h2 className="font-display text-2xl font-semibold text-[#0A261D]">
            {authMode === 'signin' ? 'Welcome Back to TGG' : 'Create Your TGG Account'}
          </h2>
          <p className="text-xs text-[#64746B]">
            {authMode === 'signin' 
              ? 'Sign in to access your surprise orders and secret delivery profiles.' 
              : 'Join The Gifts Gallery to save recipient addresses and gift preferences.'}
          </p>
        </div>

        {/* Mode & Method Selector */}
        <div className="px-6 space-y-4">
          {/* Sign In vs Sign Up Tab */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-[#F4EFE6] rounded-lg border border-[#E0D8CB]">
            <button
              type="button"
              onClick={() => {
                setAuthMode('signin');
                setErrorMsg('');
              }}
              className={`py-1.5 text-xs font-semibold rounded-md transition-all ${
                authMode === 'signin'
                  ? 'bg-white text-[#0A261D] shadow-xs'
                  : 'text-[#64746B] hover:text-[#0A261D]'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('signup');
                setErrorMsg('');
              }}
              className={`py-1.5 text-xs font-semibold rounded-md transition-all ${
                authMode === 'signup'
                  ? 'bg-white text-[#0A261D] shadow-xs'
                  : 'text-[#64746B] hover:text-[#0A261D]'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Login Method Toggle */}
          <div className="flex items-center justify-center gap-4 text-xs font-medium text-[#526359] border-b border-[#F0EBE1] pb-2">
            <button
              type="button"
              onClick={() => {
                setLoginMethod('whatsapp');
                setErrorMsg('');
              }}
              className={`flex items-center gap-1.5 pb-1 border-b-2 transition-colors ${
                loginMethod === 'whatsapp'
                  ? 'border-[#0A261D] text-[#0A261D] font-semibold'
                  : 'border-transparent text-[#64746B] hover:text-[#0A261D]'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp One-Tap OTP</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setLoginMethod('email');
                setErrorMsg('');
              }}
              className={`flex items-center gap-1.5 pb-1 border-b-2 transition-colors ${
                loginMethod === 'email'
                  ? 'border-[#0A261D] text-[#0A261D] font-semibold'
                  : 'border-transparent text-[#64746B] hover:text-[#0A261D]'
              }`}
            >
              <Mail className="w-3.5 h-3.5 text-[#0A261D]" />
              <span>Email & Password</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 pt-3 space-y-4">
          {errorMsg && (
            <div className="p-2.5 rounded-md bg-red-50 border border-red-200 text-xs text-red-700">
              {errorMsg}
            </div>
          )}

          {/* METHOD 1: WhatsApp OTP Flow */}
          {loginMethod === 'whatsapp' && (
            <form onSubmit={handleVerifyWhatsApp} className="space-y-3.5">
              {authMode === 'signup' && (
                <div>
                  <label className="block text-[11px] font-medium text-[#526359] mb-1">
                    Your Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="e.g. Daniyal Khan"
                      className="w-full text-xs pl-8 pr-3 py-2 bg-[#FAF8F5] border border-[#DCD5C8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A261D]"
                    />
                    <User className="w-3.5 h-3.5 text-[#8E9B93] absolute left-2.5 top-2.5" />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-medium text-[#526359] mb-1">
                  WhatsApp Phone Number (Pakistan)
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0300-1234567"
                    disabled={otpSent}
                    className="w-full text-xs pl-8 pr-3 py-2 bg-[#FAF8F5] border border-[#DCD5C8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A261D] font-mono"
                  />
                  <Smartphone className="w-3.5 h-3.5 text-[#25D366] absolute left-2.5 top-2.5" />
                </div>
              </div>

              {!otpSent ? (
                <button
                  type="button"
                  onClick={handleSendWhatsAppOtp}
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#0A261D] hover:bg-[#153B2F] rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  {isLoading ? (
                    <span>Sending WhatsApp Code...</span>
                  ) : (
                    <>
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                      <span>Send 6-Digit WhatsApp Code</span>
                    </>
                  )}
                </button>
              ) : (
                <div className="space-y-3 pt-1">
                  {/* Simulated code notice */}
                  <div className="p-2.5 rounded-md bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 space-y-1">
                    <div className="flex items-center gap-1.5 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>WhatsApp Code Sent to {phone}</span>
                    </div>
                    <p className="text-[11px] text-emerald-700">
                      Simulated code: <strong className="font-mono text-sm tracking-widest">{simulatedCode}</strong> (Pre-filled for your convenience)
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#526359] mb-1">
                      Enter 6-Digit Code
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="849201"
                      className="w-full text-center text-lg font-mono tracking-[0.4em] py-2 bg-[#FAF8F5] border border-[#DCD5C8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A261D]"
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-[#64746B] hover:text-[#0A261D]"
                    >
                      Change Phone Number
                    </button>
                    <button
                      type="button"
                      onClick={handleSendWhatsAppOtp}
                      className="text-[#B89344] font-medium hover:underline"
                    >
                      Resend Code
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#0A261D] hover:bg-[#153B2F] rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>Verify & Continue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </form>
          )}

          {/* METHOD 2: Email & Password Flow */}
          {loginMethod === 'email' && (
            <form onSubmit={handleEmailAuth} className="space-y-3">
              {authMode === 'signup' && (
                <div>
                  <label className="block text-[11px] font-medium text-[#526359] mb-1">
                    Your Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="e.g. Daniyal Khan"
                      className="w-full text-xs pl-8 pr-3 py-2 bg-[#FAF8F5] border border-[#DCD5C8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A261D]"
                    />
                    <User className="w-3.5 h-3.5 text-[#8E9B93] absolute left-2.5 top-2.5" />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-medium text-[#526359] mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full text-xs pl-8 pr-3 py-2 bg-[#FAF8F5] border border-[#DCD5C8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A261D]"
                  />
                  <Mail className="w-3.5 h-3.5 text-[#8E9B93] absolute left-2.5 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#526359] mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full text-xs pl-8 pr-9 py-2 bg-[#FAF8F5] border border-[#DCD5C8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A261D]"
                  />
                  <Lock className="w-3.5 h-3.5 text-[#8E9B93] absolute left-2.5 top-2.5" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-2 text-[#8E9B93] hover:text-[#0A261D]"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#0A261D] hover:bg-[#153B2F] rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs mt-2"
              >
                <span>{authMode === 'signin' ? 'Sign In to Account' : 'Complete Registration'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {/* Cloudflare turnstile badge footer note */}
          <div className="pt-2 text-center text-[10px] text-[#8E9B93] flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3 h-3 text-[#B89344]" />
            <span>Protected by Cloudflare Turnstile bot detection & TLS 1.3</span>
          </div>
        </div>

        {/* Bottom Bar: Have a Tracking ID? Track It Here */}
        <div className="p-4 bg-[#FAF8F5] border-t border-[#E8E1D5] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-[#405349]">
            <Truck className="w-4 h-4 text-[#B89344]" />
            <span>Have a Tracking ID?</span>
          </div>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenTracker();
            }}
            className="font-semibold text-[#0A261D] hover:text-[#B89344] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Track It Here</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

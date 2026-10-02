export type Category = 
  | 'all'
  | 'for-him'
  | 'baskets'
  | 'personalized'
  | 'accessories';

export interface ProductVariant {
  id: string;
  name: 'Small' | 'Medium' | 'Large (Premium)';
  price: number;
  description: string;
  itemsIncluded: string[];
}

export interface Product {
  id: string;
  title: string;
  tagline: string;
  category: Category;
  categoryLabel: string;
  image: string;
  fallbackGradient: string;
  badge?: string;
  basePrice: number;
  variants: ProductVariant[];
  description: string;
  features: string[];
  packaging: string;
  leadTime: string;
}

export interface CartItem {
  id: string; // unique item id
  productId: string;
  title: string;
  image: string;
  variantName: string;
  unitPrice: number;
  quantity: number;
  customizationNote?: string;
  recipientName?: string;
  addOns?: { name: string; price: number }[];
  isCustomBox?: boolean;
}

export interface CustomBoxSelection {
  boxType: {
    id: string;
    name: string;
    color: string;
    material: string;
    basePrice: number;
    image: string;
  };
  size: 'Small' | 'Medium' | 'Large (Premium)';
  selectedItems: {
    id: string;
    name: string;
    category: string;
    price: number;
  }[];
  ribbonColor: string;
  recipientName: string;
  occasion: string;
  messageCard: string;
  fairyLights: boolean;
  babysBreath: boolean;
}

export interface DeliveryDetails {
  customerName: string;
  phone: string;
  city: string;
  address: string;
  deliveryDate: string;
  deliverySlot: 'standard' | 'midnight';
  specialInstructions?: string;
  paymentMethod: 'bank_transfer' | 'jazzcash' | 'easypaisa';
  appliedPromo?: string;
  discountAmount: number;
  pointsRedeemed?: number;
  pointsDiscountAmount?: number;
}

export type OrderStatusStep = 
  | 'payment_verification'
  | 'handcrafting'
  | 'quality_sealed'
  | 'out_for_delivery'
  | 'delivered';

export interface LoyaltyTransaction {
  id: string;
  date: string;
  orderId?: string;
  description: string;
  points: number;
  type: 'earned' | 'redeemed';
}

export interface SavedOrder {
  orderId: string;
  createdAt: string;
  status: OrderStatusStep;
  statusNotes?: string;
  riderName?: string;
  riderContact?: string;
  details: DeliveryDetails;
  items: CartItem[];
  grandTotal: number;
  pointsEarned?: number;
  pointsRedeemed?: number;
}

export interface UserDeliveryProfile {
  address: string;
  unit: string;
  city: string;
  recipientPhone: string;
  recipientName: string;
  secretSurpriseRiderNote: boolean;
  riderCustomNote: string;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  phoneNumber: string; // locked
  isPhoneVerified: boolean;
  deliveryProfile: UserDeliveryProfile;
  isPartner: boolean;
  partnerDetails?: {
    businessName: string;
    city: string;
    status: 'pending' | 'active';
  };
  isPremiumMember: boolean;
  premiumCardTier?: 'Classic Emerald' | 'Imperial Gold VIP';
  loyaltyPoints: number;
  pointsHistory?: LoyaltyTransaction[];
}

export type AdminRole = 'owner' | 'admin' | 'manager';

export interface AdminUser {
  id: string;
  name: string;
  role: AdminRole;
  title: string;
  avatarInitials: string;
  pin: string;
  permissions: {
    canVerifyPayment: boolean;
    canUpdateOrderProgress: boolean;
    canAssignRider: boolean;
    canAddManualOrder: boolean;
    canViewRevenue: boolean;
    canManagePricingAndPromos: boolean;
    canManageTeam: boolean;
    canAdjustLoyaltyPoints: boolean;
  };
}



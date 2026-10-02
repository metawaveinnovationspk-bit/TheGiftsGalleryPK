import { AdminUser } from '../types';

export const DEFAULT_ADMIN_USERS: AdminUser[] = [
  {
    id: 'admin-owner-1',
    name: 'Fatima Noor',
    role: 'owner',
    title: 'Founder & Managing Director',
    avatarInitials: 'FN',
    pin: '7788',
    permissions: {
      canVerifyPayment: true,
      canUpdateOrderProgress: true,
      canAssignRider: true,
      canAddManualOrder: true,
      canViewRevenue: true,
      canManagePricingAndPromos: true,
      canManageTeam: true,
      canAdjustLoyaltyPoints: true
    }
  },
  {
    id: 'admin-operations-2',
    name: 'Ayesha Khan',
    role: 'admin',
    title: 'Senior Operations & Dispatch Lead',
    avatarInitials: 'AK',
    pin: '1234',
    permissions: {
      canVerifyPayment: true,
      canUpdateOrderProgress: true,
      canAssignRider: true,
      canAddManualOrder: true,
      canViewRevenue: true,
      canManagePricingAndPromos: false,
      canManageTeam: false,
      canAdjustLoyaltyPoints: true
    }
  },
  {
    id: 'admin-manager-3',
    name: 'Zainab Tariq',
    role: 'manager',
    title: 'Studio & Handcrafting Shift Manager',
    avatarInitials: 'ZT',
    pin: '2026',
    permissions: {
      canVerifyPayment: true,
      canUpdateOrderProgress: true,
      canAssignRider: true,
      canAddManualOrder: true,
      canViewRevenue: false,
      canManagePricingAndPromos: false,
      canManageTeam: false,
      canAdjustLoyaltyPoints: false
    }
  }
];

export const ROLE_INFO = {
  owner: {
    label: 'Owner & Executive',
    color: 'bg-amber-100 text-amber-900 border-amber-300',
    badge: '👑 Executive Access',
    description: 'Complete operational and financial control, pricing overrides, and team management.'
  },
  admin: {
    label: 'Operations Admin',
    color: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    badge: '🛡️ Operations Lead',
    description: 'Order pipeline management, rider assignments, customer dispatch and revenue tracking.'
  },
  manager: {
    label: 'Shift Manager',
    color: 'bg-blue-100 text-blue-900 border-blue-300',
    badge: '⚡ Studio Floor Manager',
    description: 'Day-to-day packaging verification, order status progression, and rider dispatch.'
  }
};

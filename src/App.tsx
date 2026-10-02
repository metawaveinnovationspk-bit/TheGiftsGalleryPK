/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PRODUCTS } from './data/products';
import { 
  Product, 
  ProductVariant, 
  CartItem, 
  DeliveryDetails, 
  Category, 
  SavedOrder, 
  UserProfile,
  OrderStatusStep
} from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PremiumProductsSection } from './components/PremiumProductsSection';
import { ProductCatalog } from './components/ProductCatalog';
import { CustomBoxBuilder } from './components/CustomBoxBuilder';
import { PoliciesSection } from './components/PoliciesSection';
import { BrandStory } from './components/BrandStory';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { OccasionQuizModal } from './components/OccasionQuizModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { ProfileModal } from './components/ProfileModal';
import { TechPartnerQuote } from './components/TechPartnerQuote';
import { AuthModal } from './components/AuthModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { DEFAULT_ORDERS } from './data/defaultOrders';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  
  // Cart items with persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('tgg_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Saved orders history with persistence, defaulting to active Pakistani studio queue
  const [savedOrders, setSavedOrders] = useState<SavedOrder[]>(() => {
    try {
      const saved = localStorage.getItem('tgg_saved_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
      return DEFAULT_ORDERS;
    } catch {
      return DEFAULT_ORDERS;
    }
  });

  // User Profile state with persistence
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('tgg_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Modals visibility state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [profileInitialTab, setProfileInitialTab] = useState<'profile' | 'orders' | 'loyalty' | 'partner' | 'premium'>('profile');
  const [trackingOrderId, setTrackingOrderId] = useState<string | undefined>(undefined);

  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [modalVariant, setModalVariant] = useState<ProductVariant | undefined>(undefined);
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderId: string;
    details: DeliveryDetails;
    items: CartItem[];
    grandTotal: number;
  } | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tgg_cart_items', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Sync orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tgg_saved_orders', JSON.stringify(savedOrders));
    } catch (e) {
      console.error(e);
    }
  }, [savedOrders]);

  // Sync user profile to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('tgg_current_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('tgg_current_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (cat: Category | string) => {
    setSelectedCategory(cat as Category);
    scrollToSection('collections');
  };

  const handleQuickView = (product: Product, variant: ProductVariant) => {
    setModalProduct(product);
    setModalVariant(variant);
  };

  const handleAddToCart = (
    product: Product,
    variant: ProductVariant,
    customization?: {
      recipientName?: string;
      customNote?: string;
      addOns: { name: string; price: number }[];
    }
  ) => {
    const addOnsTotal = customization?.addOns.reduce((sum, a) => sum + a.price, 0) || 0;
    const finalUnitPrice = variant.price + addOnsTotal;

    const existingIndex = cartItems.findIndex(
      (item) =>
        item.productId === product.id &&
        item.variantName === variant.name &&
        item.recipientName === customization?.recipientName &&
        item.customizationNote === customization?.customNote
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += 1;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        productId: product.id,
        title: product.title,
        image: product.image,
        variantName: variant.name,
        unitPrice: finalUnitPrice,
        quantity: 1,
        recipientName: customization?.recipientName,
        customizationNote: customization?.customNote,
        addOns: customization?.addOns
      };
      setCartItems([...cartItems, newItem]);
    }

    setIsCartOpen(true);
  };

  const handleAddCustomBoxToCart = (item: CartItem) => {
    setCartItems([...cartItems, item]);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
    } else {
      setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQty } : item)));
    }
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleOpenTracker = (orderId?: string) => {
    setTrackingOrderId(orderId);
    setIsTrackerOpen(true);
  };

  const handleOpenProfileTab = (tab: 'profile' | 'orders' | 'loyalty' | 'partner' | 'premium') => {
    setProfileInitialTab(tab);
    setIsProfileOpen(true);
  };

  const handlePlaceOrder = (details: DeliveryDetails, grandTotal: number) => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `TGG-${randomNum}`;

    const pointsRedeemed = details.pointsRedeemed || 0;
    const earnedMultiplier = currentUser?.isPremiumMember ? 1.5 : 1;
    const pointsEarned = Math.floor(grandTotal / 50) * earnedMultiplier;

    const newSavedOrder: SavedOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      status: 'payment_verification',
      statusNotes: 'Awaiting 100% advance payment screenshot via Bank / JazzCash / EasyPaisa (Policy #6).',
      details,
      items: [...cartItems],
      grandTotal,
      pointsEarned,
      pointsRedeemed
    };

    setSavedOrders([newSavedOrder, ...savedOrders]);

    // Update currentUser loyalty points if logged in
    if (currentUser) {
      let currentPts = currentUser.loyaltyPoints || 0;
      const history = [...(currentUser.pointsHistory || [])];
      const todayStr = new Date().toLocaleDateString('en-PK', { month: 'short', day: 'numeric', year: 'numeric' });

      // Deduct redeemed points
      if (pointsRedeemed > 0) {
        currentPts = Math.max(0, currentPts - pointsRedeemed);
        history.unshift({
          id: `txn-${Date.now()}-red`,
          date: todayStr,
          orderId,
          description: `Redeemed on Order #${orderId}`,
          points: pointsRedeemed,
          type: 'redeemed'
        });
      }

      // Add earned points
      if (pointsEarned > 0) {
        currentPts += pointsEarned;
        history.unshift({
          id: `txn-${Date.now()}-earn`,
          date: todayStr,
          orderId,
          description: `Points Earned on Order #${orderId}`,
          points: pointsEarned,
          type: 'earned'
        });
      }

      const updatedUser: UserProfile = {
        ...currentUser,
        loyaltyPoints: currentPts,
        pointsHistory: history
      };

      setCurrentUser(updatedUser);
    }

    setConfirmedOrder({
      orderId,
      details,
      items: [...cartItems],
      grandTotal
    });

    setCartItems([]);
    setIsCartOpen(false);
  };

  const handleUpdateOrderStatus = (
    orderId: string, 
    newStatus: OrderStatusStep, 
    notes?: string, 
    riderName?: string, 
    riderContact?: string
  ) => {
    const updated = savedOrders.map((order) => {
      if (order.orderId === orderId) {
        return {
          ...order,
          status: newStatus,
          statusNotes: notes || order.statusNotes,
          riderName: riderName !== undefined ? riderName : order.riderName,
          riderContact: riderContact !== undefined ? riderContact : order.riderContact
        };
      }
      return order;
    });
    setSavedOrders(updated);
  };

  const handleAddManualOrder = (newOrder: SavedOrder) => {
    setSavedOrders([newOrder, ...savedOrders]);
  };

  const handleResetOrders = () => {
    setSavedOrders(DEFAULT_ORDERS);
    try {
      localStorage.setItem('tgg_saved_orders', JSON.stringify(DEFAULT_ORDERS));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#14382C]">
      {/* Navigation Bar */}
      <Navbar
        cartCount={totalCartCount}
        currentUser={currentUser}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenTracker={() => handleOpenTracker()}
        onOpenProfile={() => setIsProfileOpen(true)}
        onSelectCategory={handleSelectCategory}
        onScrollToPolicies={() => scrollToSection('policies')}
        onScrollToBuilder={() => scrollToSection('builder')}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Experience */}
      <main className="flex-1 pb-16 md:pb-0">
        {/* Hero Section */}
        <Hero
          onExplore={() => scrollToSection('premium-products')}
          onCustomBox={() => scrollToSection('builder')}
        />

        {/* Global Tech Partner Quote on behalf of MetaWave Innovations LTD */}
        <TechPartnerQuote />

        {/* Section: Explore Our Premium Products (Exact match to uploaded post image) */}
        <div id="premium-products">
          <PremiumProductsSection
            onSelectCategory={handleSelectCategory}
            onOpenBuilder={() => scrollToSection('builder')}
          />
        </div>

        {/* Curated Product Catalog */}
        <ProductCatalog
          products={PRODUCTS}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          onQuickView={handleQuickView}
          onAddToCart={(prod, variant) => handleAddToCart(prod, variant)}
        />

        {/* Bespoke Gift Box Studio */}
        <CustomBoxBuilder onAddCustomBoxToCart={handleAddCustomBoxToCart} />

        {/* Brand Story & Unboxing Proof */}
        <BrandStory />

        {/* 9 Customer & Order Policies from authentic poster */}
        <PoliciesSection />
      </main>

      {/* Footer */}
      <Footer
        onScrollToPolicies={() => scrollToSection('policies')}
        onScrollToBuilder={() => scrollToSection('builder')}
        onSelectCategory={handleSelectCategory}
        onOpenTracker={() => handleOpenTracker()}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Product Detail Modal */}
      <ProductModal
        product={modalProduct}
        initialVariant={modalVariant}
        onClose={() => setModalProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        currentUser={currentUser}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onPlaceOrder={handlePlaceOrder}
      />

      {/* Gift Concierge Quiz Modal */}
      <OccasionQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectProduct={handleQuickView}
      />

      {/* Order Confirmation & Payment Modal */}
      <OrderConfirmationModal
        isOpen={!!confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
        onTrackOrder={handleOpenTracker}
        orderDetails={confirmedOrder}
      />

      {/* Live Order Tracker Modal */}
      <OrderTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        initialOrderId={trackingOrderId}
        savedOrders={savedOrders}
      />

      {/* Profile & Settings Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        currentUser={currentUser}
        savedOrders={savedOrders}
        onUpdateProfile={(updated) => setCurrentUser(updated)}
        onLogout={() => setCurrentUser(null)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenTracker={handleOpenTracker}
        initialTab={profileInitialTab}
      />

      {/* Cloudflare-Verified Login / Signup Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setIsAuthOpen(false);
          setIsProfileOpen(true);
        }}
        onOpenTracker={() => {
          setIsAuthOpen(false);
          handleOpenTracker();
        }}
      />

      {/* Studio Operations Admin Panel (Owners, Admins, Managers) */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        savedOrders={savedOrders}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onAddManualOrder={handleAddManualOrder}
        onOpenTracker={handleOpenTracker}
        onResetOrders={handleResetOrders}
      />
    </div>
  );
}

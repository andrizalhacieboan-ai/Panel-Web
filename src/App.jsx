import { CartProvider } from './components/CartContext';
import ParticleBackground from './components/ParticleBackground'; 
import Navbar from './components/Navbar'; 
import Hero from './components/Hero'; 
import Features from './components/Features'; 
import Pricing from './components/Pricing'; 
import WhyChooseUs from './components/WhyChooseUs'; 
import Footer from './components/Footer';
import FloatingCart from './components/FloatingCart';
import CartDrawer from './components/CartDrawer';
import { useState } from 'react';
import CheckoutModal from './components/CheckoutModal';

export default function App() {
  const [checkoutPaket, setCheckoutPaket] = useState(null);
  const [isOpenCheckout, setIsOpenCheckout] = useState(false);
  const [initialOwnerName, setInitialOwnerName] = useState('');

  const handleOpenCheckout = (paket, ownerName = '') => {
    setCheckoutPaket(paket);
    setInitialOwnerName(ownerName);
    setIsOpenCheckout(true);
  };

  return (
    <CartProvider>
      <div className="relative min-h-screen bg-gradient-to-b from-cyber-dark via-cyber-deep to-cyber-dark">
        <ParticleBackground />
        <div className="relative z-10">
          <Navbar />
          <Hero />
          <Features />
          <Pricing onDirectCheckout={handleOpenCheckout} /> 
          <WhyChooseUs />
          <Footer />
        </div>
        
        <FloatingCart />
        <CartDrawer onCheckoutItem={(item) => handleOpenCheckout(item.paket, item.ownerName)} />
        
        <CheckoutModal 
          isOpen={isOpenCheckout} 
          onClose={() => setIsOpenCheckout(false)} 
          paket={checkoutPaket} 
          initialOwnerName={initialOwnerName} 
        />
      </div>
    </CartProvider>
  );
}

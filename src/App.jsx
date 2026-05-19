import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import CheckoutModal from './components/CheckoutModal';
import DeveloperPage from './components/DeveloperPage';
import { useState } from 'react';

// Komponen untuk Landing Page (Index)
function LandingPage({ handleOpenCheckout }) {
  return (
    <>
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
    </>
  );
}

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
    <BrowserRouter>
      <CartProvider>
        <div className="relative min-h-screen bg-gradient-to-b from-cyber-dark via-cyber-deep to-cyber-dark">
          
          <Routes>
            {/* Route Beranda */}
            <Route path="/" element={<LandingPage handleOpenCheckout={handleOpenCheckout} />} />
            
            {/* Route Developer Page */}
            <Route path="/developer" element={<DeveloperPage />} />
          </Routes>

          {/* Modal Checkout Global (Bisa dipanggil dari mana saja) */}
          <CheckoutModal 
            isOpen={isOpenCheckout} 
            onClose={() => setIsOpenCheckout(false)} 
            paket={checkoutPaket} 
            initialOwnerName={initialOwnerName} 
          />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

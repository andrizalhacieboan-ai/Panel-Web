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
import PromoBanner from './components/PromoBanner';
import DeveloperPage from './pages/DeveloperPage';
import AdminPage from './pages/AdminPage';
import { useState } from 'react';
import TransactionHistory from './components/TransactionHistory';



function LandingPage({ handleOpenCheckout }) {
  return (
    <>
      <ParticleBackground />
      <PromoBanner />
      <div className="relative z-10 pt-52 md:pt-64">
        <Navbar />
        <Hero />
        <Features />
        <Pricing onDirectCheckout={handleOpenCheckout} /> 
        <WhyChooseUs />
        <TransactionHistory /> {/* <-- Sisipkan di sini */}
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
            <Route path="/" element={<LandingPage handleOpenCheckout={handleOpenCheckout} />} />
            <Route path="/developer" element={<DeveloperPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>

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

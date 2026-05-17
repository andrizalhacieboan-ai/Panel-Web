import ParticleBackground from './components/ParticleBackground'; import Navbar from './components/Navbar'; import Hero from './components/Hero'; import Features from './components/Features'; import Pricing from './components/Pricing'; import WhyChooseUs from './components/WhyChooseUs'; import Footer from './components/Footer';
export default function App() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-cyber-dark via-cyber-deep to-cyber-dark">
      <ParticleBackground />
      <div className="relative z-10"><Navbar /><Hero /><Features /><Pricing /><WhyChooseUs /><Footer /></div>
    </div>
  );
}
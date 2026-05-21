import { useState } from 'react'; 
import { Link } from 'react-router-dom';
import { FaDiscord } from 'react-icons/fa';

const menuItems = [
  { label: 'BERANDA', href: '#beranda', active: true, isRoute: false }, 
  { label: 'FITUR', href: '#fitur', active: false, isRoute: false }, 
  { label: 'HARGA', href: '#harga', active: false, isRoute: false }, 
  { label: 'TENTANG', href: '#tentang', active: false, isRoute: false }, 
  { label: 'DEVELOPER', href: '/developer', active: false, isRoute: true },
  { label: 'KONTAK', href: '#kontak', active: false, isRoute: false }
];

export function HexLogo({ size = 'w-9 h-9', textSize = 'text-xs' }) { 
  return (<div className={`${size} hexagon bg-gradient-to-br from-neon-purple to-neon-purple-dark flex items-center justify-center shadow-[0_0_12px_rgba(168,85,247,0.4)]`}><span className={`${textSize} font-heading font-black text-white tracking-wider`}>AS</span></div>); 
}

export default function Navbar() { 
  const [m, sm] = useState(false); 
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-cyber-dark/80 backdrop-blur-md border-b border-neon-purple/20">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Link to="/"><HexLogo /></Link>
          <Link to="/" className="font-heading font-bold text-white text-sm tracking-wide hidden sm:block">ANDRI STORE</Link>
        </div>
        
        <div className="hidden lg:flex items-center gap-1">
          {menuItems.map((item) => (
            item.isRoute ? (
              <Link key={item.label} to={item.href} className="px-3 py-1.5 rounded-full text-xs font-heading font-semibold tracking-wider transition-all text-gray-400 hover:text-white hover:bg-white/5">
                {item.label}
              </Link>
            ) : (
              <a key={item.label} href={item.href} className={`px-3 py-1.5 rounded-full text-xs font-heading font-semibold tracking-wider transition-all ${item.active ? 'text-white bg-neon-purple/20 border-b-2 border-neon-purple' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                {item.label}
              </a>
            )
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a href="#" className="w-9 h-9 rounded-full border border-neon-purple/30 flex items-center justify-center text-neon-purple hover:bg-neon-purple/10"><FaDiscord size={16} /></a>
          <a href="#" className="btn-glow px-4 py-2 rounded-full bg-gradient-to-r from-neon-purple to-neon-purple-dark text-white text-xs font-heading font-bold">PANEL LOGIN →</a>
          <button onClick={() => sm(!m)} className="lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-1"><span className={`w-5 h-0.5 bg-white transition-all ${m ? 'rotate-45 translate-y-1.5' : ''}`} /><span className={`w-5 h-0.5 bg-white transition-all ${m ? 'opacity-0' : ''}`} /><span className={`w-5 h-0.5 bg-white transition-all ${m ? '-rotate-45 -translate-y-1.5' : ''}`} /></button>
        </div>
      </div>
      
      {m && (
        <div className="lg:hidden mt-1 glass rounded-2xl p-4 flex flex-col gap-2 mx-4">
          {menuItems.map((item) => (
            item.isRoute ? (
              <Link key={item.label} to={item.href} onClick={() => sm(false)} className="px-4 py-2.5 rounded-xl text-sm font-heading font-semibold text-gray-400 hover:text-white">{item.label}</Link>
            ) : (
              <a key={item.label} href={item.href} onClick={() => sm(false)} className={`px-4 py-2.5 rounded-xl text-sm font-heading font-semibold ${item.active ? 'text-white bg-neon-purple/20' : 'text-gray-400 hover:text-white'}`}>{item.label}</a>
            )
          ))}
        </div>
      )}
    </nav>
  ); 
}

import { useState } from 'react'; 
import { useScrollAnimation } from '../hooks/useScrollAnimation'; 
import CheckoutModal from './CheckoutModal'; 
import { FaCrown, FaMapMarkedAlt, FaServer } from 'react-icons/fa';

const paketList = [
  { type: "panel", name: "1GB RAM", ram: "1gb", harga: 2000 }, { type: "panel", name: "2GB RAM", ram: "2gb", harga: 4000 },
  { type: "panel", name: "3GB RAM", ram: "3gb", harga: 6000 }, { type: "panel", name: "4GB RAM", ram: "4gb", harga: 8000 },
  { type: "panel", name: "5GB RAM", ram: "5gb", harga: 10000 }, { type: "panel", name: "6GB RAM", ram: "6gb", harga: 12000 },
  { type: "panel", name: "7GB RAM", ram: "7gb", harga: 14000 }, { type: "panel", name: "8GB RAM", ram: "8gb", harga: 16000 },
  { type: "panel", name: "9GB RAM", ram: "9gb", harga: 18000 }, { type: "panel", name: "10GB RAM", ram: "10gb", harga: 19000 },
  { type: "panel", name: "Unlimited RAM", ram: "unlimited", harga: 20000 }, { type: "admin", name: "Admin Panel", ram: null, harga: 25000 },
];

export default function Pricing() { 
  const [sp, ssp] = useState(null); 
  const [m, sm] = useState(false); 
  const [ref, isVisible] = useScrollAnimation(); 
  
  return (
    <section id="harga" className="relative py-24 px-4">
      <div ref={ref} className={`max-w-7xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-4">PILIH <span className="text-neon-purple">PAKET</span> KAMU</h2>
          <div className="neon-line w-32 mx-auto" />
        </div>

        {/* Top Featured Banner (Masih pakai gambar map sebelumnya) */}
        <div className="w-full rounded-2xl overflow-hidden border border-neon-purple/30 shadow-[0_0_30px_rgba(168,85,247,0.15)] mb-16 relative group card-3d">
          <img 
            src="https://c.termai.cc/i181/RG3.jpg" 
            alt="Server Map Showcase" 
            className="w-full aspect-[21/9] md:aspect-[3/1] object-cover transition-transform duration-700 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cyber-dark via-cyber-dark/70 to-transparent"></div>
          <div className="absolute top-0 left-0 h-full flex flex-col justify-center p-8 md:p-12 z-10">
            <div className="flex items-center gap-2 text-neon-purple-light mb-2">
              <FaMapMarkedAlt className="text-xl" />
              <span className="font-heading font-bold text-sm tracking-widest uppercase">Network Status</span>
            </div>
            <h3 className="font-heading font-black text-2xl md:text-4xl text-white mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              HIGH PERFORMANCE SERVER
            </h3>
            <p className="text-gray-300 text-sm md:text-base max-w-md">
              Mainkan di server dengan performa terbaik dan DDoS protection 24/7 tanpa lag!
            </p>
          </div>
        </div>

        {/* Grid Paket Harga dengan Banner Masing-masing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paketList.map((p) => (
            <div key={p.name} className={`glass-card card-3d rounded-2xl overflow-hidden flex flex-col group relative ${p.type === 'admin' ? 'border-yellow-500/30' : ''}`}>
              
              {/* Banner Gambar di Atas Card */}
              <div className="relative w-full aspect-video overflow-hidden">
                <img 
                  src="https://c.termai.cc/i100/8UN2g.jpeg" 
                  alt={`${p.name} Server`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                {/* Gradient overlay di bawah banner agar menyatu dengan card */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0420] via-transparent to-transparent opacity-80"></div>
                
                {/* Badge di atas gambar */}
                {p.type === 'admin' && (
                  <div className="absolute top-3 right-3 bg-yellow-500 text-black text-[10px] font-bold px-3 py-1 rounded-lg shadow-[0_0_10px_rgba(234,179,8,0.4)] flex items-center gap-1">
                    <FaCrown size={10} /> SPECIAL
                  </div>
                )}
                
                {/* Ikon di tengah bawah banner */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-10 h-10 rounded-xl bg-neon-purple/20 border border-neon-purple/40 backdrop-blur-md flex items-center justify-center text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                  {p.type === 'admin' ? <FaCrown className="text-yellow-400" /> : <FaServer />}
                </div>
              </div>

              {/* Konten Teks di Bawah Banner */}
              <div className="p-6 flex flex-col items-center text-center flex-1 pt-4">
                <h3 className="font-heading font-bold text-lg text-white mb-2 tracking-wide">{p.name}</h3>
                
                <div className="mb-1 mt-1">
                  <span className="text-xs text-gray-400">Rp</span>
                  <span className="text-3xl font-heading font-black text-neon-purple-light mx-1">{p.harga.toLocaleString('id-ID')}</span>
                </div>
                <p className="text-[11px] text-gray-500 mb-6">/bulan</p>
                
                <button 
                  onClick={() => { ssp(p); sm(true); }} 
                  className={`mt-auto w-full py-3 rounded-xl font-heading font-bold text-sm tracking-wider transition-all duration-300 backdrop-blur-sm ${
                    p.type === 'admin' 
                      ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black hover:shadow-[0_0_20px_rgba(234,179,8,0.4)]' 
                      : 'border border-neon-purple/40 text-neon-purple-light hover:bg-neon-purple/10 hover:border-neon-purple/70 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                  }`}
                >
                  BELI SEKARANG
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CheckoutModal isOpen={m} onClose={() => sm(false)} paket={sp} />
    </section>
  ); 
}

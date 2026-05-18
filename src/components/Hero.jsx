import { HexLogo } from './Navbar'; 
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function HexTag({ children }) { 
  return (
    <div className="inline-flex items-center gap-2 px-5 py-2.5 border border-neon-purple/40 rounded-xl bg-neon-purple/10 backdrop-blur-sm relative shadow-[0_0_15px_rgba(168,85,247,0.2)]">
      <span className="text-neon-purple text-lg">‹</span>
      <span className="font-heading font-bold text-sm tracking-[0.25em] text-white">{children}</span>
      <span className="text-neon-purple text-lg">›</span>
    </div>
  ); 
}

export default function Hero() { 
  const [ref, isVisible] = useScrollAnimation(); 
  
  return (
    <section id="beranda" className="relative pt-28 pb-20 px-4">
      <div ref={ref} className={`max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-1000 ease-out`}>
        
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full glass text-xs shadow-[0_0_15px_rgba(34,197,94,0.2)]">
            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            <span className="text-neon-green font-semibold font-heading tracking-wider">MENAMPILKAN SERVER LAIN</span>
          </div>
          <p className="text-gray-500 text-xs mb-6">Tidak ada server lain yang dapat ditampilkan.</p>
          
          <h1 className="chrome-text chrome-glow font-heading font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none mb-3" data-text="Andri store">
            Andri store
          </h1>
          
          <p className="font-heading italic text-neon-purple-light text-xl sm:text-2xl mb-8 tracking-wide drop-shadow-[0_0_8px_rgba(192,132,252,0.4)]">
            Oleh Andri
          </p>
          
          <div className="mb-10 flex justify-center lg:justify-start">
            <HexTag>SERVER HOSTING SOLUSI TERBAIK</HexTag>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <a href="#harga" className="btn-glow px-10 py-4 rounded-xl bg-gradient-to-r from-neon-purple to-neon-purple-dark text-white font-heading font-bold text-base tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
              <span>⚡</span> LIHAT PAKET
            </a>
            <a href="#kontak" className="px-10 py-4 rounded-xl border border-neon-purple/30 text-neon-purple-light font-heading font-bold text-base tracking-wider hover:bg-neon-purple/5 hover:border-neon-purple/50 transition-all duration-300 flex items-center gap-2 backdrop-blur-sm">
              <span>🎧</span> HUBUNGI KAMI
            </a>
          </div>
        </div>

        {/* Right Video Content - Aspect Rasio 16:9 (Persegi Panjang) */}
        <div className="flex-1 w-full max-w-2xl" style={{ perspective: '1000px' }}>
          <div className="relative rounded-2xl overflow-hidden border-2 border-neon-purple/30 shadow-[0_0_50px_rgba(168,85,247,0.2)] transition-all duration-700 hover:shadow-[0_0_80px_rgba(168,85,247,0.4)] hover:border-neon-purple/50 group">
            
            {/* Video Element 16:9 */}
            <div className="relative aspect-video bg-cyber-dark">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover scale-105 transition-transform duration-700 group-hover:scale-110"
              >
                <source src="https://c.termai.cc/v159/zXi.mp4" type="video/mp4" />
              </video>
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-transparent to-transparent opacity-60 pointer-events-none"></div>
              <div className="absolute inset-0 scan-lines pointer-events-none opacity-30"></div>
            </div>

            {/* Floating 3D Hexagon */}
            <div className="absolute -bottom-4 -right-4 animate-float-3d z-20">
              <div className="w-14 h-14 hexagon bg-gradient-to-br from-neon-purple to-neon-purple-dark flex items-center justify-center shadow-[0_0_25px_rgba(168,85,247,0.6)] border border-neon-purple-light/20">
                <span className="text-sm font-heading font-black text-white">AS</span>
              </div>
            </div>

            {/* Decorative top glow */}
            <div className="absolute -top-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-neon-purple to-transparent animate-pulse"></div>
          </div>
        </div>

      </div>
    </section>
  ); 
}

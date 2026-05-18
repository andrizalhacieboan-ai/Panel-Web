import { useScrollAnimation } from '../hooks/useScrollAnimation';
const reasons = [
  { icon: '🛡️', title: 'AMAN & TERPERCAYA', desc: 'Data aman & terlindungi sepenuhnya' }, 
  { icon: '⚡', title: 'PENGATURAN INSTAN', desc: 'Aktivasi instan dalam hitungan detik' }, 
  { icon: '🎛️', title: 'PANEL KONTROL', desc: 'Panel modern, mudah dan responsif' }, 
  { icon: '🏷️', title: 'HARGA BERSAHABAT', desc: 'Kualitas premium dengan harga terbaik' }
];
export default function WhyChooseUs() { 
  const [ref, isVisible] = useScrollAnimation(); 
  return (
    <section id="tentang" className="relative py-24 px-4">
      <div ref={ref} className={`max-w-6xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="neon-line w-20 sm:w-40" />
            <div className="w-3 h-3 rotate-45 bg-neon-purple/80 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
            <h2 className="font-heading font-bold text-2xl sm:text-4xl text-neon-purple-light tracking-wider">KENAPA PILIH KAMI?</h2>
            <div className="w-3 h-3 rotate-45 bg-neon-purple/80 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
            <div className="neon-line w-20 sm:w-40" />
          </div>
        </div>
        <div className="glass-card rounded-3xl p-8 sm:p-10 border border-neon-purple/20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {reasons.map((r, i) => (
              <div key={r.title} className="text-center p-4 rounded-2xl hover:bg-neon-purple/5 transition-all duration-500 relative group">
                {i < reasons.length - 1 && (<div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-20 bg-gradient-to-b from-transparent via-neon-purple/30 to-transparent group-hover:opacity-0" />)}
                <div className="text-4xl mb-4 drop-shadow-[0_0_5px_rgba(168,85,247,0.3)]">{r.icon}</div>
                <h3 className="font-heading font-bold text-sm tracking-wider text-white mb-2">{r.title}</h3>
                <p className="text-gray-400 text-sm">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  ); 
}

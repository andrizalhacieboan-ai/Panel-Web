import { useScrollAnimation } from '../hooks/useScrollAnimation';

const features = [
  { icon: '🚀', title: 'PERFORMA TINGGI', desc: 'Hardware NVMe SSD dan CPU terbaik untuk performa maksimal tanpa lag.' },
  { icon: '🛡️', title: 'PERLINDUNGAN ANTI DDOS', desc: 'Perlindungan penuh dari serangan DDoS untuk server selalu online.' },
  { icon: '⏰', title: 'UPTIME 99.9%', desc: 'Uptime stabil 24/7 untuk pengalaman bermain tanpa henti.' },
  { icon: '🎧', title: 'DUKUNGAN 24/7', desc: 'Tim support siap membantu kapan saja dengan respon cepat.' },
];

export default function Features() { 
  const [ref, isVisible] = useScrollAnimation(); 
  
  return (
    <section id="fitur" className="relative py-24 px-4">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-4">FITUR <span className="text-neon-purple">UNGGULAN</span></h2>
          <div className="neon-line w-32 mx-auto" />
        </div>
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {features.map((f, i) => (
            <div key={f.title} className="glass-card card-3d rounded-2xl p-8 text-center group" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center text-4xl shadow-[0_0_20px_rgba(168,85,247,0.15)] group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] group-hover:bg-neon-purple/20 transition-all duration-500 group-hover:scale-110">
                {f.icon}
              </div>
              <h3 className="font-heading font-bold text-base tracking-wider text-white mb-4 group-hover:text-neon-purple-light transition-colors duration-300">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  ); 
}

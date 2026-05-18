import { FaDiscord, FaWhatsapp, FaGithub } from 'react-icons/fa'; import { HexLogo } from './Navbar';
export default function Footer() { 
  return (
    <footer id="kontak" className="relative pt-20 pb-8 px-4 border-t border-neon-purple/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5"><HexLogo size="w-12 h-12" textSize="text-base" /><span className="font-heading font-bold text-xl text-white tracking-wide">ANDRI STORE</span></div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">Solusi hosting terbaik untuk server game kamu. Cepat, stabil, aman, dan selalu online.</p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-10 h-10 rounded-xl border border-neon-purple/20 flex items-center justify-center text-neon-purple hover:bg-neon-purple/10 hover:border-neon-purple/50 transition-all" aria-label="Discord"><FaDiscord size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-xl border border-neon-purple/20 flex items-center justify-center text-neon-purple hover:bg-neon-purple/10 hover:border-neon-purple/50 transition-all" aria-label="WhatsApp"><FaWhatsapp size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-xl border border-neon-purple/20 flex items-center justify-center text-neon-purple hover:bg-neon-purple/10 hover:border-neon-purple/50 transition-all" aria-label="GitHub"><FaGithub size={18} /></a>
            </div>
          </div>
          <div><h4 className="font-heading font-bold text-sm tracking-widest text-white mb-5">MENU</h4><ul className="space-y-3">{['Beranda', 'Fitur', 'Harga', 'Tentang Kami', 'Kontak'].map((item) => (<li key={item}><a href="#" className="text-gray-400 text-sm hover:text-neon-purple-light transition-colors flex items-center gap-2"><span className="text-neon-purple/40 text-xs">›</span> {item}</a></li>))}</ul></div>
          <div><h4 className="font-heading font-bold text-sm tracking-widest text-white mb-5">DUKUNGAN</h4><ul className="space-y-3">{['Kirim Tiket', 'Basis Pengetahuan', 'Status Server', 'Hubungi Kami'].map((item) => (<li key={item}><a href="#" className="text-gray-400 text-sm hover:text-neon-purple-light transition-colors flex items-center gap-2"><span className="text-neon-purple/40 text-xs">›</span> {item}</a></li>))}</ul></div>
          <div><h4 className="font-heading font-bold text-sm tracking-widest text-white mb-5">KONTAK</h4><ul className="space-y-4"><li className="flex items-start gap-3"><span className="text-lg">✉️</span><div><p className="text-gray-500 text-xs mb-1">Email</p><a href="mailto:support@wasshop.my.id" className="text-gray-300 text-sm hover:text-neon-purple-light transition-colors">support@wasshop.my.id</a></div></li><li className="flex items-start gap-3"><span className="text-lg">📱</span><div><p className="text-gray-500 text-xs mb-1">WhatsApp</p><a href="https://wa.me/6281934874758" className="text-gray-300 text-sm hover:text-neon-purple-light transition-colors">+6281934874758</a></div></li></ul></div>
        </div>
        <div className="neon-line mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© 2026 ANDRI STORE. Semua Hak Dilindungi Undang-Undang.</p>
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-neon-green animate-pulse shadow-[0_0_5px_rgba(34,197,94,0.5)]" /><span className="text-neon-green/90 font-medium">Semua Sistem Beroperasi</span></div>
        </div>
      </div>
    </footer>
  ); 
}

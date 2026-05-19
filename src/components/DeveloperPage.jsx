import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaGithub, FaDiscord, FaInstagram, FaEnvelope, FaCode, FaServer, FaYoutube, FaLock, FaUpload } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import axios from 'axios';

export default function DeveloperPage() {
  const devData = {
    name: "ANDRI STORE",
    role: "Fullstack Developer",
    age: "24 Tahun",
    location: "Pekanbaru, Indonesia",
    email: "andrizalhacieboan@gmail.com",
    bio: "Seorang developer yang passionate dalam membangun sistem otomasi, web hosting, bot whatsapp dan bot telegram. Suka tantangan dan selalu belajar hal baru setiap hari.",
    skills: ["Node.js", "React.js", "Python", "PHP", "JavaScript", "TypeScript", "API Integration", "MySQL"],
    socials: {
      youtube: "https://www.youtube.com/@andristoreID",
      tiktok: "https://www.tiktok.com/@limabelasjuny15?_r=1&_t=ZS-96Tx2XOPtAq",
      instagram: "https://www.instagram.com/limabelasjuny15?igsh=MXJlMHdyb3F2ZXRnYQ=="
    }
  };

  // State untuk Admin Panel
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [imageUrl, setImageUrl] = useState('');
  const [promoText, setPromoText] = useState('');
  const [uploadMsg, setUploadMsg] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'andriyt' && password === 'andri2002') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Username atau password salah!');
    }
  };

    const handleUploadBanner = async (e) => {
    e.preventDefault();
    setUploadMsg('⏳ Mengunggah banner...');
    try {
      const res = await axios.post('/api/banners/add', { username, password, imageUrl, text: promoText });
      if (res.data.success) {
        setUploadMsg('✅ Banner berhasil ditambahkan.');
        setImageUrl('');
        setPromoText('');
      } else {
        setUploadMsg('❌ Gagal: ' + res.data.message);
      }
    } catch (err) {
      // Menampilkan error asli dari backend Vercel
      const serverError = err.response?.data?.message || err.message;
      setUploadMsg('❌ Error Server: ' + serverError);
      console.error("Upload Error Details:", err.response);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0204] via-[#1a0800] to-[#050005] text-white font-body relative overflow-hidden">
      {/* Background Orbs */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-orange-500/5 blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-amber-600/5 blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 pt-40 animate-fade-in-up-orange"> {/* Tambahkan pt-40 di sini */}
        
        <Link to="/" className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-heading font-bold text-sm mb-10 transition-colors group">
          <FaArrowLeft className="group-hover:-translate-x-2 transition-transform duration-300" /> Kembali ke Beranda
        </Link>


        <div className="card-3d-orange bg-[#120500]/60 backdrop-blur-xl border border-orange-500/20 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(249,115,22,0.1)] relative overflow-hidden mb-10">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-80"></div>
          {/* ... (Biodata Developer tetap sama persis seperti kode Anda sebelumnya, dari div flex foto sampai sosial media) ... */}
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-shrink-0 relative group animate-float-3d-orange" style={{ perspective: '800px' }}>
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full border-4 border-orange-500/50 bg-black/50 flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.3)] group-hover:shadow-[0_0_60px_rgba(249,115,22,0.6)] transition-all duration-500 relative overflow-hidden">
                <img src="https://c.termai.cc/i144/CTQEXTa.jpeg" alt="ⓒ ANDRI STORE" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="absolute inset-0 w-48 h-48 md:w-56 md:h-56 rounded-full border border-orange-500/10 scale-125 animate-pulse"></div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="font-heading font-black text-4xl md:text-5xl bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent mb-2 drop-shadow-[0_0_10px_rgba(249,115,22,0.4)]">{devData.name}</h1>
              <p className="font-heading text-lg text-orange-200/80 mb-5 flex items-center justify-center md:justify-start gap-2"><FaCode className="text-orange-500" /> {devData.role}</p>
              <div className="space-y-3 text-gray-300 text-sm mb-6">
                <p className="flex items-center justify-center md:justify-start gap-2"><span className="text-orange-500">📍</span> {devData.location} • {devData.age}</p>
                <p className="flex items-center justify-center md:justify-start gap-2"><span className="text-orange-500">✉️</span> {devData.email}</p>
              </div>
              <p className="text-gray-400 leading-relaxed italic border-l-2 border-orange-500/30 pl-4">"{devData.bio}"</p>
            </div>
          </div>
          <div className="mt-12 border-t border-orange-500/10 pt-8">
            <h3 className="font-heading font-bold text-xl text-orange-400 mb-5 flex items-center gap-2"><FaServer /> Tech Stack & Skills</h3>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {devData.skills.map((skill, i) => (
                <span key={i} className="px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-200 text-xs font-heading font-bold tracking-wider hover:bg-orange-500/20 hover:shadow-[0_0_10px_rgba(249,115,22,0.2)] hover:-translate-y-1 transition-all duration-300 cursor-default">{skill}</span>
              ))}
            </div>
          </div>
          <div className="mt-12 border-t border-orange-500/10 pt-8">
            <h3 className="font-heading font-bold text-xl text-orange-400 mb-5">Sosial Media</h3>
            <div className="flex gap-4 justify-center md:justify-start">
              <a href={devData.socials.youtube} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-300 hover:bg-red-600/20 hover:text-white hover:border-red-500/50 transition-all duration-300 hover:-translate-y-1"><FaYoutube size={22} /></a>
              <a href={devData.socials.tiktok} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-300 hover:bg-cyan-600/20 hover:text-white hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1"><SiTiktok size={20} /></a>
              <a href={devData.socials.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-300 hover:bg-pink-600/20 hover:text-white hover:border-pink-500/50 transition-all duration-300 hover:-translate-y-1"><FaInstagram size={22} /></a>
              <a href={`mailto:${devData.email}`} className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-300 hover:bg-orange-600/20 hover:text-white hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-1"><FaEnvelope size={20} /></a>
            </div>
          </div>
        </div>

        {/* ===== ADMIN PANEL: MANAJEMEN BANNER ===== */}
        <div className="card-3d-orange bg-[#120500]/60 backdrop-blur-xl border border-red-500/30 rounded-3xl p-8 md:p-10 shadow-[0_0_50px_rgba(220,38,38,0.1)] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-80"></div>
          
          <h2 className="font-heading font-bold text-2xl text-red-400 mb-6 flex items-center gap-3">
            <FaLock /> Admin Panel
          </h2>

          {!isLoggedIn ? (
            <form onSubmit={handleLogin} className="space-y-4 max-w-sm">
              <p className="text-gray-400 text-sm mb-4">Masuk untuk menu spesial.</p>
              {loginError && <p className="text-red-400 text-sm bg-red-500/10 p-2 rounded-lg">{loginError}</p>}
              <input 
                type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/30 border border-orange-500/20 text-white focus:outline-none focus:border-red-500 transition-all"
                required
              />
              <input 
                type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/30 border border-orange-500/20 text-white focus:outline-none focus:border-red-500 transition-all"
                required
              />
              <button type="submit" className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-xl font-heading font-bold tracking-wider transition-all text-white shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                LOGIN
              </button>
            </form>
          ) : (
            <form onSubmit={handleUploadBanner} className="space-y-4">
              <p className="text-green-400 text-sm mb-4">✔️ Login berhasil.</p>
              {uploadMsg && <p className="text-sm bg-black/20 p-2 rounded-lg border border-orange-500/20 text-orange-300">{uploadMsg}</p>}
              <input 
                type="url" placeholder="URL Gambar Banner (contoh: https://imgur.com/gambar.png)" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/30 border border-orange-500/20 text-white focus:outline-none focus:border-orange-500 transition-all"
                required
              />
              <input 
                type="text" placeholder="Teks Promosi (contoh: Diskon 50% Semua Paket Server!)" value={promoText} onChange={(e) => setPromoText(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/30 border border-orange-500/20 text-white focus:outline-none focus:border-orange-500 transition-all"
                required
              />
              <button type="submit" className="w-full py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 rounded-xl font-heading font-bold tracking-wider transition-all text-white shadow-[0_0_15px_rgba(249,115,22,0.3)] flex items-center justify-center gap-2">
                <FaUpload /> UPLOAD BANNER
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}

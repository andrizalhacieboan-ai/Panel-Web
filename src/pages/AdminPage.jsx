import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaLock, FaUpload, FaShieldAlt } from 'react-icons/fa';
import axios from 'axios';

export default function AdminPage() {
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
        setUploadMsg('✅ Banner berhasil ditambahkan! Refresh halaman utama untuk melihatnya.');
        setImageUrl('');
        setPromoText('');
      } else {
        setUploadMsg('❌ Gagal: ' + res.data.message);
      }
    } catch (err) {
      const serverError = err.response?.data?.message || err.message;
      setUploadMsg('❌ Error Server: ' + serverError);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0204] via-[#1a0800] to-[#050005] text-white font-body relative overflow-hidden flex items-center justify-center p-4">
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-orange-500/5 blur-3xl pointer-events-none"></div>
      
      <div className="relative z-10 w-full max-w-lg animate-fade-in-up-orange">
        <Link to="/developer" className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-heading font-bold text-sm mb-8 transition-colors group">
          <FaArrowLeft className="group-hover:-translate-x-2 transition-transform duration-300" /> Kembali ke Developer
        </Link>

        <div className="card-3d-orange bg-[#120500]/60 backdrop-blur-xl border border-orange-500/20 rounded-3xl p-8 shadow-[0_0_50px_rgba(249,115,22,0.1)] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-80"></div>
          
          <h2 className="font-heading font-bold text-2xl text-orange-400 mb-6 flex items-center gap-3">
            <FaShieldAlt /> Admin Panel
          </h2>

          {!isLoggedIn ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <p className="text-gray-400 text-sm mb-4">Masuk untuk mengelola banner dan pengumuman.</p>
              {loginError && <p className="text-red-400 text-sm bg-red-500/10 p-2 rounded-lg">{loginError}</p>}
              <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-black/30 border border-orange-500/20 text-white focus:outline-none focus:border-orange-500 transition-all" required />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-black/30 border border-orange-500/20 text-white focus:outline-none focus:border-orange-500 transition-all" required />
              <button type="submit" className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-xl font-heading font-bold tracking-wider transition-all text-white shadow-[0_0_15px_rgba(220,38,38,0.3)] flex items-center justify-center gap-2">
                <FaLock /> LOGIN
              </button>
            </form>
          ) : (
            <form onSubmit={handleUploadBanner} className="space-y-4">
              <p className="text-green-400 text-sm mb-4">✔️ Login berhasil. Silakan upload banner baru.</p>
              {uploadMsg && <p className="text-sm bg-black/20 p-2 rounded-lg border border-orange-500/20 text-orange-300">{uploadMsg}</p>}
              <input type="url" placeholder="URL Gambar Banner (Aspect Landscape, cth: 1200x400)" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-black/30 border border-orange-500/20 text-white focus:outline-none focus:border-orange-500 transition-all" required />
              <input type="text" placeholder="Teks Promosi (Cth: Diskon 50% Semua Paket Server!)" value={promoText} onChange={(e) => setPromoText(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-black/30 border border-orange-500/20 text-white focus:outline-none focus:border-orange-500 transition-all" required />
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

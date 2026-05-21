import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';
import axios from 'axios';
import { FaArrowLeft, FaPhone, FaLock, FaUserPlus, FaSignInAlt } from 'react-icons/fa';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('⏳ Memproses...');
    try {
      if (isLogin) {
        const res = await login(phone, password);
        if (res.success) { navigate('/profile'); } else { setMsg('❌ ' + res.message); }
      } else {
        const res = await register(name, phone, password);
        if (res.success) { setMsg('✅ Daftar berhasil! Silakan login.'); setIsLogin(true); } else { setMsg('❌ ' + res.message); }
      }
    } catch (err) { setMsg('❌ Error server'); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-cyber-dark">
      <div className="w-full max-w-md glass-card rounded-2xl p-8 relative">
        <Link to="/" className="inline-flex items-center gap-2 text-neon-purple hover:text-white text-sm mb-6"><FaArrowLeft /> Beranda</Link>
        <h2 className="font-heading font-bold text-2xl text-white mb-6">{isLogin ? 'Login' : 'Daftar Akun'}</h2>
        {msg && <p className="text-sm text-center p-2 rounded-lg bg-black/20 border border-neon-purple/20 text-white mb-4">{msg}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (<input type="text" placeholder="Nama Lengkap" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-black/30 border border-neon-purple/20 text-white focus:outline-none focus:border-neon-purple" required />)}
          <input type="tel" placeholder="Nomor HP Anda" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-black/30 border border-neon-purple/20 text-white focus:outline-none focus:border-neon-purple" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-black/30 border border-neon-purple/20 text-white focus:outline-none focus:border-neon-purple" required />
          <button type="submit" className="w-full py-3 bg-gradient-to-r from-neon-purple to-neon-purple-dark text-white rounded-xl font-heading font-bold flex items-center justify-center gap-2">
            {isLogin ? <><FaSignInAlt /> LOGIN</> : <><FaUserPlus /> DAFTAR</>}
          </button>
        </form>
        <p className="text-center text-gray-400 text-sm mt-6">
          {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}
          <button onClick={() => { setIsLogin(!isLogin); setMsg(''); }} className="text-neon-purple-light font-bold ml-1 hover:underline">{isLogin ? 'Daftar' : 'Login'}</button>
        </p>
      </div>
    </div>
  );
}

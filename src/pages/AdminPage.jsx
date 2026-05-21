import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaLock, FaUpload, FaShieldAlt, FaWallet, FaHistory, FaPlayCircle, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Banner state
  const [imageUrl, setImageUrl] = useState('');
  const [deleteMsg, setDeleteMsg] = useState('');
  const [uploadMsg, setUploadMsg] = useState('');
  const [banners, setBanners] = useState([]); // State baru untuk menampung list banner

  // Admin Transaksi State
  const [transactions, setTransactions] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [txMsg, setTxMsg] = useState('');

  // Otomatis fetch banners & transaksi saat login sukses
  useEffect(() => {
    if (isLoggedIn) {
      fetchTransactions();
      fetchBanners();
    }
  }, [isLoggedIn]);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get('/api/admin/transactions');
      if (res.data.success) {
        setTransactions(res.data.orders);
        setTotalBalance(res.data.totalBalance);
      }
    } catch(err) { console.error(err); }
  };

  // Fungsi baru untuk mengambil list banner yang aktif
  const fetchBanners = async () => {
    try {
      const res = await axios.get('/api/banners/get'); // Menyesuaikan endpoint get banners kamu
      if (res.data.success) {
        setBanners(res.data.banners || res.data.data || []);
      }
    } catch (err) { console.error('Gagal memuat banner:', err); }
  };

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
      const res = await axios.post('/api/banners/add', { username, password, imageUrl });
      setUploadMsg(res.data.success ? '✅ Banner berhasil ditambahkan!' : '❌ Gagal: ' + res.data.message);
      if(res.data.success) { 
        setImageUrl(''); 
        fetchBanners(); // Langsung refresh list banner tanpa reload halaman
      }
    } catch (err) { setUploadMsg('❌ Error: ' + (err.response?.data?.message || err.message)); }
  };

  const handleDeleteBanner = async (bannerId) => {
    if(!confirm('Hapus banner ini?')) return;
    try {
      // Menggunakan axios.get dan mengirim data lewat params URL
      const res = await axios.get('/api/banner/delete', {
        params: { username, password, bannerId }
      });
      
      setDeleteMsg(res.data.message);
      if(res.data.success) {
        fetchBanners(); // Langsung perbarui list grid banner secara real-time
        setTimeout(() => setDeleteMsg(''), 3000);
      }
    } catch(err) {
      setDeleteMsg('Gagal hapus: ' + (err.response?.data?.message || err.message));
    }
  };
  
  const handleSimulate = async (orderId) => {
    if(!confirm('Simulasikan pembayaran untuk order ini? Ini akan membuat panel otomatis.')) return;
    setTxMsg('⏳ Menyimulasikan pembayaran...');
    try {
      const res = await axios.post('/api/admin/simulate', { username, password, orderId });
      setTxMsg(res.data.success ? '✅ Sukses! Panel telah dibuat.' : '❌ Gagal: ' + res.data.message);
      fetchTransactions(); 
    } catch(err) { setTxMsg('❌ Error: ' + err.message); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0204] via-[#1a0800] to-[#050005] text-white font-body relative overflow-hidden flex items-center justify-center p-4">
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-orange-500/5 blur-3xl pointer-events-none"></div>
      
      <div className="relative z-10 w-full max-w-4xl animate-fade-in-up-orange py-12">
        <Link to="/developer" className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-heading font-bold text-sm mb-8 transition-colors group">
          <FaArrowLeft className="group-hover:-translate-x-2 transition-transform duration-300" /> Kembali ke Developer
        </Link>

        <div className="card-3d-orange bg-[#120500]/60 backdrop-blur-xl border border-orange-500/20 rounded-3xl p-8 shadow-[0_0_50px_rgba(249,115,22,0.1)] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-80"></div>
          
          {!isLoggedIn ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <h2 className="font-heading font-bold text-2xl text-orange-400 mb-6 flex items-center gap-3"><FaShieldAlt /> Admin Login</h2>
              {loginError && <p className="text-red-400 text-sm bg-red-500/10 p-2 rounded-lg">{loginError}</p>}
              <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-black/30 border border-orange-500/20 text-white focus:outline-none focus:border-orange-500" required />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-black/30 border border-orange-500/20 text-white focus:outline-none focus:border-orange-500" required />
              <button type="submit" className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-xl font-heading font-bold tracking-wider text-white flex items-center justify-center gap-2"><FaLock /> LOGIN</button>
            </form>
          ) : (
            <div className="space-y-8">
              
              {/* Saldo */}
              <div className="bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-500/30 rounded-2xl p-6 shadow-[0_0_20px_rgba(249,115,22,0.1)]">
                <h3 className="font-heading font-bold text-lg text-orange-300 mb-2 flex items-center gap-2"><FaWallet /> Total Saldo Masuk</h3>
                <p className="font-heading font-black text-4xl text-white">Rp {Number(totalBalance).toLocaleString('id-ID')}</p>
              </div>
              
              {/* Upload Banner */}
              <form onSubmit={handleUploadBanner} className="space-y-3 border-b border-orange-500/10 pb-8">
                <h3 className="font-heading font-bold text-lg text-orange-400 flex items-center gap-2"><FaUpload /> Upload Banner</h3>
                {uploadMsg && <p className="text-sm bg-black/20 p-2 rounded-lg text-orange-300">{uploadMsg}</p>}
                <input 
                  type="url" 
                  placeholder="Masukkan URL Gambar Banner (cth: https://i.imgur.com/gambar.png)" 
                  value={imageUrl} 
                  onChange={(e) => setImageUrl(e.target.value)} 
                  className="w-full px-4 py-2.5 rounded-xl bg-black/30 border border-orange-500/20 text-white text-sm focus:outline-none focus:border-orange-500" 
                  required 
                />
                <button type="submit" className="w-full py-2.5 bg-orange-600 hover:bg-orange-500 rounded-xl font-heading font-bold text-sm text-white transition-all">
                  UPLOAD BANNER
                </button>
              </form>

              {/* List Banner & Logo Delete Klik (PENGGANTI INPUT ID BARU) */}
              <div className="border-b border-orange-500/10 pb-8">
                <h3 className="font-heading font-bold text-lg text-red-400 mb-4">Daftar Banner Aktif</h3>
                {deleteMsg && <p className="text-sm my-2 text-orange-300 bg-black/20 p-2 rounded-lg">{deleteMsg}</p>}
                
                {banners.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-4 bg-black/10 rounded-xl border border-dashed border-orange-500/10">Belum ada banner terpasang.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {banners.map((bn) => (
                      <div key={bn.id} className="relative group rounded-xl overflow-hidden border border-orange-500/20 bg-black/40 p-2 flex flex-col justify-between gap-2">
                        <img 
                          src={bn.image_url || bn.imageUrl} 
                          alt="Banner Admin" 
                          className="w-full h-24 object-cover rounded-lg bg-cyber-dark"
                        />
                        <div className="flex items-center justify-between px-1">
                          <span className="text-[10px] text-gray-500">ID: {bn.id}</span>
                          <button 
                            onClick={() => handleDeleteBanner(bn.id)}
                            className="px-3 py-1 bg-red-600/80 hover:bg-red-700 text-white text-xs font-heading font-bold rounded-lg flex items-center gap-1 transition-all"
                          >
                            <FaTrashAlt size={10} /> HAPUS
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Riwayat Transaksi */}
              <div>
                <h3 className="font-heading font-bold text-lg text-orange-400 mb-4 flex items-center gap-2"><FaHistory /> Riwayat Transaksi</h3>
                {txMsg && <p className="text-sm bg-black/20 p-2 rounded-lg text-orange-300 mb-3">{txMsg}</p>}
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {transactions.length === 0 ? <p className="text-gray-500 text-sm text-center">Belum ada transaksi.</p> : (
                    transactions.map(tx => (
                      <div key={tx.orderId} className="bg-black/20 border border-orange-500/10 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                        <div className="flex-1">
                          <p className="text-white font-heading font-bold text-sm">{tx.ram ? `Paket ${tx.ram.toUpperCase()}` : 'Admin Panel'}</p>
                          <p className="text-gray-400 text-xs">User: {tx.username} • Rp {Number(tx.amount).toLocaleString('id-ID')}</p>
                          <p className="text-gray-600 text-[10px]">Order: {tx.orderId}</p>
                        </div>
                        <div className="flex items-center gap-2 w-full md:w-auto">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider ${tx.status === 'paid' ? 'bg-green-500/20 text-green-400' : tx.status === 'cancelled' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                            {tx.status.toUpperCase()}
                          </span>
                          {tx.status === 'pending' && (
                            <button onClick={() => handleSimulate(tx.orderId)} className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-[10px] font-heading font-bold text-white flex items-center gap-1 transition-all">
                              <FaPlayCircle size={10}/> SIMULASI BAYAR
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}

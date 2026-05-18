import { useState, useEffect, useRef } from 'react'; 
import { createOrder, checkOrderStatus } from '../api'; 
import { FaTimes, FaSpinner, FaCheckCircle, FaCrown, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function CheckoutModal({ isOpen, onClose, paket, initialOwnerName = '' }) {
  const [step, setStep] = useState('input'); 
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [showPass, setShowPass] = useState(false); 
  const [orderId, setOrderId] = useState(null); 
  const [qrBase64, setQrBase64] = useState(''); 
  const [amount, setAmount] = useState(0); 
  const [fee, setFee] = useState(0); 
  const [panelData, setPanelData] = useState(null); 
  const [errorMsg, setErrorMsg] = useState(''); 
  const pollInterval = useRef(null);
  
  useEffect(() => { 
    if (!isOpen) { 
      setStep('input'); 
      setUsername(''); 
      setPassword(''); 
      setOrderId(null); 
      setPanelData(null); 
      setErrorMsg(''); 
      clearInterval(pollInterval.current); 
    } else {
      // Saat modal dibuka, jika ada nama pemilik dari Keranjang, isi otomatis
      if (initialOwnerName) {
        setUsername(initialOwnerName.replace(/\s/g, ''));
      }
    }
  }, [isOpen, initialOwnerName]);

  const handleOrder = async () => { 
    if (!username || !password) return alert('Username dan Password wajib diisi!'); 
    if (password.length < 8) return alert('Password minimal 8 karakter!'); 
    setStep('loading'); 
    try { 
      const res = await createOrder({ username, password, ram: paket?.ram, amount: paket?.harga, type: paket?.type }); 
      if (res.data.success) { setOrderId(res.data.orderId); setQrBase64(res.data.qrBase64); setAmount(res.data.amount); setFee(res.data.fee); setStep('qris'); startPolling(res.data.orderId); } 
      else { setErrorMsg(res.data.message); setStep('error'); } 
    } catch (err) { 
      setErrorMsg("Gagal terhubung ke server pembayaran."); setStep('error'); 
    } 
  };

  const startPolling = (oid) => { 
    clearInterval(pollInterval.current); 
    pollInterval.current = setInterval(async () => { 
      try { 
        const res = await checkOrderStatus(oid); 
        const { status, panelData: pData } = res.data; 
        if (status === 'paid') { 
          clearInterval(pollInterval.current); 
          if (pData) { setPanelData(pData); setStep('success'); } 
          else { 
            const serverError = res.data.error || "Gagal membuat panel di Pterodactyl. Hubungi Admin!"; 
            setErrorMsg(serverError); setStep('error'); 
          } 
        } else if (status === 'expired') { 
          clearInterval(pollInterval.current); setErrorMsg("Waktu pembayaran habis! Silakan order ulang."); setStep('error'); 
        } 
      } catch (err) { 
        console.error(err); 
      } 
    }, 3000); 
  };

  if (!isOpen || !paket) return null; 
  const isAdmin = paket.type === 'admin';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity">
      <div className="glass-card rounded-3xl w-full max-w-md relative overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.2)] border border-neon-purple/30">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white z-10 bg-cyber-dark/50 rounded-full p-1 transition-colors"><FaTimes size={18} /></button>
        
        <div className="p-8">
          {step === 'input' && (
            <div className="text-center">
              <div className="text-5xl mb-4">{isAdmin ? <FaCrown className="text-yellow-400 mx-auto drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]" /> : '🛒'}</div>
              <h3 className="font-heading font-bold text-2xl text-white mb-1">{isAdmin ? 'Admin Panel' : `Paket ${paket.name}`}</h3>
              <p className="text-neon-purple font-bold text-xl mb-8">Rp {paket.harga.toLocaleString('id-ID')} <span className="text-xs text-gray-400 font-normal">/bulan</span></p>
              
              <input 
                type="text" 
                placeholder="Masukkan Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value.replace(/\s/g, ''))} 
                className="w-full px-5 py-3.5 rounded-xl bg-cyber-dark border border-neon-purple/20 text-white focus:outline-none focus:border-neon-purple focus:shadow-[0_0_10px_rgba(168,85,247,0.2)] mb-4 text-center font-heading transition-all" 
              />
              
              <div className="relative mb-6">
                <input 
                  type={showPass ? "text" : "password"} 
                  placeholder="Buat Password (Min. 8 Karakter)" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value.replace(/\s/g, ''))} 
                  className="w-full px-5 py-3.5 rounded-xl bg-cyber-dark border border-neon-purple/20 text-white focus:outline-none focus:border-neon-purple focus:shadow-[0_0_10px_rgba(168,85,247,0.2)] text-center font-heading pr-12 transition-all" 
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-neon-purple-light transition-colors">
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              
              <button onClick={handleOrder} className={`btn-glow w-full py-4 rounded-xl font-heading font-bold tracking-wider text-white transition-all ${isAdmin ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' : 'bg-gradient-to-r from-neon-purple to-neon-purple-dark'}`}>
                BAYAR SEKARANG
              </button>
            </div>
          )}
          
          {step === 'loading' && ( 
            <div className="text-center py-12">
              <FaSpinner className="animate-spin text-neon-purple text-5xl mx-auto mb-4" />
              <p className="text-gray-400 font-heading">Memproses transaksi...</p>
            </div> 
          )}
          
          {step === 'qris' && (
            <div className="text-center">
              <h3 className="font-heading font-bold text-xl text-white mb-2">Scan QRIS untuk Bayar</h3>
              <p className="text-sm text-gray-400 mb-6">Total: <span className="text-white font-bold text-lg">Rp {amount.toLocaleString('id-ID')}</span> <span className="text-xs">(Fee Rp {fee.toLocaleString('id-ID')})</span></p>
              <div className="bg-white p-3 rounded-2xl inline-block mb-6 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <img src={qrBase64} alt="QRIS" className="w-64 h-64 rounded-lg" />
              </div>
              <div className="flex items-center justify-center gap-2 text-neon-purple">
                <FaSpinner className="animate-spin text-lg" />
                <p className="text-sm font-medium">Menunggu pembayaran...</p>
              </div>
            </div>
          )}
          
          {step === 'success' && panelData && (
            <div className="text-center">
              <FaCheckCircle className="text-neon-green text-6xl mx-auto mb-5 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
              <h3 className="font-heading font-bold text-2xl text-white mb-6">Panel Berhasil Dibuat!</h3>
              <div className="glass rounded-2xl p-5 text-left space-y-3 mb-8 border border-neon-purple/20">
                <p className="text-gray-400 text-sm">👤 Username: <span className="text-white font-bold float-right">{panelData.username}</span></p>
                <div className="border-t border-neon-purple/10 my-1"></div>
                <p className="text-gray-400 text-sm">🔑 Password: <span className="text-white font-bold float-right">{panelData.password}</span></p>
                {!isAdmin && ( 
                  <>
                    <div className="border-t border-neon-purple/10 my-1"></div>
                    <p className="text-gray-400 text-sm">🆔 Server ID: <span className="text-white font-bold float-right">{panelData.serverId}</span></p>
                  </> 
                )}
              </div>
              <a href={panelData.panelUrl} target="_blank" rel="noopener noreferrer" className={`btn-glow w-full py-4 rounded-xl font-heading font-bold tracking-wider inline-flex items-center justify-center gap-2 text-white ${isAdmin ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' : 'bg-gradient-to-r from-neon-purple to-neon-purple-dark'}`}>
                {isAdmin ? <FaCrown /> : '🔗'} LOGIN PANEL
              </a>
            </div>
          )}
          
          {step === 'error' && (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">❌</div>
              <h3 className="font-heading font-bold text-xl text-red-400 mb-3">Transaksi Gagal</h3>
              <p className="text-gray-400 text-sm mb-8 bg-red-900/20 border border-red-500/20 p-3 rounded-lg break-words">{errorMsg || "Terjadi kesalahan sistem"}</p>
              <button onClick={onClose} className="px-8 py-3 border border-neon-purple/40 rounded-xl text-white hover:bg-neon-purple/10 transition-colors font-heading font-bold">
                Tutup
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

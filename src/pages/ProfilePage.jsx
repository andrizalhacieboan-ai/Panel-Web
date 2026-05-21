import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';
import axios from 'axios';
import { FaArrowLeft, FaSignOutAlt, FaServer, FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';

export default function ProfilePage() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (!user) return navigate('/login');
    fetchTransactions();
  }, [user]);

  const fetchTransactions = async () => {
    try {
      // Kirim userId via header x-user-id
      const res = await axios.get('/api/users/transactions', { headers: { 'x-user-id': user.id } });
      if (res.data.success) setTransactions(res.data.transactions);
    } catch (err) { console.error(err); }
  };

  const statusBadge = (status) => {
    if (status === 'paid') return <span className="flex items-center gap-1 text-neon-green text-xs font-bold"><FaCheckCircle size={10}/> Sukses</span>;
    if (status === 'pending') return <span className="flex items-center gap-1 text-yellow-400 text-xs font-bold"><FaClock size={10}/> Pending</span>;
    return <span className="flex items-center gap-1 text-red-400 text-xs font-bold"><FaTimesCircle size={10}/> Dibatalkan</span>;
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-cyber-dark">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-neon-purple hover:text-white text-sm mb-6"><FaArrowLeft /> Beranda</Link>
        <div className="glass-card rounded-2xl p-6 mb-8 flex items-center justify-between">
          <div>
            <h2 className="font-heading font-bold text-2xl text-white">{user?.name || 'User'}</h2>
            <p className="text-gray-400 text-sm">📱 {user?.phone || '-'}</p>
          </div>
          <button onClick={() => { logout(); navigate('/'); }} className="px-4 py-2 border border-red-500/40 text-red-400 rounded-xl text-sm hover:bg-red-500/10 flex items-center gap-2"><FaSignOutAlt /> Logout</button>
        </div>

        <h3 className="font-heading font-bold text-xl text-white mb-4 flex items-center gap-2"><FaServer /> Riwayat & Panel Saya</h3>
        {transactions.length === 0 ? (
          <div className="glass-card rounded-xl p-8 text-center text-gray-500">Belum ada transaksi.</div>
        ) : (
          <div className="space-y-4">
            {transactions.map(tx => (
              <div key={tx.orderId} className="glass-card rounded-xl p-5 border border-neon-purple/10">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-heading font-bold text-white">{tx.ram ? `Paket ${tx.ram.toUpperCase()}` : 'Admin Panel'}</h4>
                  {statusBadge(tx.status)}
                </div>
                <p className="text-gray-400 text-xs mb-1">Order ID: {tx.orderId}</p>
                <p className="text-gray-400 text-xs mb-3">Harga: Rp {Number(tx.amount).toLocaleString('id-ID')}</p>
                {tx.status === 'paid' && tx.panelData && (
                  <div className="mt-3 bg-neon-purple/5 border border-neon-purple/20 rounded-lg p-4 space-y-1">
                    <p className="text-neon-purple font-heading font-bold text-sm mb-2">🎉 Data Panel Anda:</p>
                    <p className="text-white text-sm">👤 Username: <span className="font-bold">{tx.panelData.username}</span></p>
                    <p className="text-white text-sm">🔑 Password: <span className="font-bold">{tx.panelData.password}</span></p>
                    <a href={tx.panelData.panelUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 px-4 py-2 bg-neon-purple text-white rounded-lg text-xs font-bold btn-glow">🔗 Login Panel</a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

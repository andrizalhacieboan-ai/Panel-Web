import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheckCircle, FaServer } from 'react-icons/fa';

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTx = async () => {
      try {
        const res = await axios.get('/api/transactions/get');
        if (res.data.success) setTransactions(res.data.transactions);
      } catch (err) { console.error(err); }
    };
    fetchTx();
  }, []);

  // Fungsi untuk menutupi nama user (euy***12)
  const maskName = (name) => {
    if (!name) return 'User';
    if (name.length <= 3) return name + '***';
    return name.substring(0, 3) + '***' + name.slice(-2);
  };

  return (
    <section className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-4">RIWAYAT <span className="text-neon-purple">TRANSAKSI</span></h2>
          <div className="neon-line w-24 mx-auto" />
        </div>

        {transactions.length === 0 ? (
          <div className="glass-card rounded-2xl p-8 text-center border border-neon-purple/10">
            <div className="text-4xl mb-3">📋</div>
            <p className="text-gray-400 font-heading">Belum ada riwayat transaksi yang berhasil.</p>
            <p className="text-gray-600 text-xs mt-1">Jadilah yang pertama membeli!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {transactions.map((tx, i) => (
              <div key={i} className="glass-card rounded-xl p-4 flex items-center gap-4 border border-neon-purple/10 hover:border-neon-purple/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center text-neon-purple flex-shrink-0">
                  <FaServer />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-heading font-bold text-sm truncate">{tx.ram ? `Paket ${tx.ram.toUpperCase()}` : 'Admin Panel'}</p>
                  <p className="text-gray-400 text-xs">Oleh: {maskName(tx.username)}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-neon-green text-xs font-bold flex items-center gap-1 justify-end"><FaCheckCircle size={10}/> Sukses</p>
                  <p className="text-gray-500 text-[10px]">{new Date(Number(tx.createdAt)).toLocaleDateString('id-ID')}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

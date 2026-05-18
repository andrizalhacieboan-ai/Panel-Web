import { useState } from 'react';
import { FaTimes, FaUser } from 'react-icons/fa';

export default function OwnerNameModal({ isOpen, onClose, onConfirm, paket }) {
  const [name, setName] = useState('');

  if (!isOpen || !paket) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert('Masukkan nama pemilik!');
    onConfirm(name.trim(), paket);
    setName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="glass-card rounded-2xl w-full max-w-sm relative overflow-hidden border border-neon-purple/30 p-6">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white"><FaTimes size={16} /></button>
        
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-neon-purple/20 border border-neon-purple/30 flex items-center justify-center mx-auto mb-3 text-neon-purple-light">
            <FaUser />
          </div>
          <h3 className="font-heading font-bold text-lg text-white">Masukkan Keranjang</h3>
          <p className="text-xs text-gray-400 mt-1">Paket: {paket.name} (Rp {paket.harga.toLocaleString('id-ID')})</p>
        </div>

        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Nama Pemilik (Contoh: Rizky)" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="w-full px-4 py-3 rounded-xl bg-cyber-dark border border-neon-purple/20 text-white focus:outline-none focus:border-neon-purple text-center font-heading mb-4" 
            autoFocus
          />
          <button type="submit" className="btn-glow w-full py-3 rounded-xl bg-gradient-to-r from-neon-purple to-neon-purple-dark text-white font-heading font-bold tracking-wider text-sm">
            SIMPAN KE KERANJANG
          </button>
        </form>
      </div>
    </div>
  );
}

import { useContext } from 'react';
import { CartContext } from 'CartContext';
import { FaTimes, FaTrash } from 'react-icons/fa';

export default function CartDrawer({ onCheckoutItem }) {
  const { cartItems, removeFromCart, isDrawerOpen, setIsDrawerOpen } = useContext(CartContext);

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex justify-end bg-black/70 backdrop-blur-sm" onClick={() => setIsDrawerOpen(false)}>
      <div className="w-full max-w-md h-full bg-cyber-dark border-l border-neon-purple/30 shadow-[-10px_0_30px_rgba(168,85,247,0.1)] flex flex-col" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-neon-purple/20">
          <h2 className="font-heading font-bold text-xl text-white">Keranjang Saya</h2>
          <button onClick={() => setIsDrawerOpen(false)} className="text-gray-400 hover:text-white"><FaTimes size={20} /></button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-3 opacity-30">🛒</div>
              <p className="text-gray-500 font-heading">Keranjang masih kosong</p>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.cartId} className="glass-card rounded-xl p-4 border border-neon-purple/20 flex flex-col gap-3 relative group">
                <button onClick={() => removeFromCart(item.cartId)} className="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><FaTrash size={12} /></button>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-neon-purple/10 flex items-center justify-center text-lg">💾</div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-white">{item.paket.name}</h4>
                    <p className="text-xs text-gray-400">Pemilik: {item.ownerName}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-neon-purple-light font-bold text-sm">Rp {item.paket.harga.toLocaleString('id-ID')}</p>
                  <button 
                    onClick={() => onCheckoutItem(item)} 
                    className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-neon-purple to-neon-purple-dark text-white text-[11px] font-heading font-bold tracking-wider btn-glow"
                  >
                    Beli Sekarang
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

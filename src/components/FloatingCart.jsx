import { useContext } from 'react';
import { CartContext } from './CartContext';
import { FaShoppingCart } from 'react-icons/fa';

export default function FloatingCart() {
  const { cartItems, setIsDrawerOpen } = useContext(CartContext);

  // Sembunyikan jika keranjang kosong
  if (cartItems.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 group" onClick={() => setIsDrawerOpen(true)}>
      {/* Tooltip Keterangan */}
      <div className="absolute bottom-full right-0 mb-2 w-48 p-2 rounded-lg bg-cyber-dark border border-neon-purple/30 shadow-[0_0_15px_rgba(168,85,247,0.2)] text-xs text-gray-300 font-heading text-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Segera checkout atau beli produk anda!
      </div>

      {/* Tombol Cart */}
      <button className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-purple to-neon-purple-dark flex items-center justify-center shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:shadow-[0_0_40px_rgba(168,85,247,0.7)] transition-all relative animate-pulse hover:animate-none">
        <FaShoppingCart className="text-white text-2xl" />
        {/* Badge Jumlah Item */}
        <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 border-2 border-cyber-dark text-white text-[10px] font-bold flex items-center justify-center">
          {cartItems.length}
        </span>
      </button>
    </div>
  );
}

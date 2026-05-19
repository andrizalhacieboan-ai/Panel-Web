import { useState, useEffect } from 'react';
import axios from 'axios';

export default function PromoBanner() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get('/api/banners/get');
        if (res.data.success) {
          setBanners(res.data.banners);
        }
      } catch (err) {
        console.error("Gagal memuat banner:", err);
      }
    };
    fetchBanners();
  }, []);

  if (banners.length === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-[#1a0800] via-[#3d1400] to-[#1a0800] border-b border-orange-500/20 shadow-[0_2px_15px_rgba(249,115,22,0.2)] overflow-hidden">
      <div className="flex items-center py-2 animate-marquee whitespace-nowrap">
        {/* Gandakan isi untuk efek loop tanpa jeda */}
        {[...banners, ...banners].map((banner, i) => (
          <div key={i} className="flex items-center mx-8 group cursor-pointer">
            <img 
              src={banner.imageUrl} 
              alt="promo" 
              className="w-8 h-8 rounded-md object-cover mr-3 border border-orange-500/30 group-hover:border-orange-400 transition-all shadow-[0_0_10px_rgba(249,115,22,0.2)]" 
            />
            <span className="text-orange-200 font-heading font-bold text-sm tracking-wide group-hover:text-orange-300 transition-colors">
              🔥 {banner.text} 🔥
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

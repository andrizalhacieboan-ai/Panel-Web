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
    <div className="fixed top-[72px] left-0 right-0 z-40 bg-gradient-to-r from-[#1a0800] via-[#3d1400] to-[#1a0800] border-b border-orange-500/30 shadow-[0_4px_20px_rgba(249,115,22,0.2)] overflow-hidden">
      <div className="flex items-center py-3 animate-marquee whitespace-nowrap">
        {/* Gandakan isi untuk efek loop mulus tanpa jeda */}
        {[...banners, ...banners].map((banner, i) => (
          <div key={i} className="flex items-center mx-10 group cursor-pointer">
            <img 
              src={banner.imageUrl} 
              alt="promo" 
              className="w-40 h-16 md:w-56 md:h-24 rounded-lg object-cover mr-5 border-2 border-orange-500/30 group-hover:border-orange-400 transition-all duration-300 shadow-[0_0_15px_rgba(249,115,22,0.3)] group-hover:shadow-[0_0_25px_rgba(249,115,22,0.5)]" 
            />
            <div className="flex flex-col">
              <span className="text-orange-300 font-heading font-black text-base md:text-xl tracking-wide group-hover:text-orange-200 transition-colors drop-shadow-[0_0_5px_rgba(249,115,22,0.4)]">
                さ さ
              </span>
              <span className="text-white font-heading font-bold text-sm md:text-lg tracking-wide group-hover:text-orange-100 transition-colors">
                {banner.text}
              </span>
            </div>
            <div className="ml-10 h-8 w-px bg-orange-500/20"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

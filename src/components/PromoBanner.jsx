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

  // Render satu set item banner
  const renderBannerSet = (setPrefix) => (
    banners.map((banner, i) => (
      <div key={`${setPrefix}-${i}`} className="flex-shrink-0 mr-8 group cursor-pointer">
        <img 
          src={banner.imageUrl} 
          alt="promo" 
          className="w-[400px] h-[110px] md:w-[600px] md:h-[160px] rounded-2xl object-cover border-2 border-neon-purple/30 group-hover:border-neon-purple transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.3)] group-hover:shadow-[0_0_40px_rgba(168,85,247,0.6)]" 
        />
      </div>
    ))
  );

  return (
    <div className="fixed top-16 left-0 right-0 z-40 bg-cyber-dark/90 backdrop-blur-md border-b border-neon-purple/30 shadow-[0_4px_30px_rgba(168,85,247,0.2)] h-36 md:h-48 flex items-center overflow-hidden">
      {/* w-max memastikan lebar container pas, translateX(-50%) menjamin sambungan mulus */}
      <div className="flex items-center animate-marquee whitespace-nowrap w-max">
        {renderBannerSet('set1')}
        {renderBannerSet('set2')}
      </div>
    </div>
  );
}

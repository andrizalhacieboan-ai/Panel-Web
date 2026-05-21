import { execute } from '../_lib/db.js';

export default async function handler(req, res) {
  // Setup CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    // Mengambil seluruh data banner dari database Turso, diurutkan dari yang terbaru (ID terbesar)
    const result = await execute('SELECT id, image_url FROM banners ORDER BY id DESC');
    
    // Turso biasanya mengembalikan data dalam bentuk array objek langsung, atau di dalam properti rows.
    // Kita pastikan data terekstrak dengan aman.
    const bannerList = result.rows ? result.rows : result;

    res.status(200).json({ 
      success: true, 
      banners: bannerList 
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: "Gagal mengambil data dari Turso: " + err.message 
    });
  }
}

import { execute } from '../_lib/db.js';

export default async function handler(req, res) {
  // Setup CORS Headers untuk metode GET dan OPTIONS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  // Hanya izinkan metode GET
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    // Karena menggunakan GET, data diambil dari req.query (bukan req.body)
    const { username, password, bannerId } = req.query;

    // Validasi Akses Admin
    if (username !== 'andriyt' || password !== 'andri2002') {
      return res.status(401).json({ success: false, message: "Akses ditolak!" });
    }
    
    // Validasi Parameter ID
    if (!bannerId) {
      return res.status(400).json({ success: false, message: "ID Banner wajib diisi" });
    }

    // Eksekusi hapus ke database Turso io
    await execute('DELETE FROM banners WHERE id = ?', [bannerId]);
    
    res.status(200).json({ success: true, message: "Banner berhasil dihapus!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Gagal menghapus di Turso: " + err.message });
  }
}

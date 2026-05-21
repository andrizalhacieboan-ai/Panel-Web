import { execute } from '../_lib/db.js';

export default async function handler(req, res) {
  // Setup CORS Headers - Izinkan POST dan OPTIONS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  // Pastikan file delete ini hanya menerima POST untuk menghapus data
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    let body = req.body; 
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch(e) {}
    }
    const { username, password, bannerId } = body || {};

    // Validasi Akses Admin
    if (username !== 'andriyt' || password !== 'andri2002') {
      return res.status(401).json({ success: false, message: "Akses ditolak!" });
    }
    
    // Validasi Parameter ID
    if (!bannerId) {
      return res.status(400).json({ success: false, message: "ID Banner wajib diisi" });
    }

    // Eksekusi hapus langsung ke database Turso io
    await execute('DELETE FROM banners WHERE id = ?', [bannerId]);
    
    res.status(200).json({ success: true, message: "Banner berhasil dihapus!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Gagal menghapus di Turso: " + err.message });
  }
}

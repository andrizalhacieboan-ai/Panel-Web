import { execute } from '../_lib/db.js';

export default async function handler(req, res) {
  // CORS & Method Handling
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parsing body yang lebih aman untuk Vercel
    let body = req.body;
    if (!body) {
      return res.status(400).json({ success: false, message: "Request body kosong" });
    }
    if (typeof req.body === 'string') {
      try { body = JSON.parse(req.body); } catch(e) { 
        return res.status(400).json({ success: false, message: "Format body tidak valid" });
      }
    }

    const { username, password, imageUrl, text } = body;

    // Cek Kredensial Admin
    if (username !== 'andriyt' || password !== 'andri2002') {
      return res.status(401).json({ success: false, message: "Akses ditolak! Username atau password salah." });
    }

    if (!imageUrl || !text) {
      return res.status(400).json({ success: false, message: "URL Gambar dan Teks wajib diisi!" });
    }

    await execute(
      'INSERT INTO banners (imageUrl, text, createdAt) VALUES (?, ?, ?)',
      [imageUrl, text, Date.now()]
    );

    return res.status(200).json({ success: true, message: "Banner berhasil ditambahkan!" });
    
  } catch (err) {
    console.error("BANNER ADD ERROR:", err);
    return res.status(500).json({ success: false, message: err.message || "Internal Server Error" });
  }
}

import { db, initDb } from '../_lib/db.js';
import { createPayment } from '../_lib/pakasir.js';

export default async function handler(req, res) {
  // CORS & OPTIONS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  try {
    await initDb();
    
    // Parse body (terkadang Vercel mengirim body sebagai string)
    let body = req.body;
    if (typeof req.body === 'string') {
      try { body = JSON.parse(req.body); } catch(e) {}
    }

    const { username, password, ram, amount, type } = body || {};
    
    // Validasi input
    if (!username || !password || !amount || !type) {
      return res.status(400).json({ success: false, message: "Data tidak lengkap (username, password, amount, type dibutuhkan)" });
    }

    const fee = Math.floor(Math.random() * (200 - 100 + 1)) + 100;
    const totalPrice = amount + fee;

    const payment = await createPayment(totalPrice);

    await db.execute({
      sql: `INSERT INTO orders (orderId, username, password, ram, amount, fee, type, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', ?)`,
      args: [payment.orderId, username, password, ram, totalPrice, fee, type, Date.now()]
    });

    res.status(200).json({ success: true, orderId: payment.orderId, qrBase64: payment.qrBase64, amount: totalPrice, fee });
    
  } catch (err) {
    console.error("CREATE ORDER ERROR:", err); // Ini akan muncul di Vercel Logs
    res.status(500).json({ 
      success: false, 
      message: err.message || "Terjadi kesalahan di server" 
    });
  }
}

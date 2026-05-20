import { execute } from '../_lib/db.js';
// Hapus import simulatePayment karena tidak dipakai lagi
// import { simulatePayment } from '../_lib/pakasir.js';
import { createPanel, createAdmin } from '../_lib/pterodactyl.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    let body = req.body;
    if (typeof req.body === 'string') try { body = JSON.parse(req.body); } catch(e) {}
    const { username, password, orderId } = body || {};

    // 1. Cek Admin
    if (username !== 'andriyt' || password !== 'andri2002') {
      return res.status(401).json({ success: false, message: "Akses ditolak!" });
    }
    if (!orderId) {
      return res.status(400).json({ success: false, message: "Order ID kosong" });
    }

    // 2. Ambil data order
    const orderRes = await execute('SELECT * FROM orders WHERE orderId = ?', [orderId]);
    const order = orderRes.rows[0];

    if (!order) return res.status(404).json({ success: false, message: "Order tidak ditemukan" });
    if (order.status === 'paid') return res.status(400).json({ success: false, message: "Order sudah dibayar/diproses!" });

    // 3. BYPASS PAKASIR: Langsung update status ke paid tanpa cek Pakasir
    // Ini diperlukan karena mode Production menolak simulasi API
    await execute("UPDATE orders SET status = 'paid' WHERE orderId = ?", [orderId]);
    
    // 4. Buat Panel Pterodactyl
    let panelRes;
    if (order.type === 'admin') {
      panelRes = await createAdmin(order.username, order.password);
    } else {
      const ramKey = (order.ram || 'unli').toLowerCase();
      panelRes = await createPanel(order.username, ramKey, order.password);
    }
    
    if (panelRes.success) {
      await execute("UPDATE orders SET panelData = ? WHERE orderId = ?", [JSON.stringify(panelRes.data), orderId]);
      return res.status(200).json({ success: true, message: "✅ Order berhasil di-approve manual & Panel berhasil dibuat!" });
    } else {
      return res.status(500).json({ 
        success: false, 
        message: `Order di-approve, tapi gagal buat panel Pterodactyl: ${panelRes.message}` 
      });
    }

  } catch (globalErr) {
    console.error("GLOBAL SIMULATE ERROR:", globalErr);
    return res.status(500).json({ success: false, message: globalErr.message || "Internal Server Error" });
  }
}

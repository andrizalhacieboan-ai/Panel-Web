import { execute } from '../_lib/db.js';
import { simulatePayment } from '../_lib/pakasir.js';
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

    if (username !== 'andriyt' || password !== 'andri2002') return res.status(401).json({ success: false, message: "Akses ditolak!" });
    if (!orderId) return res.status(400).json({ success: false, message: "Order ID kosong" });

    const orderRes = await execute('SELECT * FROM orders WHERE orderId = ?', [orderId]);
    const order = orderRes.rows[0];
    if (!order) return res.status(404).json({ success: false, message: "Order tidak ditemukan" });
    if (order.status === 'paid') return res.status(400).json({ success: false, message: "Order sudah dibayar!" });

    // FIX: Konversi amount ke number
    const amountNum = Number(order.amount);

    // Jalankan simulasi di Pakasir
    await simulatePayment(orderId, amountNum);

    // Update status DB & Buat Panel Pterodactyl
    await execute("UPDATE orders SET status = 'paid' WHERE orderId = ?", [orderId]);
    
    let panelRes = order.type === 'admin' ? await createAdmin(order.username, order.password) : await createPanel(order.username, order.ram.toLowerCase(), order.password);
    
    if (panelRes.success) {
      await execute("UPDATE orders SET panelData = ? WHERE orderId = ?", [JSON.stringify(panelRes.data), orderId]);
    }

    res.status(200).json({ success: true, message: "Simulasi pembayaran berhasil! Panel dibuat." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

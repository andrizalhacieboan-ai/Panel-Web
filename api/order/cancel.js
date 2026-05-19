import { execute } from '../_lib/db.js';
import { cancelPayment } from '../_lib/pakasir.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    let body = req.body;
    if (typeof req.body === 'string') try { body = JSON.parse(req.body); } catch(e) {}
    const { orderId, amount } = body || {};

    if (!orderId || !amount) return res.status(400).json({ success: false, message: "Data tidak lengkap" });

    // FIX: Konversi amount ke number
    await cancelPayment(orderId, Number(amount));

    await execute("UPDATE orders SET status = 'cancelled' WHERE orderId = ?", [orderId]);

    res.status(200).json({ success: true, message: "Order berhasil dibatalkan" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

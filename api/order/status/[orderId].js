import { execute } from '../../_lib/db.js';
import { cekPaid } from '../../_lib/pakasir.js';
import { createPanel, createAdmin } from '../../_lib/pterodactyl.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { orderId } = req.query;
    const result = await execute('SELECT * FROM orders WHERE orderId = ?', [orderId]);
    const order = result.rows[0];

    if (!order) return res.status(404).json({ success: false, message: "Order tidak ditemukan" });
    if (order.status === 'paid') {
      return res.status(200).json({ success: true, status: 'paid', panelData: JSON.parse(order.panelData) });
    }

    // FIX: Konversi amount dari string ke number
    const amountNum = Number(order.amount);
    
    const isPaid = await cekPaid(order.orderId, amountNum);
    
    if (isPaid) {
      order.status = 'paid';
      let panelRes = order.type === 'admin' 
        ? await createAdmin(order.username, order.password) 
        : await createPanel(order.username, order.ram.toLowerCase(), order.password);
      
      if (panelRes.success) {
        await execute(
          "UPDATE orders SET status = 'paid', panelData = ? WHERE orderId = ?", 
          [JSON.stringify(panelRes.data), orderId]
        );
        res.status(200).json({ success: true, status: 'paid', panelData: panelRes.data });
      } else {
        res.status(200).json({ success: true, status: 'paid', panelData: null, error: panelRes.message || "Gagal membuat panel" });
      }
    } else {
      if (Date.now() - Number(order.createdAt) > 6 * 60 * 1000) {
        await execute("UPDATE orders SET status = 'expired' WHERE orderId = ?", [orderId]);
        return res.status(200).json({ success: false, status: 'expired' });
      }
      res.status(200).json({ success: false, status: 'pending' });
    }
  } catch (err) {
    console.error("STATUS ORDER ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
}

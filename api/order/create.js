import { db, initDb } from '../_lib/db.js';
import { createPayment } from '../_lib/pakasir.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  try {
    await initDb();
    const { username, password, ram, amount, type } = req.body;
    const fee = Math.floor(Math.random() * (200 - 100 + 1)) + 100;
    const totalPrice = amount + fee;

    const payment = await createPayment(totalPrice);

    await db.execute({
      sql: `INSERT INTO orders (orderId, username, password, ram, amount, fee, type, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', ?)`,
      args: [payment.orderId, username, password, ram, totalPrice, fee, type, Date.now()]
    });

    res.status(200).json({ success: true, orderId: payment.orderId, qrBase64: payment.qrBase64, amount: totalPrice, fee });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
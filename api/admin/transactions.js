import { execute } from '../_lib/db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    // Ambil semua transaksi
    const ordersResult = await execute('SELECT * FROM orders ORDER BY createdAt DESC');
    const orders = ordersResult.rows;

    // Hitung total saldo (dari transaksi sukses)
    const balanceResult = await execute("SELECT SUM(amount) as totalBalance FROM orders WHERE status = 'paid'");
    const totalBalance = balanceResult.rows[0]?.totalBalance || 0;

    res.status(200).json({ success: true, orders, totalBalance });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

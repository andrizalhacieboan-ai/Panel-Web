import { execute } from '../_lib/db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    // Ambil 10 transaksi terakhir yang sukses
    const result = await execute("SELECT * FROM orders WHERE status = 'paid' ORDER BY createdAt DESC LIMIT 10");
    res.status(200).json({ success: true, transactions: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

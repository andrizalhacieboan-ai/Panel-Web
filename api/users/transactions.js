import { execute } from '../_lib/db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    // Ambil userId dari header (tanpa JWT)
    const userId = req.headers['x-user-id'];
    if (!userId) return res.status(401).json({ success: false, message: "User ID tidak ditemukan" });

    // Cek apakah user ada di DB
    const userRes = await execute('SELECT id FROM users WHERE id = ?', [userId]);
    if (userRes.rows.length === 0) return res.status(401).json({ success: false, message: "User tidak valid" });

    const result = await execute('SELECT * FROM orders WHERE userId = ? ORDER BY createdAt DESC', [userId]);
    
    const orders = result.rows.map(o => ({
      ...o,
      panelData: o.panelData ? JSON.parse(o.panelData) : null
    }));

    res.status(200).json({ success: true, transactions: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

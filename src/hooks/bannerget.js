import { execute } from '../_lib/db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const result = await execute('SELECT * FROM banners ORDER BY createdAt DESC');
    res.status(200).json({ success: true, banners: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

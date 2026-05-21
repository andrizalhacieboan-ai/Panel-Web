import { execute } from '../_lib/db.js';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    let body = req.body; if (typeof body === 'string') try { body = JSON.parse(body); } catch(e) {}
    const { phone, password } = body || {};

    const result = await execute('SELECT * FROM users WHERE phone = ?', [phone]);
    const user = result.rows[0];
    if (!user) return res.status(401).json({ success: false, message: "Nomor HP tidak ditemukan" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ success: false, message: "Password salah" });

    // Kirim data user tanpa JWT, cuma ID dan info dasar
    res.status(200).json({ 
      success: true, 
      user: { id: user.id, name: user.name, phone: user.phone } 
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

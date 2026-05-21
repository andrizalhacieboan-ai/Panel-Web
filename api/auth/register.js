import { execute } from '../_lib/db.js';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    let body = req.body; if (typeof body === 'string') try { body = JSON.parse(body); } catch(e) {}
    const { name, phone, password } = body || {};
    if (!name || !phone || !password) return res.status(400).json({ success: false, message: "Data anda tidak lengkap" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await execute('INSERT INTO users (name, phone, password, createdAt) VALUES (?, ?, ?, ?)', [name, phone, hashedPassword, Date.now()]);

    res.status(201).json({ success: true, message: "Pendaftaran berhasil! Silahkan login." });
  } catch (err) {
    if (err.message.includes('UNIQUE constraint')) return res.status(400).json({ success: false, message: "Nomor HP sudah terdaftar!" });
    res.status(500).json({ success: false, message: err.message });
  }
}

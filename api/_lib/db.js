import { createClient } from '@libsql/client';

export const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// Inisialisasi tabel jika belum ada
export async function initDb() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS orders (
      orderId TEXT PRIMARY KEY,
      username TEXT,
      password TEXT,
      ram TEXT,
      amount INTEGER,
      fee INTEGER,
      type TEXT,
      status TEXT DEFAULT 'pending',
      panelData TEXT,
      createdAt INTEGER
    )
  `);
}
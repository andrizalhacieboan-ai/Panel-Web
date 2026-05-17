import { createClient } from '@libsql/client';

// Pengecekan Env Variabel
if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
  console.error("ERROR: TURSO_DATABASE_URL atau TURSO_AUTH_TOKEN belum diset di Vercel!");
}

export const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

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

// api/_lib/db.js
const rawUrl = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

// Ubah libsql:// menjadi https:// agar kompatibel dengan Web Fetch API
const url = rawUrl ? rawUrl.replace(/^libsql:\/\//, 'https://') : '';

export async function execute(sql, args = []) {
  if (!url || !authToken) {
    throw new Error("TURSO_DATABASE_URL atau TURSO_AUTH_TOKEN belum diset di Vercel Environment Variables");
  }

  const body = {
    requests: [
      { type: "execute", stmt: { sql, args } },
      { type: "close" }
    ]
  };

  const res = await fetch(`${url}/v2/pipeline`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Turso DB Error: ${text}`);
  }

  const data = await res.json();
  
  // Jika query tidak mereturn data (seperti INSERT/UPDATE/DELETE)
  if (!data.results[0].response.result) {
    return { rows: [] };
  }

  const result = data.results[0].response.result;

  // Parsing hasil fetch ke format yang sama seperti @libsql/client
  const rows = result.rows.map(row => {
    const obj = {};
    result.cols.forEach((col, i) => {
      const cell = row[i];
      if (cell === null) {
        obj[col.name] = null;
      } else if (typeof cell === 'object' && cell.type) {
        obj[col.name] = cell.type === 'integer' ? Number(cell.value) : cell.value;
      } else {
        obj[col.name] = cell;
      }
    });
    return obj;
  });

  return { rows };
}

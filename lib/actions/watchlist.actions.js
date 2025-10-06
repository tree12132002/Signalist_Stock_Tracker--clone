'use server'

import { createPool } from 'mysql2/promise'

const pool = createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  timezone: process.env.DATABASE_TIMEZONE,
})

export async function getWatchlistSymbolsByEmail(email) {
  if (!email) return []

  try {
    const connection = await pool.getConnection()

    if (!connection) throw new Error('MySQL connection not connected')

    const [items] = await connection.execute(
      `
      SELECT w.symbol FROM Watchlist w
      INNER JOIN user u ON w.userId = u.id
      WHERE u.email = ?
      `,
      [email]
    )

    connection.release()

    return items
  } catch (e) {
    console.error('getWatchlistSymbolsByEmail error:', e)
    return []
  }
}

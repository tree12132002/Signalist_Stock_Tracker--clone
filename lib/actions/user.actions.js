'use server'

import { createPool } from 'mysql2/promise'

const pool = createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  timezone: process.env.DATABASE_TIMEZONE,
})

export const getAllUsersForNewsEmail = async () => {
  try {
    const connection = await pool.getConnection()

    if (!connection) throw new Error('MySQL connection not connected')

    const [users] = await connection.execute(
      `
      SELECT * FROM user
      WHERE email IS NOT NULL
        AND email != ''`,
      [true]
    )

    connection.release()

    return users
      .filter((user) => user.email && user.name)
      .map((user) => ({
        id: user.id,
        email: user.email,
        name: user.name,
      }))
  } catch (e) {
    console.error('Error fetching users for news email', e)
  }
}

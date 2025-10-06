import { createConnection } from 'mysql2/promise'

const migration = async () => {
  try {
    const connection = await createConnection({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'Signalist',
    })

    console.log('✅ Connected to the database.')

    // 執行 CREATE TABLE
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS Watchlist (
        id varchar(36) NOT NULL PRIMARY KEY, 
        userId varchar(36) NOT NULL, 
        symbol varchar(255) NOT NULL CHECK (symbol = UPPER(TRIM(symbol))), 
        company varchar(255) NOT NULL CHECK (company = TRIM(company)), 
        addedAt timestamp(3) DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
        FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE,
        INDEX index_userId (userId)
      )
    `)

    console.log('✅ Watchlist table with index created')

    await connection.end()
    console.log('🎉 Migration completed')
  } catch (e) {
    console.error('❌ Migration failed:', e.message)
  }
}

migration()

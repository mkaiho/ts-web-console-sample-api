import mysql2 from 'mysql2/promise'
import { RDB, RDBPool, RDBConnection, RDBRows } from '../../types'
import { MySQLOptions } from './types'

export { MySQLOptions } from './types'

export const mysql: RDB<MySQLOptions> = {
  createPool(options: MySQLOptions): RDBPool {
    const pool = mysql2.createPool(options)
    return {
      async getConnection(): Promise<RDBConnection> {
        const connection = await pool.getConnection()
        return {
          async beginTransaction(): Promise<void> {
            await connection.beginTransaction()
          },
          async query(sql: string): Promise<RDBRows> {
            const rows: RDBRows = ((
              await connection.query(sql)
            )[0] as unknown) as RDBRows
            return rows
          },
          async execute(sql: string): Promise<void> {
            await connection.execute(sql)
          },
          async commit(): Promise<void> {
            await connection.commit()
          },
          async rollback(): Promise<void> {
            await connection.rollback()
          },
          async release(): Promise<void> {
            connection.release()
          },
        }
      },
      async end(): Promise<void> {
        await pool.end()
      },
    }
  },
}

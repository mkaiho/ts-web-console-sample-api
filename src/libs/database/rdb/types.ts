export type RDBRow = { [key: string]: number | string | Date | null }
export type RDBRows = Array<RDBRow>

export interface RDBConnection {
  beginTransaction(): Promise<void>
  query(sql: string): Promise<RDBRows>
  execute(sql: string): Promise<void>
  commit(): Promise<void>
  rollback(): Promise<void>
  release(): Promise<void>
}

export interface RDBPool {
  getConnection(): Promise<RDBConnection>
  end(): void
}

export interface RDB<Options> {
  createPool(options: Options): RDBPool
}

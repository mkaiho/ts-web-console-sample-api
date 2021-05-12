import * as mysql2 from 'mysql2/promise'
import {
  RDBConnection,
  RDBPool,
  RDBRows,
} from '../../../../../../src/libs/database/rdb'
import {
  mysql,
  MySQLOptions,
} from '../../../../../../src/libs/database/rdb/mysql/_mysql2'

jest.mock('mysql2/promise')

const dummyOptions = jest.fn<unknown, never>() as MySQLOptions
const dummyQueryResults = [jest.fn<unknown, never>() as unknown] as RDBRows

let mockMysql: {
  createPool: jest.SpyInstance<unknown, unknown[]>
}

let dummyPool: {
  getConnection: jest.Mock<unknown, unknown[]>
  end: jest.Mock<unknown, unknown[]>
}

let dummyConnection: {
  beginTransaction: jest.Mock<unknown, unknown[]>
  query: jest.Mock<unknown, unknown[]>
  execute: jest.Mock<unknown, unknown[]>
  commit: jest.Mock<unknown, unknown[]>
  rollback: jest.Mock<unknown, unknown[]>
  release: jest.Mock<unknown, unknown[]>
}

const createDummyPool = (connection: RDBConnection, error?: Error) => {
  return {
    getConnection: jest.fn().mockImplementation(async () => {
      if (error) {
        throw error
      }
      return connection
    }),
    end: jest.fn().mockImplementation(async () => {
      if (error) {
        throw error
      }
      return (jest.fn() as unknown) as RDBConnection
    }),
  }
}

const createDummyConnection = (error?: Error) => {
  return {
    beginTransaction: jest.fn().mockImplementation(async () => {
      if (error) {
        throw error
      }
    }),
    query: jest.fn().mockImplementation(async () => {
      if (error) {
        throw error
      }
      return [dummyQueryResults]
    }),
    execute: jest.fn().mockImplementation(async () => {
      if (error) {
        throw error
      }
    }),
    commit: jest.fn().mockImplementation(async () => {
      if (error) {
        throw error
      }
    }),
    rollback: jest.fn().mockImplementation(async () => {
      return
    }),
    release: jest.fn().mockImplementation(() => {
      return
    }),
  }
}

beforeAll(() => {
  mockMysql = {
    createPool: (jest.spyOn(
      mysql2,
      'createPool'
    ) as unknown) as typeof mockMysql['createPool'],
  }
})
beforeEach(() => {
  dummyConnection = createDummyConnection()
  dummyPool = createDummyPool((dummyConnection as unknown) as RDBConnection)
  mockMysql.createPool.mockReturnValue((dummyPool as unknown) as RDBPool)
})
afterEach(() => {
  mockMysql.createPool.mockReset()
})
afterAll(() => {
  mockMysql.createPool.mockRestore()
})

describe('database', () => {
  describe('_rdb', () => {
    describe('_mysql2', () => {
      describe('createPool', () => {
        test('return Pool', () => {
          const passed = {
            options: dummyOptions,
          }

          const actual = mysql.createPool(passed.options)

          expect(mockMysql.createPool).toHaveBeenCalled()
          expect(mockMysql.createPool).toHaveBeenCalledWith(passed.options)
          expect(actual.getConnection).toBeInstanceOf(Function)
          expect(actual.end).toBeInstanceOf(Function)
        })

        describe('returned pool', () => {
          describe('getConnection', () => {
            test('return connection', async () => {
              const options = dummyOptions
              const sut = mysql.createPool(options)
              const mock = {
                pool: dummyPool,
              }

              try {
                const actual = await sut.getConnection()

                expect(mock.pool.getConnection).toHaveBeenCalled()
                expect(actual.beginTransaction).toBeInstanceOf(Function)
                expect(actual.query).toBeInstanceOf(Function)
                expect(actual.execute).toBeInstanceOf(Function)
                expect(actual.commit).toBeInstanceOf(Function)
                expect(actual.rollback).toBeInstanceOf(Function)
                expect(actual.release).toBeInstanceOf(Function)
              } catch (err) {
                fail(err)
              }
            })

            describe('returned connection', () => {
              describe('beginTransaction', () => {
                test('resolved normally', async () => {
                  const options = dummyOptions
                  const sut = await mysql.createPool(options).getConnection()
                  const mock = {
                    connection: dummyConnection,
                  }

                  try {
                    await sut.beginTransaction()
                    expect(mock.connection.beginTransaction).toHaveBeenCalled()
                  } catch (err) {
                    fail(err)
                  }
                })
              })

              describe('query', () => {
                test('resolved rows', async () => {
                  const passed = {
                    sql: 'SELECT 1',
                  }
                  const options = dummyOptions
                  const sut = await mysql.createPool(options).getConnection()
                  const mock = {
                    connection: dummyConnection,
                  }

                  try {
                    const actual = await sut.query(passed.sql)
                    expect(mock.connection.query).toHaveBeenCalled()
                    expect(mock.connection.query).toHaveBeenCalledWith(
                      passed.sql
                    )
                    expect(actual).toBe(
                      (await mock.connection.query.mock.results[0].value)[0]
                    )
                  } catch (err) {
                    fail(err)
                  }
                })
              })

              describe('execute', () => {
                test('resolved normally', async () => {
                  const passed = {
                    sql:
                      "INSERT INTO TESTS (id, result) VALUES('A0001', 'SUCCEEDED')",
                  }
                  const options = dummyOptions
                  const sut = await mysql.createPool(options).getConnection()
                  const mock = {
                    connection: dummyConnection,
                  }

                  try {
                    await sut.execute(passed.sql)
                    expect(mock.connection.execute).toHaveBeenCalled()
                    expect(mock.connection.execute).toHaveBeenCalledWith(
                      passed.sql
                    )
                  } catch (err) {
                    fail(err)
                  }
                })
              })

              describe('commit', () => {
                test('resolved normally', async () => {
                  const options = dummyOptions
                  const sut = await mysql.createPool(options).getConnection()
                  const mock = {
                    connection: dummyConnection,
                  }

                  try {
                    await sut.commit()
                    expect(mock.connection.commit).toHaveBeenCalled()
                  } catch (err) {
                    fail(err)
                  }
                })
              })

              describe('rollback', () => {
                test('resolved normally', async () => {
                  const options = dummyOptions
                  const sut = await mysql.createPool(options).getConnection()
                  const mock = {
                    connection: dummyConnection,
                  }

                  try {
                    await sut.rollback()
                    expect(mock.connection.rollback).toHaveBeenCalled()
                  } catch (err) {
                    fail(err)
                  }
                })
              })

              describe('release', () => {
                test('resolved normally', async () => {
                  const options = dummyOptions
                  const sut = await mysql.createPool(options).getConnection()
                  const mock = {
                    connection: dummyConnection,
                  }

                  try {
                    await sut.release()
                    expect(mock.connection.release).toHaveBeenCalled()
                  } catch (err) {
                    fail(err)
                  }
                })
              })
            })
          })

          describe('end', () => {
            test('resolved normally', () => {
              const options = dummyOptions
              const sut = mysql.createPool(options)
              const mock = {
                pool: dummyPool,
              }

              try {
                sut.end()

                expect(mock.pool.end).toHaveBeenCalled()
              } catch (err) {
                fail(err)
              }
            })
          })
        })
      })
    })
  })
})

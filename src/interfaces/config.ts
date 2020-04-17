interface Pool {
  max: number
  min: number
  acquire: number
  idle: number
}

interface Database {
  password: string
  user: string
  host: string
  name: string
  pool: Pool
}

interface App {
  port: string
  keys: string[]
  jwtSecret: string
}

export interface Config {
  database: Database
  app: App
}

import dotenv from 'dotenv'
import { Config } from '../interfaces/config'

const result = dotenv.config()

if (result.error) {
  throw result.error
}

const config: Config = {
  database: {
    password: process.env.DB_PASS,
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,

    pool: {
      max: Number(process.env.DB_POOL_MAX),
      min: Number(process.env.DB_POOL_MIN),
      acquire: Number(process.env.DB_ACQUIRE),
      idle: Number(process.env.DB_IDLE),
    },
  },
  app: {
    port: process.env.APP_PORT,
    keys: process.env.APP_KEYS.split(','),
    jwtSecret: process.env.JWT_SECRET,
  },
}

export default config

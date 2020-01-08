import * as dotenv from 'dotenv';

dotenv.config();

export default {
  database: {
    password: process.env.DB_PASS,
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
  },
  app: {
    port: process.env.APP_PORT,
  },
};

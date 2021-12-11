import { Pool } from 'pg';

const prodDatabaseConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};

const testDatabaseConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: Number(process.env.DB_PORT),
  password: process.env.DB_PASWWORD,
  database: process.env.DB_DATABASE,
};

const databaseConfig = process.env.NODE_ENV === 'test'
  ? testDatabaseConfig
  : prodDatabaseConfig;

const connection = new Pool(databaseConfig);

export default connection;

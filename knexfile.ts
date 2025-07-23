import { Knex } from 'knex';
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.resolve(__dirname, './.env') });

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './dist/migrations',
      extension: 'js',
    },
  },
  test: {
    client: 'mysql2',
    connection: {
      host: process.env.DATABASE_HOST ,
      user: process.env.DATABASE_USER ,
      password: process.env.DATABASE_PASSWORD ,
      database: process.env.DATABASE_NAME ,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './dist/migrations',
      extension: 'js',
    },
  },
  production: {
    client: 'mysql2',
    connection: {
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './dist/migrations',
      extension: 'js',
    },
  },
};

export default config;

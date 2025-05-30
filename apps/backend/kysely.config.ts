import { Kysely, PostgresDialect } from 'kysely';
import { DB } from 'kysely-codegen';
import { defineConfig } from 'kysely-ctl';
import { Pool } from 'pg';

export const poolConfig = {
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  port: +(process.env.DATABASE_PORT || '5432'),
  max: +(process.env.DATABASE_MAX_POOL_CONNECTIONS || '10'),
} as const;

const dialect = new PostgresDialect({
  pool: new Pool(poolConfig),
});

export const db = new Kysely<DB>({
  dialect,
});

export default defineConfig({
  kysely: db,
  migrations: {
    migrationFolder: 'src/database/migrations',
  },
  seeds: {
    seedFolder: 'src/database/seeds',
  },
});

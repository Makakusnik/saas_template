import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import { DB } from 'kysely-codegen';
import databaseConfig from './config/database.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class DatabaseService {
  private db: Kysely<DB>;
  public pool: Pool;

  constructor(
    @Inject(databaseConfig.KEY)
    private databaseConfiguration: ConfigType<typeof databaseConfig>,
  ) {
    this.pool = new Pool({
      connectionString: this.databaseConfiguration.url,
    });

    const dialect = new PostgresDialect({
      pool: this.pool,
    });

    this.db = new Kysely({
      dialect,
    });
  }

  getDB() {
    return this.db;
  }
}

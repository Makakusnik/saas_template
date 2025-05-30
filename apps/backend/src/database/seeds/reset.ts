import { sql, type Kysely } from 'kysely';
import type { DB } from 'kysely-codegen';
import { exit } from 'process';
import { db } from '../../../kysely.config';
export async function reset(kyselyDb: Kysely<any>): Promise<void> {
  try {
    console.log('Fetching table names...');

    const tablesResult = await sql<{ table_name: string }>`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = current_schema() -- For PostgreSQL/SQLite, use DATABASE() for MySQL
        AND table_type = 'BASE TABLE';
    `.execute(kyselyDb);

    const tableNames = tablesResult.rows.map((row) => `"${row.table_name}"`);

    if (tableNames.length === 0) {
      console.log('No tables found to truncate.');
      exit(0);
    }

    const truncateStatement = `TRUNCATE TABLE ${tableNames.join(', ')} RESTART IDENTITY CASCADE`;

    console.log(`Executing:\n===========SQL=========== ${truncateStatement}\n===========SQL===========`);

    await sql.raw(truncateStatement).execute(kyselyDb);

    console.log(`Successfully truncated all tables: ${tableNames.join(', ')}`);

    exit(0);
  } catch (error) {
    console.error('Error resetting database:', error);
    exit(1);
  }
}

reset(db);

import { addUpdatedAtTrigger, dropUpdatedAtTrigger } from '@db/utils/kysely.utils';
import { sql, type Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  // Update the updated_at column whenever the record is updated
  await sql`
    CREATE OR REPLACE FUNCTION updateUpdatedAtColumn()
      RETURNS TRIGGER AS $$
        BEGIN
          NEW.updatedAt = NOW();
          RETURN NEW;
        END;
      $$ LANGUAGE plpgsql;`.execute(db);

  await db.schema.createType('role').asEnum(['admin', 'moderator', 'user']).execute();

  await db.schema
    .createTable('user')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn('name', 'text', (col) => col.notNull())
    .addColumn('email', 'text', (col) => col.unique().notNull())
    .addColumn('emailVerified', 'boolean', (col) => col.notNull())
    .addColumn('image', 'text')
    .addColumn('role', sql.id(`role`), (col) => col.notNull().defaultTo('user'))
    .addColumn('createdAt', 'timestamptz', (col) => col.notNull().defaultTo(sql`now()`))
    .addColumn('updatedAt', 'timestamptz', (col) => col.notNull().defaultTo(sql`now()`))
    .execute();
  await addUpdatedAtTrigger(db, 'user');

  await db.schema
    .createTable('session')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn('expiresAt', 'timestamptz', (col) => col.notNull())
    .addColumn('token', 'text', (col) => col.unique().notNull())
    .addColumn('createdAt', 'timestamptz', (col) => col.notNull().defaultTo(sql`now()`))
    .addColumn('updatedAt', 'timestamptz', (col) => col.notNull().defaultTo(sql`now()`))
    .addColumn('ipAddress', 'text')
    .addColumn('userAgent', 'text')
    .addColumn('userId', 'uuid', (col) => col.references('user.id').notNull())
    .execute();
  await addUpdatedAtTrigger(db, 'session');

  await db.schema
    .createTable('account')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn('accountId', 'text', (col) => col.notNull())
    .addColumn('providerId', 'text', (col) => col.notNull())
    .addColumn('userId', 'uuid', (col) => col.references('user.id').notNull())
    .addColumn('accessToken', 'text')
    .addColumn('refreshToken', 'text')
    .addColumn('idToken', 'text')
    .addColumn('accessTokenExpiresAt', 'timestamptz')
    .addColumn('refreshTokenExpiresAt', 'timestamptz')
    .addColumn('scope', 'text')
    .addColumn('password', 'text')
    .addColumn('createdAt', 'timestamptz', (col) => col.notNull().defaultTo(sql`now()`))
    .addColumn('updatedAt', 'timestamptz', (col) => col.notNull().defaultTo(sql`now()`))
    .execute();
  await addUpdatedAtTrigger(db, 'account');

  await db.schema
    .createTable('verification')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn('identifier', 'text', (col) => col.notNull())
    .addColumn('value', 'text', (col) => col.notNull())
    .addColumn('expiresAt', 'timestamptz', (col) => col.notNull())
    .addColumn('createdAt', 'timestamptz', (col) => col.notNull().defaultTo(sql`now()`))
    .addColumn('updatedAt', 'timestamptz', (col) => col.notNull().defaultTo(sql`now()`))
    .execute();

  await addUpdatedAtTrigger(db, 'verification');
}

export async function down(db: Kysely<any>): Promise<void> {
  await dropUpdatedAtTrigger(db, 'verification');
  await db.schema.dropTable('verification').ifExists().execute();

  await dropUpdatedAtTrigger(db, 'account');
  await db.schema.dropTable('account').ifExists().execute();

  await dropUpdatedAtTrigger(db, 'session');
  await db.schema.dropTable('session').ifExists().execute();

  await dropUpdatedAtTrigger(db, 'user');
  await db.schema.dropTable('user').ifExists().execute();

  await db.schema.dropType('role').execute();

  await sql`DROP FUNCTION IF EXISTS updateUpdatedAtColumn() CASCADE;`.execute(db);
}

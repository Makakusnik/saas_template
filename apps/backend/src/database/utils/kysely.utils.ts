import { Kysely, sql } from 'kysely';
import { capitalizeFirstLetter } from '../../utils/strings.utils';

/**
 * Adds a trigger to the specified table that automatically updates the 'updated_at'
 * column to the current timestamp whenever a row is updated.
 *
 * @param db The Kysely instance.
 * @param tableName The name of the table to add the trigger to.
 */

export async function addUpdatedAtTrigger(db: Kysely<any>, tableName: string): Promise<void> {
  await sql`
    CREATE TRIGGER ${sql.id(`updateUpdatedAtColumn${capitalizeFirstLetter(tableName)}`)}
    BEFORE UPDATE ON ${sql.id(tableName)}
    FOR EACH ROW
    EXECUTE FUNCTION updateUpdatedAtColumn();
  `.execute(db);
}

/**
 * Drops the trigger for the specified table created by the addUpdatedAtTrigger function.
 *
 * @param db The Kysely instance.
 * @param tableName The name of the table to drop the trigger from.
 */
export async function dropUpdatedAtTrigger(db: Kysely<any>, tableName: string): Promise<void> {
  await sql`DROP TRIGGER IF EXISTS ${sql.id(`updateUpdatedAtColumn${capitalizeFirstLetter(tableName)}`)} ON ${sql.id(tableName)};`.execute(db);
}

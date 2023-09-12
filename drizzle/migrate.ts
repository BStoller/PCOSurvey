import * as dotenv from 'dotenv';
import { migrate } from "drizzle-orm/libsql/migrator";
import { getDB } from './client';

dotenv.config();
dotenv.config({ path: `.env.local`, override: true });

export const db = getDB();

async function main() {
  try {
    await migrate(db, {
      migrationsFolder: "drizzle/migrations",
    });
    console.log("Tables migrated!");
    process.exit(0);
  } catch (error) {
    console.error("Error performing migration: ", error);
    process.exit(1);
  }
}

main();
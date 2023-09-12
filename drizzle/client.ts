import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from './schema';

interface Env {
  TURSO_DB_AUTH_TOKEN?: string;
  TURSO_DB_URL?: string;
}

export function getDB() {

  if(process.env.VERCEL_ENV == undefined)
    return drizzle(createClient({url: 'file:db'}), { schema })

  const url = process.env.TURSO_DB_URL?.trim();
  if (url === undefined) {
    throw new Error("TURSO_DB_URL is not defined");
  }

  const authToken = process.env.TURSO_DB_AUTH_TOKEN?.trim();
  if (authToken === undefined) {
    throw new Error("TURSO_DB_AUTH_TOKEN is not defined");
  }

  return drizzle(createClient({ url, authToken }), { schema });
}
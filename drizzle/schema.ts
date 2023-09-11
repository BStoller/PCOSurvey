import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const people = sqliteTable('people', {
    id: integer('id').primaryKey({autoIncrement: true}),
    pcoId : text('pcoId').notNull(),
    hidden: integer('hidden', { mode: 'boolean' })
})
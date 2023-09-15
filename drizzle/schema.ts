import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const people = sqliteTable('people', {
    id: integer('id').primaryKey({autoIncrement: true}),
    pcoId : text('pcoId').notNull(),
    hidden: integer('hidden', { mode: 'boolean' }),
    teamId : integer('teamId')
}, (table) => ({
    teamIdIdx : index('teamId_pcoId_idx').on(table.teamId, table.pcoId)
}) )
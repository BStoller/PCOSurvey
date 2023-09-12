"use server";

import { getDB } from "@/drizzle/client";
import { people } from "@/drizzle/schema";

export async function HidePerson(personId : string, teamId : number) {
    const db = getDB();

    const t = await db.insert(people).values({pcoId: personId, hidden: true, teamId}).onConflictDoNothing();

    return t.rowsAffected != 0;
}
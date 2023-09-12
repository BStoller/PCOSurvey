"use server";

import { getDB } from "@/drizzle/client";
import { people } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";

export async function AdjustPersonVisibility(
  personId: string,
  teamId: number,
  hidden: boolean
) {
  const db = getDB();

  const data = await db
    .select()
    .from(people)
    .where(and(eq(people.pcoId, personId), eq(people.teamId, teamId)))
    .limit(1);

  if (data.length > 0) {
    await db.update(people)
      .set({ hidden: hidden })
      .where(and(eq(people.pcoId, personId), eq(people.teamId, teamId)));
  }

  const t = await db
    .insert(people)
    .values({ pcoId: personId, hidden: hidden, teamId })
    .onConflictDoUpdate({ target: people.id, set: { hidden: hidden } });

  return t.rowsAffected != 0;
}

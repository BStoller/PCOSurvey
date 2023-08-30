import { z } from "zod";

export const teamPageSchema = z.coerce.number().int().min(0);

const personAttributes = z.object({
  first_name: z.string(),
  last_name: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

const personRelationships = z.object({
  team_leaders: z.object({
    data: z.array(z.object({ id: z.string(), type: z.literal("TeamLeader") })),
  }),
  team_positions: z.object({
    data: z.array(z.object({ id: z.string(), type: z.literal("TeamPosition") })),
  }),
  person_team_position_assignments: z.object({
    data: z.array(
      z.object({ id: z.string(), type: z.literal("PersonTeamPositionAssignment") })
    ),
  }),
});

const personLinks = z.object({
  self: z.string(),
});

const personData = z.object({
  type: z.literal("Person"),
  id: z.string(),
  attributes: personAttributes,
  links: personLinks,
});

const rootLinks = z.object({
  self: z.string(),
});

const rootMeta = z.object({
  total_count: z.number(),
  count: z.number(),
  can_order_by: z.array(z.string()),
  can_query_by: z.array(z.string()),
  can_include: z.array(z.string()),
  parent: z.object({ id: z.string(), type: z.literal("Team") }),
});

export const rootSchema = z.object({
  links: rootLinks,
  data: z.array(personData),
  included: z.array(z.unknown()),
  meta: rootMeta,
});

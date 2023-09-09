import { z } from "zod";

export const teamPageSchema = z.coerce.number().int().min(0);

export const searchParamsSchema = z.object({
  start : z.coerce.date().optional(),
  end: z.coerce.date().optional()
}).optional();

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

export const personRootSchema = z.object({
  links: rootLinks,
  data: z.array(personData),
  included: z.array(z.unknown()),
  meta: rootMeta,
});

const scheduleSchema = z.object({
  id: z.string(),
  type: z.literal("Schedule"),
  attributes: z.object({
    sort_date : z.coerce.date().optional(),
    decline_reason: z.string().optional().nullable(),
    team_name: z.string(),
    team_position_name : z.string()
  })
});

export const scheduleRootSchema = z.object({
  links: z.object({
    self: z.string(),
  }),
  data: z.array(scheduleSchema),
  included: z.array(z.unknown()),
  meta: z.object({
    onboarding: z.boolean(),
    total_count: z.number(),
    count: z.number(),
    can_order_by: z.array(z.string()),
    can_query_by: z.array(z.string()),
    can_include: z.array(z.string()),
    can_filter: z.array(z.string()),
    parent: z.object({
      id: z.string(),
      type: z.literal("Person"),
    }),
  }),
});

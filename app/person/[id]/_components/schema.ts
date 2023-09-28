import { z } from "zod";

const Attributes = z.object({
  access_media_attachments: z.boolean(),
  access_plan_attachments: z.boolean(),
  access_song_attachments: z.boolean(),
  anniversary: z.string().nullable(),
  archived: z.boolean(),
  archived_at: z.string().nullable(),
  assigned_to_rehearsal_team: z.boolean(),
  birthdate: z.string().nullable(),
  created_at: z.string(),
  facebook_id: z.string().nullable(),
  first_name: z.string(),
  full_name: z.string(),
  given_name: z.string().nullable(),
  ical_code: z.string(),
  last_name: z.string(),
  legacy_id: z.string(),
  logged_in_at: z.string().nullable(),
  max_permissions: z.enum(["Administrator", "Editor", "Scheduler", "Viewer"]),
  middle_name: z.string().nullable(),
  name_prefix: z.string().nullable(),
  name_suffix: z.string().nullable(),
  nickname: z.string().nullable(),
  notes: z.string().nullable(),
  passed_background_check: z.boolean(),
  permissions: z.enum(["Administrator", "Editor", "Scheduler", "Viewer"]),
  photo_thumbnail_url: z.string().url(),
  photo_url: z.string().url(),
  praise_charts_enabled: z.boolean(),
  preferred_app: z.enum(["services", "music_stand", "projector"]),
  preferred_max_plans_per_day: z.number().int().nullable(),
  preferred_max_plans_per_month: z.number().int().nullable(),
  site_administrator: z.boolean(),
  status: z.enum(["active", "inactive"]),
  updated_at: z.string()
});

const Person = z.object({
    type : z.literal("Person"),
    id : z.string(),
    attributes : Attributes,
});

export const personRootSchema = z.object({
    data : Person,
});

const Schedule = z.object({
  id: z.string(),
  starts_at: z.coerce.date(),
  plan_id: z.string(),
  team_id: z.string(),
  person_id: z.string()
});

export const scheduleRootSchema = z.object({
  links: z.object({
    self: z.string().url()
  }),
  data: z.array(Schedule),
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
      type: z.string()
    })
  })
});


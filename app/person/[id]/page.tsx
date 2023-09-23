import { pcoFetch } from "@/lib/pcoFetch";
import { notFound } from "next/navigation";
import { z } from "zod";
import { personRootSchema, scheduleRootSchema } from "./_components/schema";
import { DEFAULT_END_DATE, DEFAULT_START_DATE } from "./_components/defaults";
import { formatDate } from "@/lib/dateFormatter";

export default async function PersonPage({
  params: { id: _id },
  searchParams,
}: {
  params: { id: string };
  searchParams?: { start: Date; end: Date };
}) {
  const id = z.coerce.number().int().parse(_id);

  const { start = DEFAULT_START_DATE, end = DEFAULT_END_DATE } =
    searchParams ?? {};

  const personReq = await pcoFetch(
    `https://api.planningcenteronline.com/services/v2/people/${id}`,
    { options: { revalidate: 3600 }, callbackUrl: `/person/${id}` }
  );

  if (personReq.status == 404) return notFound();

  const personJson = await personReq.json();

  const personData = personRootSchema.parse(personJson);

  const scheduleReq = await pcoFetch(
    `https://api.planningcenteronline.com/services/v2/people/${id}/schedules?filter=before,after&per_page=100&before=${formatDate(end)}&after=${formatDate(start)}`,
    {callbackUrl: `/person/${id}`, options: {revalidate: 3600}}
  );

  const scheduleJson = await scheduleReq.json();

  const scheduleData = scheduleRootSchema.parse(scheduleJson);

  return <p>{id}</p>;
}

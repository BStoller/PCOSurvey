import { pcoFetch } from "@/lib/pcoFetch";
import { notFound } from "next/navigation";
import { z } from "zod";
import { personRootSchema, scheduleRootSchema, searchParamsSchema } from "./_components/schema";
import { DEFAULT_END_DATE, DEFAULT_START_DATE } from "./_components/defaults";
import { formatDate } from "@/lib/dateFormatter";
import { PositionBarChart } from "@/app/dashboard/(picker)/[teamId]/_components/chart";
import { PeopleTable } from "@/app/dashboard/(picker)/[teamId]/_components/table";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import * as _ from 'lodash'

export default async function PersonPage({
  params: { id: _id },
  searchParams,
}: {
  params: { id: string };
  searchParams?: { start: Date; end: Date };
}) {
  const id = z.coerce.number().int().parse(_id);

  const { start = DEFAULT_START_DATE, end = DEFAULT_END_DATE } =
    searchParamsSchema.parse(searchParams) ?? {};

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

  const positions = Object.entries(_.groupBy(scheduleData.data, (x) => (x.attributes.team_name + " - " + x.attributes.team_position_name))).map(([key, value]) => {
    return ({
      position: key,
      value: value.length
    })
  })

  return (
    <div className="mt-8 space-y-4 mb-4">
      <div className="flex gap-4">
      <h1 className="text-zinc-400 tracking-wide lg:text-3xl text-xl font-extrabold">{personData.data.attributes.full_name}</h1>

      </div>
      <div className="md:flex md:space-x-4 space-y-4 md:space-y-0">
        <Card className="md:w-1/4">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm font-normal text-zinc-400">
              Times Served
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-4xl">{Math.round(scheduleData.data.length)}</h2>
          </CardContent>
        </Card>
        <Card className="md:w-1/4">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm font-normal text-zinc-400">
              Different Positions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-4xl">{Math.round(positions.length)}</h2>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        <Card className="flex-1">
          <CardHeader className="text-sm font-medium">
            Average Times Served / Position
          </CardHeader>
          <CardContent>
            <div className="">
              <PositionBarChart data={positions}></PositionBarChart>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

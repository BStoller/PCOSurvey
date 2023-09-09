import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  personRootSchema,
  scheduleRootSchema,
  searchParamsSchema,
  teamPageSchema,
} from "./_components/schema";
import { pcoFetch } from "@/lib/pcoFetch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import * as _ from "lodash";
import { PositionBarChart } from "./_components/chart";

export default async function TeamPage({
  params: { teamId },
  searchParams
}: {
  params: { teamId: string },
  searchParams? : any
}) {

  function formatDate(val : Date) {
    const year = val.getUTCFullYear();
    const month = val.getUTCMonth();
    const day = val.getUTCDay();

    return `${year}/${month}/${day}`;
  }

  const id = teamPageSchema.parse(teamId);

  const defaultStart = new Date();

  defaultStart.setMonth(defaultStart.getMonth() - 3);

  const {
    end = new Date(),
    start = defaultStart
  } = searchParamsSchema.parse(searchParams) ?? {};

  const req = await pcoFetch(
    `https://api.planningcenteronline.com/services/v2/teams/${teamId}/people?per_page=100`,
    {
      options: {
        revalidate: 3600,
      },
    }
  );

  const json = await req.json();

  const personData = personRootSchema.parse(json);

  const responses = personData.data.map(async (person) => {
    const req = await pcoFetch(
      person.links.self +
        `/schedules?filter=before,after&after=${formatDate(start)}&before=${formatDate(end)}&where[team_id]=${teamId}`,
      {
        callbackUrl: `/dashboard/${teamId}`,
        options: {
          revalidate: 3600,
        },
      }
    );

    const data = scheduleRootSchema.parse(await req.json());

    return {
      ...person,
      schedules: { ...data },
    };
  });

  var mappedData = (await Promise.all(responses))
    .filter((x) => x.schedules.data.length > 0)
    .map((person) => {
      const validSchedules = person.schedules.data.filter(
        (x) => x.attributes.decline_reason == null
      );

      const positionsServed = _.groupBy(
        person.schedules.data.filter(
          (x) => x.attributes.decline_reason == null
        ),
        (x) => x.attributes.team_position_name
      );

      const numberByPosition = Object.entries(positionsServed).map(
        ([key, value]) => ({
          positionName: key,
          timesServed: value.length,
        })
      );

      return {
        ...person,
        schedules: {
          ...person.schedules,
          data: validSchedules,
          positionsServed: positionsServed,
          numberByPosition: numberByPosition,
        },
      };
    });

  const positions = 
    Object.entries(_.groupBy(
      mappedData.map((x) => (x.schedules.numberByPosition)).flat(),
      (x) => x.positionName
    ))
    .map(([key, value]) => ({
    position: key,
    value: value
      .map((x) => x.timesServed)
      .reduce((prev, cur) => {
        return (prev += cur);
      }, 0) / value.length,
  })).sort((a,b) => b.value - a.value);

  const averageTimesServed =
    mappedData.reduce((prev, cur) => {
      prev += cur.schedules.data.length;

      return prev;
    }, 0) / mappedData.length;

  const peopleServing = mappedData.length;

  return (
    <div className="mt-8 space-y-4">
      <div className="md:flex md:space-x-4 space-y-4 md:space-y-0">
        <Card className="md:w-1/4">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm font-normal text-zinc-400">
              Average Times Served
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-4xl">{Math.round(averageTimesServed)}</h2>
          </CardContent>
        </Card>
        <Card className="md:w-1/4">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm font-normal text-zinc-400">
              People Serving
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-4xl">{Math.round(peopleServing)}</h2>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Top People Serving
            </CardTitle>
            <CardDescription>
              These are the people who served the most in the time period
            </CardDescription>
            <CardContent className="h-60 p-0">
              <div className="h-60 overflow-auto">
                <Table className="lg:max-w-md">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>#</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mappedData
                      .sort(
                        (a, b) =>
                          b.schedules.data.length - a.schedules.data.length
                      )
                      .map((person) => (
                        <TableRow key={person.id}>
                          <TableCell>
                            {person.attributes.first_name}{" "}
                            {person.attributes.last_name}
                          </TableCell>
                          <TableCell className="text-right">
                            {person.schedules.data.length}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </CardHeader>
        </Card>
        <Card className="flex-1">
          <CardHeader className="text-sm font-medium">
            Average Times Served / Position
          </CardHeader>
          <CardContent>
            <PositionBarChart data={positions}></PositionBarChart>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

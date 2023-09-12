import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { searchParamsSchema, teamPageSchema } from "./_components/schema";
import * as _ from "lodash";
import { PositionBarChart } from "./_components/chart";
import { END_DEFAULT, START_DEFAULT } from "../_components/dateDefaults";
import { getData } from "./_components/data";
import { PeopleTable } from "./_components/table";

export default async function TeamPage({
  params: { teamId },
  searchParams,
}: {
  params: { teamId: string };
  searchParams?: any;
}) {
  const id = teamPageSchema.parse(teamId);

  const defaultStart = new Date();

  defaultStart.setMonth(defaultStart.getMonth() - 3);

  const { end = END_DEFAULT, start = START_DEFAULT } =
    searchParamsSchema.parse(searchParams) ?? {};

  const mappedData = await getData(start, end, id);

  const positions = Object.entries(
    _.groupBy(
      mappedData
        .filter((x) => !x.hidden)
        .map((x) => x.schedules.numberByPosition)
        .flat(),
      (x) => x.positionName
    )
  )
    .map(([key, value]) => ({
      position: key,
      value: Math.ceil(
        value
          .map((x) => x.timesServed)
          .reduce((prev, cur) => {
            return (prev += cur);
          }, 0) / value.length
      ),
    }))
    .sort((a, b) => b.value - a.value);

  const averageTimesServed =
    mappedData
      .filter((x) => !x.hidden)
      .reduce((prev, cur) => {
        prev += cur.schedules.data.length;

        return prev;
      }, 0) / mappedData.length;

  const peopleServing = mappedData.filter((x) => !x.hidden).length;

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
              People Serving During This Period
            </CardTitle>
            <CardDescription>
              These are the people who served during this time period
            </CardDescription>
            <CardContent className="p-0">
              <PeopleTable data={mappedData} teamId={id}></PeopleTable>
            </CardContent>
          </CardHeader>
        </Card>
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

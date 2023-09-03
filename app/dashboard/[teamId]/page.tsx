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

export default async function TeamPage({
  params: { teamId },
}: {
  params: { teamId: string };
}) {
  const id = teamPageSchema.parse(teamId);

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
        `/schedules?filter=after&after=2023-07-01&where[team_id]=${teamId}`,
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

  const mappedData = (await Promise.all(responses)).filter(
    (x) => x.schedules.data.length > 0
  );

  const averageTimesServed =
    mappedData.reduce((prev, cur) => {
      prev += cur.schedules.data.length;

      return prev;
    }, 0) / mappedData.length;

  return (
    <div className="mt-8 space-y-4">
      <div className="flex space-x-4">
        <Card className="w-fit">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm font-normal text-zinc-400">
              Average Times Served
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-4xl">{Math.round(averageTimesServed)}</h2>
          </CardContent>
        </Card>
        <Card className="w-fit">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm font-normal text-zinc-400">
              Average Times Served
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-4xl">{Math.round(averageTimesServed)}</h2>
          </CardContent>
        </Card>
      </div>
      <div className="flex space-x-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Top People Serving
            </CardTitle>
            <CardDescription>
              These are the people who served the most in the time period
            </CardDescription>
            <CardContent className="p-0">
              <div className="h-60 overflow-scroll">
                <Table className="lg:max-w-md overflow-scroll">
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
                          <TableCell className="text-right">{person.schedules.data.length}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

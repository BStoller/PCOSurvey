import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import {
  personRootSchema,
  scheduleRootSchema,
  teamPageSchema,
} from "./_components/schema";

export default async function TeamPage({
  params: { teamId },
}: {
  params: { teamId: string };
}) {
  const id = teamPageSchema.parse(teamId);

  const user = await getServerSession(authOptions);

  const req = await fetch(
    `https://api.planningcenteronline.com/services/v2/teams/${teamId}/people?per_page=100`,
    {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      next: {
        revalidate: 3600,
      },
    }
  );

  const json = await req.json();

  const personData = personRootSchema.parse(json);

  const responses = personData.data.map(async (person) => {
    const req = await fetch(
      person.links.self +
        `/schedules?filter=after&after=2023-07-01&where[team_id]=${teamId}`,
      {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
        next: {
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

  const mappedData = await Promise.all(responses);

  return (
    <>
      {mappedData
        .filter((person) => person.schedules.data.length > 0)
        .map((person) => (
          <div key={person.id}>
            {person.attributes.first_name} {person.attributes.last_name}{" "}
            {
              person.schedules.data.filter(
                (x) => x.attributes.decline_reason != ""
              ).length
            }
          </div>
        ))}
    </>
  );
}

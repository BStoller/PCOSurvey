import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { rootSchema, teamPageSchema } from "./_components/schema";

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
            Authorization: `Bearer ${user?.accessToken}`
        }
    }
  );

  const json = await req.json();

  const personData = rootSchema.parse(json);

  return (
    <>
        {personData.data.map(person => (
            <div key={person.id}>
                {person.attributes.first_name} {person.attributes.last_name}
            </div>
        ))}
    </>
  );
}

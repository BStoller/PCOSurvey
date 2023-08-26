import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { CommandEmpty } from "cmdk";
import { TeamsResponse } from "@/lib/types/pcoResponses";
import { SelectTeamCommand } from "@/components/custom/dashboard/teams";

// export const runtime = "edge";

export default async function Dashboard() {
  const user = await getServerSession(authOptions);

  async function getData(page: number) {
    const req = await fetch(
      `https://api.planningcenteronline.com/services/v2/teams?per_page=100&include=service_type&offset=${
        page * 100
      }`,
      {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      }
    );

    const json = (await req.json()) as TeamsResponse;

    return json;
  }

  var { data, meta, included = [] } = await getData(0);

  for (
    var i = 0;
    (i += Math.ceil(meta.total_count / 100 - 1));
    i * 100 <= meta.total_count
  ) {
    const { data: _data, included: _included } = await getData(i);
    data = data.concat(_data);
    included = included?.concat(included);
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-xl mt-8 text-zinc-400">Select team to analyze</h1>
      <div className="mx-auto max-w-fit mt-4">
      <SelectTeamCommand serviceTypes={included} teams={data}></SelectTeamCommand>
      </div>
    </div>
  );
}

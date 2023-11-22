import { TeamsResponse } from "@/lib/types/pcoResponses";
import { SelectTeamCommand } from "@/components/custom/dashboard/teams";
import { pcoFetch } from "@/lib/pcoFetch";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { CommandItem } from "cmdk";

// export const runtime = "edge";

const PER_PAGE = 100;

export default async function Dashboard() {
  async function getData(page: number) {
    const req = await pcoFetch(
      `https://api.planningcenteronline.com/services/v2/teams?per_page=${PER_PAGE}&include=service_type&offset=${
        page * PER_PAGE
      }`,
      {
        callbackUrl: "/dashboard",
      }
    );

    console.log(req.url);

    const json = (await req.json()) as TeamsResponse;

    return json;
  }

  var { data, meta, included = [] } = await getData(0);

  for (var i = 1; i <= Math.ceil(meta.total_count / PER_PAGE) - 1; i++) {
    const { data: _data, included: _included } = await getData(i);
    data = data.concat(
      _data.filter((x) => !data.map((x) => x.id).includes(x.id))
    );
    included = included?.concat(
      _included?.filter((x) => !included.map((x) => x.id).includes(x.id)) ?? []
    );
  }

  return (
    <>
      <h1 className="pt-8">Select A Team To Analyze</h1>
      <div className="py-2">
        <Input placeholder="Search" className="md:max-w-sm"></Input>
      </div>
      <div className="pb-4 grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data.map((team) => (
          <Link key={team.id} className="rounded-md p-2 bg-gray-200" href={`/dashboard/${team.id}`} prefetch={false}>
            <h2>{team.attributes.name}</h2>
            <p>
              {
                included.find(
                  (type) =>
                    type.id == team.relationships?.service_type?.data?.id ??
                    false
                )?.attributes?.name
              }
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}

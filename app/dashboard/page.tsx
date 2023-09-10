import { TeamsResponse } from "@/lib/types/pcoResponses";
import { SelectTeamCommand } from "@/components/custom/dashboard/teams";
import { pcoFetch } from "@/lib/pcoFetch";

// export const runtime = "edge";

const PER_PAGE = 100;

export default async function Dashboard() {
  async function getData(page: number) {
    const req = await pcoFetch(
      `https://api.planningcenteronline.com/services/v2/teams?per_page=10&include=service_type&offset=${
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

  for (var i = 1; i <= Math.ceil(meta.total_count / PER_PAGE); i++) {
    const { data: _data, included: _included } = await getData(i);
    data = data.concat(_data);
    included = included?.concat(
      _included?.filter((x) => !included.map((x) => x.id).includes(x.id)) ?? []
    );
  }

  return (
    <div className="max-w-fit mx-auto">
      <h1 className="text-xl mt-8 text-zinc-400">Select team to analyze</h1>
      <div className="max-w-fit mt-4">
        <SelectTeamCommand
          serviceTypes={included}
          teams={data}
        ></SelectTeamCommand>
      </div>
    </div>
  );
}

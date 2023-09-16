import { pcoFetch } from "../pcoFetch";
import { TeamsResponse } from "../types/pcoResponses";

const PER_PAGE = 100;

async function getTeamByPage(page: number) {
  const req = await pcoFetch(
    `https://api.planningcenteronline.com/services/v2/teams?per_page=${PER_PAGE}&include=service_type&offset=${
      page * PER_PAGE
    }`,
    {
      options: {
        revalidate: 3600,
      },
      callbackUrl: "/dashboard",
    }
  );

  console.log(req.url);

  const json = (await req.json()) as TeamsResponse;

  return json;
}

export async function getAllTeams() {
  var { data, meta, included = [] } = await getTeamByPage(0);

  for (var i = 1; i <= Math.ceil(meta.total_count / PER_PAGE) - 1; i++) {
    const { data: _data, included: _included } = await getTeamByPage(i);
    data = data.concat(
      _data.filter((x) => !data.map((x) => x.id).includes(x.id))
    );
    included = included?.concat(
      _included?.filter((x) => !included.map((x) => x.id).includes(x.id)) ?? []
    );
  }

  return {serviceTypes : included, data} as const;
}

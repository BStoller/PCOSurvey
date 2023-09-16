import { TeamsResponse } from "@/lib/types/pcoResponses";
import { SelectTeamCommand } from "@/components/custom/dashboard/teams";
import { pcoFetch } from "@/lib/pcoFetch";
import { getAllTeams } from "@/lib/planningCenter/teams";

// export const runtime = "edge";

export default async function Dashboard() {
  const {data, serviceTypes} = await getAllTeams();

  return (
    <div className="max-w-fit mx-auto">
      <h1 className="text-xl mt-8 text-zinc-400">Select team to analyze</h1>
      <div className="max-w-fit mt-4">
        <SelectTeamCommand
          serviceTypes={serviceTypes}
          teams={data}
        ></SelectTeamCommand>
      </div>
    </div>
  );
}

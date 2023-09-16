import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ServiceType, Team } from "@/lib/types/pcoResponses";
import Link from "next/link";
import { ReactNode } from "react";

function DefaultLinkToPage({
  team,
  serviceType,
}: {
  team: Team;
  serviceType: ServiceType;
}) {
  return (
    <Link href={`/dashboard/${team.id}`} prefetch={false}>
      <CommandItem className="cursor-pointer">
        {serviceType.attributes?.name} - {team.attributes.name}
      </CommandItem>
    </Link>
  );
}

export function SelectTeamCommand({
  teams,
  serviceTypes,
  render = DefaultLinkToPage,
}: {
  teams: Team[];
  serviceTypes: ServiceType[];
  render?: ({
    team,
    serviceType,
  }: {
    team: Team;
    serviceType: ServiceType;
  }) => ReactNode;
}) {
  return (
    <Command className="max-w-xs">
      <CommandInput placeholder="Search a team" autoFocus></CommandInput>
      <CommandList>
        <CommandGroup>
          <CommandEmpty>No teams...</CommandEmpty>
          {teams.map((team) => (
            <div key={team.id}>
              {render({
                team,
                serviceType:
                  serviceTypes.find(
                    (x) => x.id == team.relationships?.service_type?.data?.id
                  ) ?? {},
              })}
            </div>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

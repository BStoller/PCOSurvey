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

export function SelectTeamCommand({
  teams,
  serviceTypes,
}: {
  teams: Team[];
  serviceTypes: ServiceType[];
}) {
  return (
    <Command className="max-w-xs">
      <CommandInput placeholder="Search a team" autoFocus></CommandInput>
      <CommandList>
        <CommandGroup>
          <CommandEmpty>No teams...</CommandEmpty>
          {teams.map((team) => (
            <Link key={team.id} href={`/dashboard/${team.id}`} prefetch={false}>
              <CommandItem className="cursor-pointer">
                {
                  serviceTypes.find(
                    (type) =>
                      type.id == team.relationships?.service_type?.data?.id ??
                      false
                  )?.attributes?.name
                }{" "}
                - {team.attributes.name}
              </CommandItem>
            </Link>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

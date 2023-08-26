import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ServiceType, Team } from "@/lib/types/pcoResponses";

export function SelectTeamCommand({
  teams,
  serviceTypes,
}: {
  teams: Team[];
  serviceTypes: ServiceType[];
}) {
  return (
    <Command className="max-w-xs">
      <CommandInput placeholder="Search a team"></CommandInput>
      <CommandList>
        <CommandGroup>
            <CommandEmpty>No teams...</CommandEmpty>
            {teams.map(team => (
                <CommandItem key={team.id}>{serviceTypes.find(type => type.id == team.relationships?.service_type?.data?.id ?? false)?.attributes?.name} - {team.attributes.name}</CommandItem>
            ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

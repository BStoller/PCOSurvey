import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { getData } from "./data";
import { RemoveFromListButton } from "./removeFromList";

export function PeopleTable({ data, teamId }: { data: Awaited<ReturnType<typeof getData>>, teamId : number }) {
  return (
    <Table className="lg:max-w-md">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>#</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.filter(x => !x.hidden)
          .sort((a, b) => b.schedules.data.length - a.schedules.data.length)
          .map((person) => (
            <TableRow key={person.id}>
              <TableCell>
                {person.attributes.first_name} {person.attributes.last_name}
              </TableCell>
              <TableCell className="text-right">
                {person.schedules.data.length}
              </TableCell>
              <TableCell><RemoveFromListButton personId={person.id} teamId={teamId}></RemoveFromListButton></TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

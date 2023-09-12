import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { getData } from "./data";

export function PeopleTable({ data }: { data: Awaited<ReturnType<typeof getData>> }) {
  return (
    <Table className="lg:max-w-md">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>#</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data
          .sort((a, b) => b.schedules.data.length - a.schedules.data.length)
          .map((person) => (
            <TableRow key={person.id}>
              <TableCell>
                {person.attributes.first_name} {person.attributes.last_name}
              </TableCell>
              <TableCell className="text-right">
                {person.schedules.data.length}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

"use client";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { getData } from "./data";
import { VisibilityButton } from "./visibilityButton";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ExternalLink, EyeIcon } from "lucide-react";
import Link from "next/link";

export function PeopleTable({
  data,
  teamId,
}: {
  data: Awaited<ReturnType<typeof getData>>;
  teamId: number;
}) {
  const [search, setSearch] = useState("");
  const [hidden, setHidden] = useState(false);

  return (
    <>
      <div className="mb-4">
        <Input
          placeholder="Search Person"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></Input>
        <Button size={"sm"} variant={"link"} onClick={() => setHidden(!hidden)}>
          {hidden ? "Show Visible" : "Show Hidden"}
        </Button>
      </div>

      <div className="max-h-52 overflow-auto">
        <Table className="lg:max-w-md">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>#</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data
              .filter(
                (x) =>
                  x.hidden == hidden &&
                  (search == "" ||
                    (
                      x.attributes.first_name +
                      " " +
                      x.attributes.last_name
                    ).includes(search))
              )
              .sort((a, b) => b.schedules.data.length - a.schedules.data.length)
              .map((person) => (
                <TableRow key={person.id} className="group">
                  <TableCell className="p-0">
                    <div className="h-full flex items-center">
                      {person.attributes.first_name}{" "}
                      {person.attributes.last_name}
                    </div>
                  </TableCell>
                  <TableCell className="text-right p-0">
                    {person.schedules.data.length}
                  </TableCell>
                  <TableCell className="p-0 pl-2 text-center">
                    <Button asChild variant={"ghost"}>
                      <Link href={`/person/${person.id}`}><ExternalLink className="h-4 w-4"></ExternalLink></Link>
                    </Button>
                    {!hidden && (
                      <VisibilityButton
                        personId={person.id}
                        teamId={teamId}
                        hide={true}
                      >
                        <p>Are you sure you want to hide this person?</p>
                      </VisibilityButton>
                    )}
                    {hidden && (
                      <VisibilityButton
                        hide={false}
                        personId={person.id}
                        teamId={teamId}
                        icon={<EyeIcon className="h-4 w-4"></EyeIcon>}
                      >
                        <p>Are you sure you want to show this person?</p>
                      </VisibilityButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

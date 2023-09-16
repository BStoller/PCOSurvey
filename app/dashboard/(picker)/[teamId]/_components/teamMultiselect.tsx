"use client";

import { SelectTeamCommand } from "@/components/custom/selectTeamCommand";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { ServiceType, Team } from "@/lib/types/pcoResponses";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";

const paramsSchema = z.string().array().optional();

export function TeamMultiSelect({
  teams,
  serviceTypes,
}: {
  teams: Team[];
  serviceTypes: ServiceType[];
}) {
  const params = useSearchParams();

  const [selected, setSelected] = useState(
    teams.filter((x) =>
      paramsSchema.parse(params.get("teamIds")?.split(","))?.includes(x.id)
    )
  );

  const [text, setText] = useState("");

  useEffect(() => {
    setText(
      selected
        .map(
          (team) =>
            serviceTypes.find(
              (x) => team.relationships?.service_type?.data?.id == x.id
            )?.attributes?.name +
            " - " +
            team.attributes.name
        )
        .join(", ")
    );
  }, [selected, serviceTypes]);

  return (
    <div className="flex gap-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"outline"}>
            <div>
              <h2 className="text-xs text-left">Additional Teams</h2>
              <p className="max-w-xs truncate">{text}</p>
            </div>
          </Button>
        </SheetTrigger>
        <SheetContent className="text-white">
            <SheetHeader>Teams</SheetHeader>
            <SelectTeamCommand serviceTypes={serviceTypes} teams={teams}></SelectTeamCommand>
        </SheetContent>
      </Sheet>
    </div>
  );
}

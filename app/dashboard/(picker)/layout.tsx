import { ReactNode } from "react";
import { DashboardDateRangePicker } from "./_components/dateRangePicker";
import { TeamMultiSelect } from "./[teamId]/_components/teamMultiselect";
import { getAllTeams } from "@/lib/planningCenter/teams";

export default async function PickerLayout({ children }: { children: ReactNode }) {

  const {data, serviceTypes} = await getAllTeams();

  return (
    <>
      <div className="flex lg:justify-between mt-4 items-center">
        <TeamMultiSelect teams={data} serviceTypes={serviceTypes}></TeamMultiSelect>
        <DashboardDateRangePicker></DashboardDateRangePicker>
      </div>
      {children}
    </>
  );
}

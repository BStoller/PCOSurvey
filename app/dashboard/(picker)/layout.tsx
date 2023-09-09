import { ReactNode } from "react";
import { DashboardDateRangePicker } from "./_components/dateRangePicker";

export default function PickerLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex justify-end mt-4">
        <DashboardDateRangePicker></DashboardDateRangePicker>
      </div>
      {children}
    </>
  );
}

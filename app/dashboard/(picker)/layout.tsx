import { ReactNode } from "react";
import { DashboardDateRangePicker } from "./_components/dateRangePicker";

export default function PickerLayout({ children }: { children: ReactNode }) {
  return <>
  <DashboardDateRangePicker></DashboardDateRangePicker>
  {children}</>;
}

import { StartEndSearchPicker } from "@/components/custom/searchDateRangePicker";
import { ReactNode } from "react";

export default function PersonLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container">
      <div className="flex lg:justify-end mt-4">
        <StartEndSearchPicker></StartEndSearchPicker>
      </div>
      {children}
    </div>
  );
}

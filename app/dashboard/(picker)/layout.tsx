import { ReactNode } from "react";
import { StartEndSearchPicker } from "../../../components/custom/searchDateRangePicker";

export default function PickerLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex lg:justify-end mt-4">
        <StartEndSearchPicker></StartEndSearchPicker>
      </div>
      {children}
    </>
  );
}

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { END_DEFAULT, START_DEFAULT } from "./dateDefaults";
import { DatePickerWithRange } from "@/components/custom/dateRangePicker";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/dateFormatter";
import { z } from "zod";

export function DashboardDateRangePicker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const start = z.coerce
      .date()
      .optional()
      .parse(searchParams.get("start") ?? START_DEFAULT);

    const end = z.coerce
      .date()
      .optional()
      .parse(searchParams.get("end") ?? END_DEFAULT);

    setDates({ from: start, to: end });
  }, [searchParams]);

  const [dates, setDates] = useState<DateRange | undefined>();

  const [pristine, setPristine] = useState(true);

  useEffect(() => {
    setPristine(false);
  }, [dates]);

  const router = useRouter();

  function handleClick() {
    setPristine(true);
    router.push(
      `?start=${formatDate(dates?.from ?? START_DEFAULT)}&end=${formatDate(
        dates?.to ?? END_DEFAULT
      )}`
    );
  }

  return (
    <div className="flex gap-4">
      <DatePickerWithRange
        date={dates}
        setDate={setDates}
      ></DatePickerWithRange>
      <Button variant={"outline"} disabled={pristine} onClick={handleClick}>
        Apply
      </Button>
    </div>
  );
}

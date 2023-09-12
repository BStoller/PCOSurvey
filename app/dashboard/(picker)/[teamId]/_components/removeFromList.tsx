"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MinusCircle } from "lucide-react";
import { useState, useTransition } from "react";
import { HidePerson } from "./action";
import { useRouter } from "next/navigation";

export function RemoveFromListButton({
  personId,
  teamId,
}: {
  personId: string;
  teamId: number;
}) {
  const [open, setOpen] = useState(false);

  const [pending, startTransition] = useTransition();

  const router = useRouter();

  function handleClick() {
    startTransition(() => {
      async function sendData() {
        const result = await HidePerson(personId, teamId);

        if (!result) return;

        router.refresh();
      }

      sendData();
    });
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={"ghost"}>
          <MinusCircle className="h-4 w-4"></MinusCircle>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <p>Are you sure you want to hide this person?</p>
        <div className="flex gap-2 pt-4">
          <Button size={"sm"} onClick={() => handleClick()}>
            Confirm
          </Button>
          <Button size={"sm"} variant={"ghost"} onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LucideIcon, MinusCircle } from "lucide-react";
import { ReactNode, useState, useTransition } from "react";
import { AdjustPersonVisibility } from "./action";
import { useRouter } from "next/navigation";

export function VisibilityButton({
  personId,
  teamId,
  hide,
  children,
  icon = <MinusCircle className="h-4 w-4"></MinusCircle>
}: {
  personId: string;
  teamId: number;
  hide: boolean;
  children: ReactNode;
  icon? : ReactNode
}) {
  const [open, setOpen] = useState(false);

  const [pending, startTransition] = useTransition();

  const router = useRouter();

  function handleClick() {
    startTransition(() => {
      async function sendData() {
        const result = await AdjustPersonVisibility(personId, teamId, hide);

        if (!result) return;

        setOpen(false);
        router.refresh();
      }

      sendData();
    });
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={"ghost"}>
          {icon}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        {children}
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

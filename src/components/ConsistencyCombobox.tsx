"use client";

import * as React from "react";
import { ChevronsUpDown, Check } from "lucide-react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { CONSISTENCIES } from "@/data/consistencies";

interface Props {
  value: number;
  onChange: (v: number) => void;
  className?: string;
}

export default function ConsistencyCombobox({
  value,
  onChange,
  className,
}: Props) {
  const [open, setOpen] = React.useState(false);

  /** Derive the currently selected option from `value` (controlled). */
  const selected = React.useMemo(
    () => CONSISTENCIES.find((opt) => opt.value === value) ?? null,
    [value]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "justify-between min-w-[280px] max-w-[380px]",
            className
          )}
        >
          {selected ? (
            <>
              {selected.label}
              <span className="ml-auto text-xs text-muted-foreground">
                ({selected.consistency})
              </span>
            </>
          ) : (
            "Choose a plaster type…"
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search plaster…" />
          <CommandList>
            <CommandEmpty>No match.</CommandEmpty>
            <CommandGroup>
              {CONSISTENCIES.map((opt) => (
                <CommandItem
                  key={opt.id}
                  // searchable by label *or* numeric value
                  value={`${opt.label.toLowerCase()} ${opt.value}`}
                  onSelect={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className="w-full"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected?.id === opt.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {opt.label}
                  <span className="ml-auto text-xs text-muted-foreground">
                    {opt.consistency}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

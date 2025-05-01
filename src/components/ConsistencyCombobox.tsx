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
  value: number; // current consistency
  onChange: (v: number) => void;
  className?: string;
}

export default function ConsistencyCombobox({
  value,
  onChange,
  className,
}: Props) {
  const [open, setOpen] = React.useState(false);

  // Find the USG #1 Pottery option to use as default
  const defaultOption =
    CONSISTENCIES.find((opt) => opt.id === "usg-1-pottery") || null;

  const [selected, setSelect] = React.useState<
    (typeof CONSISTENCIES)[number] | null
  >(defaultOption);

  // Call onChange with default value when component mounts
  React.useEffect(() => {
    if (defaultOption) {
      onChange?.(defaultOption.value);
    }
  }, []);

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
              <span className="text-muted-foreground ml-1">
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
                    setSelect(opt); // remember whole option (includes id)
                    onChange?.(opt.value); // still emit the numeric part
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

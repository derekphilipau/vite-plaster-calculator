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
import { useTranslation } from "react-i18next";

import { CONSISTENCIES, ConsistencyOption } from "@/data/consistencies";

interface Props {
  selectedId: string | null;
  onChange: (id: string | null, value: number) => void;
  className?: string;
}

export default function ConsistencyCombobox({
  selectedId,
  onChange,
  className,
}: Props) {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);

  const selected = React.useMemo(
    () => CONSISTENCIES.find((opt) => opt.id === selectedId) ?? null,
    [selectedId]
  );

  const displayOption: ConsistencyOption | null = selected;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "bg-white text-base justify-between min-w-[280px] max-w-[380px]",
            className
          )}
        >
          {displayOption ? (
            <>
              {displayOption.label}
              <span className="ml-auto text-xs text-muted-foreground">
                ({displayOption.consistency})
              </span>
            </>
          ) : (
            t("Calculator.choosePlaster")
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
        <Command className="bg-white">
          <CommandInput placeholder={t("Calculator.searchPlaster")} />
          <CommandList>
            <CommandEmpty>{t("Calculator.noPlasterMatch")}</CommandEmpty>
            <CommandGroup>
              {CONSISTENCIES.map((opt) => (
                <CommandItem
                  key={opt.id}
                  value={`${opt.label.toLowerCase()} ${opt.value}`}
                  onSelect={() => {
                    onChange(opt.id, opt.value);
                    setOpen(false);
                  }}
                  className="w-full flex gap-2 items-center"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected?.id === opt.id ? "opacity-100" : "opacity-0" // Check against selected?.id
                    )}
                  />
                  <div className="flex flex-col">
                    <div>{opt.label}</div>
                    <div className="text-xs text-muted-foreground">
                      {t("Calculator.recommendedConsistency")}:{" "}
                      {opt.consistency}
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

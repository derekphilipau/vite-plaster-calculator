import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Globe2 } from "lucide-react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LANGS = [
  { code: "de", name: "Deutsch" },
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "it", name: "Italiano" },
  { code: "pt", name: "Português" },
  { code: "nl", name: "Nederlands" },
  { code: "zh", name: "中文" },
];

export default function LocaleSwitcher({ className }: { className?: string }) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const current = i18n.language.split("-")[0];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className={className}>
          <Globe2 className="size-5" />
          <span className="sr-only">Change language</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-40 p-0">
        {LANGS.map((l) => (
          <button
            key={l.code}
            onClick={() => {
              i18n.changeLanguage(l.code);
              setOpen(false);
            }}
            className={cn(
              "w-full px-3 py-2 text-left hover:bg-accent",
              current === l.code && "font-medium"
            )}
          >
            {l.name}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}

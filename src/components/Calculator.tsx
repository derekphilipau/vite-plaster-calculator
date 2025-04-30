"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ResultsDisplay from "./ResultsDisplay";
import Notes from "./Notes";
import { VolumeCalculator } from "./VolumeCalculator";
import ConsistencyCombobox from "@/components/ConsistencyCombobox";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { in3ToCm3, cm3ToIn3, in3ToFt3 } from "@/utils/plaster";

export default function Calculator() {
  const { t, i18n } = useTranslation();

  const [precision] = useState(2);

  // pick default by locale: English = inches, everywhere else = centimetres
  const localeDefault: "in" | "cm" = /^en\b/i.test(i18n.language) ? "in" : "cm";
  const [selectedUnits, setSelectedUnits] = useState<"in" | "cm">(
    localeDefault
  );
  const [consistency, setConsistency] = useState<number>(70);
  const [shapeVolume, setShapeVolume] = useState<number>(0);
  const [manualVolume, setManualVolume] = useState<string>("");

  // when the user changes language at runtime, update the unit radio
  useEffect(() => {
    setSelectedUnits(/^en\b/i.test(i18n.language) ? "in" : "cm");
  }, [i18n.language]);

  const volume =
    manualVolume.trim() !== "" ? Number(manualVolume) : shapeVolume;

  const echo = (() => {
    if (!volume || Number.isNaN(volume)) return null;
    const in3 = selectedUnits === "in" ? volume : cm3ToIn3(volume);
    const cm3 = selectedUnits === "cm" ? volume : in3ToCm3(volume);
    const ft3 = in3ToFt3(in3);
    const fmt = (n: number, p = 2) =>
      n.toLocaleString(undefined, {
        minimumFractionDigits: p,
        maximumFractionDigits: p,
      });
    return selectedUnits === "in"
      ? `${fmt(cm3)} cm³, ${fmt(ft3, 5)} ft³`
      : `${fmt(in3)} in³, ${fmt(ft3, 5)} ft³`;
  })();

  return (
    <div className="flex flex-col space-y-6 items-center">
      <VolumeCalculator
        selectedUnits={selectedUnits}
        onVolumeChange={(v) => {
          setShapeVolume(v);
          setManualVolume(v !== null ? v.toFixed(2) : "");
        }}
      />

      <div className="flex flex-col items-center space-y-2 w-full">
        <div>
          <div className="flex items-center gap-4 w-full">
            <Label htmlFor="vol" className="text-sm font-medium leading-none">
              {t("Calculator.volume")}
            </Label>
            <Input
              id="vol"
              type="number"
              className="w-32"
              value={manualVolume}
              onChange={(e) => setManualVolume(e.target.value)}
              aria-label={`Volume in ${selectedUnits}³`}
            />
            <span className="text-sm">
              {selectedUnits}
              <sup>3</sup>
            </span>
          </div>
        </div>
        {echo && (
          <div>
            <small className="text-muted-foreground -mt-2">{echo}</small>
          </div>
        )}
      </div>

      <div className="">
        <RadioGroup
          defaultValue={selectedUnits}
          onValueChange={(value) => setSelectedUnits(value)}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cm" id="unitsCm" />
            <Label htmlFor="unitsCm">{t("Calculator.cm")}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="in" id="unitsIn" />
            <Label htmlFor="unitsIn">{t("Calculator.in")}</Label>
          </div>
        </RadioGroup>
      </div>

      <ConsistencyCombobox value={consistency} onChange={setConsistency} />

      <div>
        <div className="flex items-center gap-4 w-full">
          <Label
            htmlFor="consistencyManual"
            className="text-sm font-medium leading-none"
          >
            {t("Calculator.manualConsistency")}
          </Label>
          <Input
            id="consistencyManual"
            type="number"
            className="w-24"
            min={1}
            step="any"
            value={consistency.toString()}
            onChange={(e) => setConsistency(Number(e.target.value))}
          />
        </div>
      </div>

      <ResultsDisplay
        volume={volume}
        units={selectedUnits}
        consistency={consistency}
      />

      <Notes volume={volume} units={selectedUnits} consistency={consistency} />
    </div>
  );
}

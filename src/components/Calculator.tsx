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
import { in3ToCm3, cm3ToIn3, in3ToFt3 } from "@/utils/conversions";
import { formatNumber, parseNumber } from "@/lib/utils";

export default function Calculator() {
  const { t, i18n } = useTranslation();

  // pick default by locale: English = inches, everywhere else = centimetres
  const localeDefault: "in" | "cm" = /^en\b/i.test(i18n.language) ? "in" : "cm";
  const [selectedUnits, setSelectedUnits] = useState<"in" | "cm">(
    localeDefault
  );
  const [consistency, setConsistency] = useState<number>(70);
  const [shapeVolume, setShapeVolume] = useState<number>(0);
  const [manualVolume, setManualVolume] = useState<string>("");
  const [consistencyError, setConsistencyError] = useState<string | null>(null);

  // when the user changes language at runtime, update the unit radio
  useEffect(() => {
    setSelectedUnits(/^en\b/i.test(i18n.language) ? "in" : "cm");
  }, [i18n.language]);

  const volume =
    manualVolume.trim() !== "" ? parseNumber(manualVolume) : shapeVolume;

  const handleConsistencyChange = (value: number) => {
    setConsistency(value);
    validateConsistency(value);
  };

  const validateConsistency = (value: number) => {
    if (value <= 0) {
      setConsistencyError(
        t("Calculator.consistencyError") ||
          "Consistency must be greater than zero"
      );
    } else {
      setConsistencyError(null);
    }
  };

  const echo = (() => {
    if (!volume || Number.isNaN(volume)) return null;
    const in3 = selectedUnits === "in" ? volume : cm3ToIn3(volume);
    const cm3 = selectedUnits === "cm" ? volume : in3ToCm3(volume);
    const ft3 = in3ToFt3(in3);
    return selectedUnits === "in"
      ? `${formatNumber(cm3)} cm³, ${formatNumber(ft3, 5)} ft³`
      : `${formatNumber(in3)} in³, ${formatNumber(ft3, 5)} ft³`;
  })();

  return (
    <div className="flex flex-col gap-y-4 items-center">
      <VolumeCalculator
        selectedUnits={selectedUnits}
        onVolumeChange={(v) => {
          setShapeVolume(v);
          setManualVolume(v !== null ? Number(v).toFixed(2) : "");
        }}
      />

      <div className="flex flex-col items-center gap-y-2 w-full">
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
          value={selectedUnits}
          onValueChange={(value) => setSelectedUnits(value as "in" | "cm")}
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

      <ConsistencyCombobox
        value={consistency}
        onChange={handleConsistencyChange}
      />

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
            min="1"
            step="any"
            value={consistency.toString()}
            onChange={(e) => handleConsistencyChange(Number(e.target.value))}
            aria-invalid={!!consistencyError}
          />
        </div>
        {consistencyError && (
          <p className="text-sm text-destructive mt-1" role="alert">
            {consistencyError}
          </p>
        )}
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

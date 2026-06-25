import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatNumber, parseNumber } from "@/lib/utils";
import { tubeVolume } from "@/utils/volume";
import { allPresent, positiveOnly, innerLessThanOuter } from "@/lib/validation";

interface TubeInputProps {
  selectedUnits: string;
  onVolumeChange: (volume: number | null) => void;
}

export function TubeInputs({ selectedUnits, onVolumeChange }: TubeInputProps) {
  const { t } = useTranslation();
  const [dimensions, setDimensions] = useState<{
    outerDiameter: string;
    innerDiameter: string;
    height: string;
  }>({ outerDiameter: "", innerDiameter: "", height: "" });
  const [volume, setVolume] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleDimensionChange(
    dimension: "outerDiameter" | "innerDiameter" | "height",
    value: string
  ) {
    const newDimensions = { ...dimensions, [dimension]: value };
    setDimensions(newDimensions);
    setError(null);

    if (!allPresent(newDimensions)) {
      onVolumeChange(0);
      setVolume(0);
      return;
    }

    let msg = positiveOnly(newDimensions);
    if (msg) {
      setError(t(msg));
      onVolumeChange(0);
      setVolume(0);
      return;
    }

    msg = innerLessThanOuter(
      newDimensions.outerDiameter,
      newDimensions.innerDiameter
    );
    if (msg) {
      setError(t(msg));
      onVolumeChange(0);
      setVolume(0);
      return;
    }

    const outerDiameter = parseNumber(newDimensions.outerDiameter);
    const innerDiameter = parseNumber(newDimensions.innerDiameter);
    const height = parseNumber(newDimensions.height);

    const calculatedVolume = tubeVolume(outerDiameter, innerDiameter, height);
    setVolume(calculatedVolume);
    onVolumeChange(calculatedVolume);
  }

  return (
    <>
      <form
        className="flex flex-col items-center gap-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex items-center gap-2 w-full">
          <Label
            htmlFor="outerDiameter"
            className="grow text-sm font-medium leading-none"
          >
            {t("VolumeCalculator.outerDiameter")} (d₁)
          </Label>
          <Input
            className="max-w-24"
            id="outerDiameter"
            autoFocus
            type="text"
            inputMode="decimal"
            value={dimensions.outerDiameter ?? ""}
            onChange={(e) =>
              handleDimensionChange("outerDiameter", e.target.value)
            }
            aria-label={`Outer diameter in ${selectedUnits}`}
          />
          <span className="text-sm text-muted-foreground">{selectedUnits}</span>
        </div>

        <div className="flex items-center gap-2 w-full">
          <Label
            htmlFor="innerDiameter"
            className="grow text-sm font-medium leading-none"
          >
            {t("VolumeCalculator.innerDiameter")} (d₂)
          </Label>
          <Input
            className="max-w-24"
            id="innerDiameter"
            type="text"
            inputMode="decimal"
            value={dimensions.innerDiameter ?? ""}
            onChange={(e) =>
              handleDimensionChange("innerDiameter", e.target.value)
            }
            aria-label={`Inner diameter in ${selectedUnits}`}
          />
          <span className="text-sm text-muted-foreground">{selectedUnits}</span>
        </div>

        <div className="flex items-center gap-2 w-full">
          <Label
            htmlFor="height"
            className="grow text-sm font-medium leading-none"
          >
            {t("VolumeCalculator.height")} (h)
          </Label>
          <Input
            className="max-w-24"
            id="height"
            type="text"
            inputMode="decimal"
            value={dimensions.height ?? ""}
            onChange={(e) => handleDimensionChange("height", e.target.value)}
            aria-label={`Height in ${selectedUnits}`}
          />
          <span className="text-sm text-muted-foreground">{selectedUnits}</span>
        </div>
      </form>
      {error && (
        <p className="w-full text-sm text-destructive text-center" role="alert">
          {error}
        </p>
      )}
      {!error && volume !== null && volume > 0 && (
        <div
          className="w-full text-xs text-muted-foreground text-center"
          role="status"
          aria-live="polite"
          aria-label={`Volume equals pi times height times the difference of outer radius squared minus inner radius squared. With values: pi times ${dimensions.height} times ((${dimensions.outerDiameter}/2) squared minus (${dimensions.innerDiameter}/2) squared), which equals ${formatNumber(volume)}`}
        >
          {t("VolumeCalculator.volume")} ={" "}
          <span aria-hidden="true">
            πh((D₁/2)² – (D₂/2)²) = π×{dimensions.height}×((
            {dimensions.outerDiameter}/2)² – ({dimensions.innerDiameter}/2)²)
          </span>{" "}
          = <strong>{formatNumber(volume)}</strong>
        </div>
      )}
    </>
  );
}

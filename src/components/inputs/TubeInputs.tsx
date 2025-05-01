import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatNumber } from "@/lib/utils";
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

    const outerDiameter = Number(newDimensions.outerDiameter);
    const innerDiameter = Number(newDimensions.innerDiameter);
    const height = Number(newDimensions.height);

    const calculatedVolume = tubeVolume(outerDiameter, innerDiameter, height);
    setVolume(calculatedVolume);
    onVolumeChange(calculatedVolume);
  }

  return (
    <form
      className="flex flex-col space-y-2"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex items-center gap-4 w-full">
        <Label
          htmlFor="outerDiameter"
          className="grow min-w-20 text-sm font-medium leading-none"
        >
          {t("VolumeCalculator.outerDiameter")} (d₁)
        </Label>
        <Input
          className="max-w-24"
          id="outerDiameter"
          type="number"
          value={dimensions.outerDiameter ?? ""}
          onChange={(e) =>
            handleDimensionChange("outerDiameter", e.target.value)
          }
          min="0"
          step="any"
          aria-label={`Outer diameter in ${selectedUnits}`}
        />
        <span className="min-w-12 text-sm text-muted-foreground">
          {selectedUnits}
        </span>
      </div>

      <div className="flex items-center gap-4 w-full">
        <Label
          htmlFor="innerDiameter"
          className="grow min-w-20 text-sm font-medium leading-none"
        >
          {t("VolumeCalculator.innerDiameter")} (d₂)
        </Label>
        <Input
          className="max-w-24"
          id="innerDiameter"
          type="number"
          value={dimensions.innerDiameter ?? ""}
          onChange={(e) =>
            handleDimensionChange("innerDiameter", e.target.value)
          }
          min="0"
          step="any"
          aria-label={`Inner diameter in ${selectedUnits}`}
        />
        <span className="min-w-12 text-sm text-muted-foreground">
          {selectedUnits}
        </span>
      </div>

      <div className="flex items-center gap-4 w-full">
        <Label
          htmlFor="height"
          className="grow min-w-20 text-sm font-medium leading-none"
        >
          {t("VolumeCalculator.height")} (h)
        </Label>
        <Input
          className="max-w-24"
          id="height"
          type="number"
          value={dimensions.height ?? ""}
          onChange={(e) => handleDimensionChange("height", e.target.value)}
          min="0"
          step="any"
          aria-label={`Height in ${selectedUnits}`}
        />
        <span className="min-w-12 text-sm text-muted-foreground">
          {selectedUnits}
        </span>
      </div>

      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      {!error && volume !== null && volume > 0 && (
        <p
          className="py-4"
          role="status"
          aria-live="polite"
          aria-label={`Volume equals pi times height times the difference of outer radius squared minus inner radius squared. With values: pi times ${dimensions.height} times ((${dimensions.outerDiameter}/2) squared minus (${dimensions.innerDiameter}/2) squared), which equals ${formatNumber(volume)}`}
        >
          Volume ={" "}
          <span aria-hidden="true">
            πh((D₁/2)² – (D₂/2)²) = π×{dimensions.height}×((
            {dimensions.outerDiameter}/2)² – ({dimensions.innerDiameter}/2)²)
          </span>{" "}
          = <strong>{formatNumber(volume)}</strong>
        </p>
      )}
    </form>
  );
}

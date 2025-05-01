import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function calculateTubeVolume(
  outerDiameter: number,
  innerDiameter: number,
  height: number
): number {
  const outerRadius = outerDiameter / 2;
  const innerRadius = innerDiameter / 2;
  return (
    Math.PI * height * (Math.pow(outerRadius, 2) - Math.pow(innerRadius, 2))
  );
}

interface TubeInputProps {
  selectedUnits: string;
  onVolumeChange: (volume: number | null) => void;
  precision?: number;
}

export function TubeInputs({
  selectedUnits,
  onVolumeChange,
  precision = 2,
}: TubeInputProps) {
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

    const outerDiameter = Number(newDimensions.outerDiameter);
    const innerDiameter = Number(newDimensions.innerDiameter);
    const height = Number(newDimensions.height);

    if (
      !newDimensions.outerDiameter ||
      !newDimensions.innerDiameter ||
      !newDimensions.height
    ) {
      onVolumeChange(0);
      setVolume(0);
      return;
    }

    if (outerDiameter <= 0 || innerDiameter <= 0 || height <= 0) {
      setError("Dimensions must be greater than 0");
      onVolumeChange(0);
      setVolume(0);
      return;
    }

    if (innerDiameter >= outerDiameter) {
      setError("Inner diameter must be smaller than outer diameter");
      onVolumeChange(0);
      setVolume(0);
      return;
    }

    const calculatedVolume = calculateTubeVolume(
      outerDiameter,
      innerDiameter,
      height
    );
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
          aria-label={`Volume equals pi times height times the difference of outer radius squared minus inner radius squared. With values: pi times ${dimensions.height} times ((${dimensions.outerDiameter}/2) squared minus (${dimensions.innerDiameter}/2) squared), which equals ${volume.toFixed(precision)}`}
        >
          Volume ={" "}
          <span aria-hidden="true">
            πh((D₁/2)² – (D₂/2)²) = π×{dimensions.height}×((
            {dimensions.outerDiameter}/2)² – ({dimensions.innerDiameter}/2)²)
          </span>{" "}
          = <strong>{volume.toFixed(precision)}</strong>
        </p>
      )}
    </form>
  );
}

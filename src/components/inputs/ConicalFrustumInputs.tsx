import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatNumber } from "@/lib/utils";

function calculateFrustumVolume(
  radius1: number,
  radius2: number,
  height: number
): number {
  return (
    (1 / 3) *
    Math.PI *
    height *
    (Math.pow(radius1, 2) + radius1 * radius2 + Math.pow(radius2, 2))
  );
}

interface ConicalFrustumInputProps {
  selectedUnits: string;
  onVolumeChange: (volume: number | null) => void;
}

export function ConicalFrustumInputs({
  selectedUnits,
  onVolumeChange,
}: ConicalFrustumInputProps) {
  const { t } = useTranslation();
  const [dimensions, setDimensions] = useState<{
    radius1: string;
    radius2: string;
    height: string;
  }>({ radius1: "", radius2: "", height: "" });
  const [volume, setVolume] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleDimensionChange(
    dimension: "radius1" | "radius2" | "height",
    value: string
  ) {
    const newDimensions = { ...dimensions, [dimension]: value };
    setDimensions(newDimensions);
    setError(null);

    const radius1 = Number(newDimensions.radius1);
    const radius2 = Number(newDimensions.radius2);
    const height = Number(newDimensions.height);

    if (
      !newDimensions.radius1 ||
      !newDimensions.radius2 ||
      !newDimensions.height
    ) {
      onVolumeChange(0);
      setVolume(0);
      return;
    }

    if (radius1 <= 0 || radius2 <= 0 || height <= 0) {
      setError("Dimensions must be greater than 0");
      onVolumeChange(0);
      setVolume(0);
      return;
    }

    const calculatedVolume = calculateFrustumVolume(radius1, radius2, height);
    setVolume(calculatedVolume);
    onVolumeChange(calculatedVolume);
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
      <div className="flex items-center gap-4 w-full">
        <Label
          htmlFor="radius1"
          className="grow min-w-20 text-sm font-medium leading-none"
        >
          {t("VolumeCalculator.radius1")} (r₁)
        </Label>
        <Input
          className="max-w-24"
          id="radius1"
          type="number"
          value={dimensions.radius1 ?? ""}
          onChange={(e) => handleDimensionChange("radius1", e.target.value)}
          min="0"
          step="any"
          aria-label={`Radius 1 in ${selectedUnits}`}
        />
        <span className="min-w-12 text-sm text-muted-foreground">
          {selectedUnits}
        </span>
      </div>

      <div className="flex items-center gap-4 w-full">
        <Label
          htmlFor="radius2"
          className="grow min-w-20 text-sm font-medium leading-none"
        >
          {t("VolumeCalculator.radius2")} (r₂)
        </Label>
        <Input
          className="max-w-24"
          id="radius2"
          type="number"
          value={dimensions.radius2 ?? ""}
          onChange={(e) => handleDimensionChange("radius2", e.target.value)}
          min="0"
          step="any"
          aria-label={`Radius 2 in ${selectedUnits}`}
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
          aria-label={`Volume equals one-third pi times height times the sum of radius 1 squared plus radius 1 times radius 2 plus radius 2 squared. With values: one-third pi times ${dimensions.height} times (${dimensions.radius1} squared plus ${dimensions.radius1} times ${dimensions.radius2} plus ${dimensions.radius2} squared), which equals ${formatNumber(volume)}`}
        >
          Volume ={" "}
          <span aria-hidden="true">
            ⅓πh(r₁² + r₁r₂ + r₂²) = ⅓π×{dimensions.height}×({dimensions.radius1}
            ² + {dimensions.radius1}×{dimensions.radius2} + {dimensions.radius2}
            ²)
          </span>{" "}
          = <strong>{formatNumber(volume)}</strong>
        </p>
      )}
    </form>
  );
}

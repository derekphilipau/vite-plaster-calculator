import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatNumber } from "@/lib/utils";

function calculateConeVolume(radius: number, height: number): number {
  return (1 / 3) * Math.PI * Math.pow(radius, 2) * height;
}

interface ConeInputProps {
  selectedUnits: string;
  onVolumeChange: (volume: number | null) => void;
}

export function ConeInputs({ selectedUnits, onVolumeChange }: ConeInputProps) {
  const { t } = useTranslation();
  const [dimensions, setDimensions] = useState<{
    radius: string;
    height: string;
  }>({ radius: "", height: "" });
  const [volume, setVolume] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleDimensionChange(
    dimension: "radius" | "height",
    value: string
  ) {
    const newDimensions = { ...dimensions, [dimension]: value };
    setDimensions(newDimensions);
    setError(null);

    const radius = Number(newDimensions.radius);
    const height = Number(newDimensions.height);

    if (!newDimensions.radius || !newDimensions.height) {
      onVolumeChange(0);
      setVolume(0);
      return;
    }

    if (radius <= 0 || height <= 0) {
      setError("Dimensions must be greater than 0");
      onVolumeChange(0);
      setVolume(0);
      return;
    }

    const calculatedVolume = calculateConeVolume(radius, height);
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
          htmlFor="radius"
          className="grow min-w-20 text-sm font-medium leading-none"
        >
          {t("VolumeCalculator.radius")} (r)
        </Label>
        <Input
          className="max-w-24"
          id="radius"
          type="number"
          value={dimensions.radius}
          onChange={(e) => handleDimensionChange("radius", e.target.value)}
          min="0"
          step="any"
          aria-label={`Radius in ${selectedUnits}`}
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
          value={dimensions.height}
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
          aria-label={`Volume equals one third pi times radius squared times height. With values: one third pi times ${dimensions.radius} squared times ${dimensions.height}, which equals ${formatNumber(volume)}`}
        >
          Volume ={" "}
          <span aria-hidden="true">
            ⅓πr²h = ⅓π×{dimensions.radius}²×{dimensions.height}
          </span>{" "}
          = <strong>{formatNumber(volume)}</strong>
        </p>
      )}
    </form>
  );
}

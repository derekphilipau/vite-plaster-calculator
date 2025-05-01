import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function calculateSphereVolume(radius: number): number {
  return (4 / 3) * Math.PI * Math.pow(radius, 3);
}

interface SphereInputProps {
  selectedUnits: string;
  onVolumeChange: (volume: number | null) => void;
  precision?: number;
}

export function SphereInputs({
  selectedUnits,
  onVolumeChange,
  precision = 2,
}: SphereInputProps) {
  const { t } = useTranslation();
  const [dimensions, setDimensions] = useState<{ radius: string }>({
    radius: "",
  });
  const [volume, setVolume] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleDimensionChange(value: string) {
    setDimensions({ radius: value });
    setError(null);

    if (!value) {
      onVolumeChange(null);
      setVolume(null);
      return;
    }

    const radius = Number(value);
    if (radius <= 0) {
      setError("Radius must be greater than 0");
      onVolumeChange(null);
      setVolume(null);
      return;
    }

    const calculatedVolume = calculateSphereVolume(radius);
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
          onChange={(e) => handleDimensionChange(e.target.value)}
          min="0"
          step="any"
          aria-label={`Radius in ${selectedUnits}`}
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
          aria-label={`Volume equals four thirds pi times radius cubed. With value: four thirds pi times ${dimensions.radius} cubed, which equals ${volume.toFixed(precision)}`}
        >
          Volume ={" "}
          <span aria-hidden="true">⁴⁄₃πr³ = ⁴⁄₃π×{dimensions.radius}³</span> ={" "}
          <strong>{volume.toFixed(precision)}</strong>
        </p>
      )}
    </form>
  );
}

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatNumber } from "@/lib/utils";

function calculateCubeVolume(sideLength: number): number {
  return Math.pow(sideLength, 3);
}

interface CubeInputProps {
  selectedUnits: string;
  onVolumeChange: (volume: number | null) => void;
}

export function CubeInputs({ selectedUnits, onVolumeChange }: CubeInputProps) {
  const { t } = useTranslation();
  const [dimensions, setDimensions] = useState<{ sideLength: string }>({
    sideLength: "",
  });
  const [volume, setVolume] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleDimensionChange(value: string) {
    setDimensions({ sideLength: value });
    setError(null);

    if (!value) {
      onVolumeChange(0);
      setVolume(0);
      return;
    }

    const sideLength = Number(value);
    if (sideLength <= 0) {
      setError("Side length must be greater than 0");
      onVolumeChange(0);
      setVolume(0);
      return;
    }

    const calculatedVolume = calculateCubeVolume(sideLength);
    setVolume(calculatedVolume);
    onVolumeChange(calculatedVolume);
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
      <div className="flex items-center gap-4 w-full">
        <Label
          htmlFor="sideLength"
          className="grow min-w-20 text-sm font-medium leading-none"
        >
          {t("VolumeCalculator.sideLength")} (a)
        </Label>
        <Input
          className="max-w-24"
          id="sideLength"
          type="number"
          value={dimensions.sideLength}
          onChange={(e) => handleDimensionChange(e.target.value)}
          min="0"
          step="any"
          aria-label={`Side length in ${selectedUnits}`}
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
          aria-label={`Volume equals the side length cubed. With value: ${dimensions.sideLength} cubed, which equals ${formatNumber(volume)}`}
        >
          Volume = <span aria-hidden="true">a³ = {dimensions.sideLength}³</span>{" "}
          = <strong>{formatNumber(volume)}</strong>
        </p>
      )}
    </form>
  );
}

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatNumber } from "@/lib/utils";
import { cubeVolume } from "@/utils/volume";
import { allPresent, positiveOnly } from "@/lib/validation";

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
    const newDimensions = { sideLength: value };
    setDimensions(newDimensions);
    setError(null);

    if (!allPresent(newDimensions)) {
      onVolumeChange(0);
      setVolume(0);
      return;
    }

    const msg = positiveOnly(newDimensions);
    if (msg) {
      setError(t(msg));
      onVolumeChange(0);
      setVolume(0);
      return;
    }

    const sideLength = Number(value);
    const calculatedVolume = cubeVolume(sideLength);
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
            htmlFor="sideLength"
            className="grow text-sm font-medium leading-none"
          >
            {t("VolumeCalculator.sideLength")} (a)
          </Label>
          <Input
            className="max-w-24"
            id="sideLength"
            autoFocus
            type="number"
            value={dimensions.sideLength}
            onChange={(e) => handleDimensionChange(e.target.value)}
            min="0"
            step="any"
            aria-label={`Side length in ${selectedUnits}`}
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
          aria-label={`Volume equals the side length cubed. With value: ${dimensions.sideLength} cubed, which equals ${formatNumber(volume)}`}
        >
          {t("VolumeCalculator.volume")} ={" "}
          <span aria-hidden="true">a³ = {dimensions.sideLength}³</span> ={" "}
          <strong>{formatNumber(volume)}</strong>
        </div>
      )}
    </>
  );
}

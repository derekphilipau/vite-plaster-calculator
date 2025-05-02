import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatNumber } from "@/lib/utils";
import { sphereVolume } from "@/utils/volume";
import { allPresent, positiveOnly } from "@/lib/validation";

interface SphereInputProps {
  selectedUnits: string;
  onVolumeChange: (volume: number | null) => void;
}

export function SphereInputs({
  selectedUnits,
  onVolumeChange,
}: SphereInputProps) {
  const { t } = useTranslation();
  const [dimensions, setDimensions] = useState<{ radius: string }>({
    radius: "",
  });
  const [volume, setVolume] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleDimensionChange(value: string) {
    const newDimensions = { radius: value };
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

    const radius = Number(newDimensions.radius);
    const calculatedVolume = sphereVolume(radius);
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
            htmlFor="radius"
            className="grow text-sm font-medium leading-none"
          >
            {t("VolumeCalculator.radius")} (r)
          </Label>
          <Input
            className="max-w-24"
            id="radius"
            autoFocus
            type="number"
            value={dimensions.radius}
            onChange={(e) => handleDimensionChange(e.target.value)}
            min="0"
            step="any"
            aria-label={`Radius in ${selectedUnits}`}
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
          aria-label={`Volume equals four thirds pi times radius cubed. With value: four thirds pi times ${dimensions.radius} cubed, which equals ${formatNumber(volume)}`}
        >
          {t("VolumeCalculator.volume")} ={" "}
          <span aria-hidden="true">⁴⁄₃πr³ = ⁴⁄₃π×{dimensions.radius}³</span> ={" "}
          <strong>{formatNumber(volume)}</strong>
        </div>
      )}
    </>
  );
}

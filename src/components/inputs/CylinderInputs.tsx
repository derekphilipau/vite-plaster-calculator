import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatNumber } from "@/lib/utils";
import { allPresent, positiveOnly } from "@/lib/validation";
import { cylinderVolume } from "@/utils/volume";

interface CylinderInputProps {
  selectedUnits: string;
  onVolumeChange: (volume: number | null) => void;
}

export function CylinderInputs({
  selectedUnits,
  onVolumeChange,
}: CylinderInputProps) {
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
    const height = Number(newDimensions.height);
    const calculatedVolume = cylinderVolume(radius, height);
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
            value={dimensions.radius ?? ""}
            onChange={(e) => handleDimensionChange("radius", e.target.value)}
            min="0"
            step="any"
            aria-label={`Radius in ${selectedUnits}`}
          />
          <span className="text-muted-foreground text-sm">{selectedUnits}</span>
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
            type="number"
            value={dimensions.height ?? ""}
            onChange={(e) => handleDimensionChange("height", e.target.value)}
            min="0"
            step="any"
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
          aria-label={`Volume equals pi times radius squared times height. With values: pi times ${dimensions.radius} squared times ${dimensions.height}, which equals ${formatNumber(volume)}`}
        >
          {t("VolumeCalculator.volume")} ={" "}
          <span aria-hidden="true">
            πr²h = π×{dimensions.radius}²×{dimensions.height}
          </span>{" "}
          = <strong>{formatNumber(volume)}</strong>
        </div>
      )}
    </>
  );
}

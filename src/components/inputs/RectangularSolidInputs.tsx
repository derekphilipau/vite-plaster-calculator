import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatNumber } from "@/lib/utils";
import { rectangularSolidVolume } from "@/utils/volume";
import { allPresent, positiveOnly } from "@/lib/validation";

interface RectangularSolidInputProps {
  selectedUnits: string;
  onVolumeChange: (volume: number | null) => void;
}

export function RectangularSolidInputs({
  selectedUnits,
  onVolumeChange,
}: RectangularSolidInputProps) {
  const { t } = useTranslation();
  const [dimensions, setDimensions] = useState<{
    length: string;
    width: string;
    height: string;
  }>({ length: "", width: "", height: "" });
  const [volume, setVolume] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleDimensionChange(
    dimension: "length" | "width" | "height",
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

    const length = Number(newDimensions.length);
    const width = Number(newDimensions.width);
    const height = Number(newDimensions.height);
    const calculatedVolume = rectangularSolidVolume(length, width, height);
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
          htmlFor="length"
          className="grow min-w-20 text-sm font-medium leading-none"
        >
          {t("VolumeCalculator.length")} (l)
        </Label>
        <Input
          className="max-w-24"
          id="length"
          autoFocus
          type="number"
          value={dimensions.length}
          onChange={(e) => handleDimensionChange("length", e.target.value)}
          min="0"
          step="any"
          aria-label={`Length in ${selectedUnits}`}
        />
        <span className="min-w-12 text-sm text-muted-foreground">
          {selectedUnits}
        </span>
      </div>

      <div className="flex items-center gap-4 w-full">
        <Label
          htmlFor="width"
          className="grow min-w-20 text-sm font-medium leading-none"
        >
          {t("VolumeCalculator.width")} (w)
        </Label>
        <Input
          className="max-w-24"
          id="width"
          type="number"
          value={dimensions.width ?? ""}
          onChange={(e) => handleDimensionChange("width", e.target.value)}
          min="0"
          step="any"
          aria-label={`Width in ${selectedUnits}`}
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
          aria-label={`Volume equals length times width times height. With values: ${dimensions.length} times ${dimensions.width} times ${dimensions.height}, which equals ${formatNumber(volume)}`}
        >
          Volume ={" "}
          <span aria-hidden="true">
            l × w × h = {dimensions.length} × {dimensions.width} ×{" "}
            {dimensions.height}
          </span>{" "}
          = <strong>{formatNumber(volume)}</strong>
        </p>
      )}
    </form>
  );
}

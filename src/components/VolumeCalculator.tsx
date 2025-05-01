import { useState } from "react";
import { CubeShape } from "./shapes/CubeShape";
import { RectangularSolidShape } from "./shapes/RectangularSolidShape";
import { ConeShape } from "./shapes/ConeShape";
import { ConicalFrustumShape } from "./shapes/ConicalFrustumShape";
import { CylinderShape } from "./shapes/CylinderShape";
import { TubeShape } from "./shapes/TubeShape";
import { SphereShape } from "./shapes/SphereShape";
import { Shapes } from "../lib/shapes";
import type { Shape } from "@/lib/types";
import { useTranslation } from "react-i18next";
import { SphereInputs } from "./inputs/SphereInputs";
import { CubeInputs } from "./inputs/CubeInputs";
import { RectangularSolidInputs } from "./inputs/RectangularSolidInputs";
import { ConeInputs } from "./inputs/ConeInputs";
import { CylinderInputs } from "./inputs/CylinderInputs";
import { ConicalFrustumInputs } from "./inputs/ConicalFrustumInputs";
import { TubeInputs } from "./inputs/TubeInputs";
import { cn } from "@/lib/utils";

interface VolumeCalculatorProps {
  selectedUnits?: string;
  onVolumeChange?: (volume: number) => void;
  onUnitsChange?: (units: string) => void;
}

type ShapeComponentType = React.ComponentType<{ className?: string }>;

const SHAPE_COMPONENTS: Record<Shape, ShapeComponentType> = {
  [Shapes.CUBE]: CubeShape,
  [Shapes.RECTANGULAR_SOLID]: RectangularSolidShape,
  [Shapes.CONE]: ConeShape,
  [Shapes.CONICAL_FRUSTUM]: ConicalFrustumShape,
  [Shapes.CYLINDER]: CylinderShape,
  [Shapes.TUBE]: TubeShape,
  [Shapes.SPHERE]: SphereShape,
};

export function VolumeCalculator({
  selectedUnits = "in",
  onVolumeChange,
  onUnitsChange,
}: VolumeCalculatorProps) {
  const { t } = useTranslation();
  const [volume, setVolume] = useState<number | null>(null);
  const [selectedShape, setSelectedShape] = useState<Shape>(
    Shapes.RECTANGULAR_SOLID
  );

  const handleVolumeChange = (newVolume: number | null) => {
    setVolume(newVolume);
    if (newVolume !== null && onVolumeChange) {
      onVolumeChange(newVolume);
    }
  };

  const renderShapeInputs = () => {
    const commonProps = {
      selectedUnits,
      onVolumeChange: handleVolumeChange,
    };

    switch (selectedShape) {
      case Shapes.CONE:
        return <ConeInputs {...commonProps} />;
      case Shapes.CONICAL_FRUSTUM:
        return <ConicalFrustumInputs {...commonProps} />;
      case Shapes.CUBE:
        return <CubeInputs {...commonProps} />;
      case Shapes.CYLINDER:
        return <CylinderInputs {...commonProps} />;
      case Shapes.RECTANGULAR_SOLID:
        return <RectangularSolidInputs {...commonProps} />;
      case Shapes.SPHERE:
        return <SphereInputs {...commonProps} />;
      case Shapes.TUBE:
        return <TubeInputs {...commonProps} />;
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center w-full">
      <div className="flex flex-wrap justify-center gap-2 w-full">
        {Object.entries(Shapes).map(([key, shape]) => {
          const ShapeComponent = SHAPE_COMPONENTS[shape];
          return (
            <button
              key={shape}
              onClick={() => setSelectedShape(shape)}
              type="button"
              className="size-16 md:size-20 p-1 bg-transparent border-none outline-none cursor-pointer"
            >
              <ShapeComponent
                className={cn(
                  "w-full h-full transition-colors",
                  selectedShape === shape
                    ? "text-highlight"
                    : "hover:text-highlight"
                )}
              />
            </button>
          );
        })}
      </div>

      <div className="w-full flex items-center justify-center">
        {(() => {
          const ShapeComponent = SHAPE_COMPONENTS[selectedShape];
          return <ShapeComponent className="h-32" />;
        })()}
      </div>

      <div>
        <h3 className="text-xl">{t(`VolumeCalculator.${selectedShape}`)}</h3>
      </div>

      {renderShapeInputs()}
    </div>
  );
}

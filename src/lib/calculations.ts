import { CalculationResult, Dimensions, Shape } from './types';

const PLASTER_RATIO = 1.4; // parts plaster to 1 part water
const PLASTER_DENSITY = 0.0017; // kg per cubic cm

export function calculateVolume(shape: Shape, dimensions: Dimensions): number {
  switch (shape) {
    case 'cube':
      return dimensions.length! * dimensions.width! * dimensions.height!;
    case 'sphere':
      return (4 / 3) * Math.PI * Math.pow(dimensions.radius!, 3);
    // TODO
    default:
      return 0;
  }
}

export function calculateMaterials(volume: number): CalculationResult {
  const totalParts = PLASTER_RATIO + 1; // plaster parts + water parts
  const waterVolume = volume / totalParts;
  const plasterVolume = volume * (PLASTER_RATIO / totalParts);
  const plasterWeight = plasterVolume * PLASTER_DENSITY;

  return {
    volume,
    plasterWeight,
    waterVolume,
  };
}

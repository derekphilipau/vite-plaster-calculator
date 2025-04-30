export type Shape = "cube" | "sphere" | "cylinder" | "cone" | "tube";

export interface Dimensions {
  length?: number;
  width?: number;
  height?: number;
  radius?: number;
  diameter?: number;
}

export interface CalculationResult {
  volume: number;
  plasterWeight: number;
  waterVolume: number;
}

import { Shapes } from "./shapes";
export type Shape = keyof typeof Shapes;

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

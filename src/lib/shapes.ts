export enum Shapes {
  CUBE = "CUBE",
  RECTANGULAR_SOLID = "RECTANGULAR_SOLID",
  CYLINDER = "CYLINDER",
  CONE = "CONE",
  CONICAL_FRUSTUM = "CONICAL_FRUSTUM",
  TUBE = "TUBE",
  SPHERE = "SPHERE",
}

export type Shape = keyof typeof Shapes;

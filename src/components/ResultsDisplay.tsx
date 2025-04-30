// src/components/ResultsDisplay.tsx
import {
  poundsToGrams,
  quartsToGrams,
  keithWater,
  derekPlasterPerCm3,
  usgRatio,
  in3ToCm3,
  cm3ToIn3,
  in3ToFt3,
} from "@/utils/plaster";

interface Props {
  volume: number | null;
  units: "in" | "cm";
  consistency: number;
  precision?: number;
}
export default function ResultsDisplay({
  volume,
  units,
  consistency,
  precision = 2,
}: Props) {
  if (!volume) return null;

  const volIn3 = units === "in" ? volume : cm3ToIn3(volume);
  const volCm3 = units === "cm" ? volume : in3ToCm3(volume);
  const volFt3 = in3ToFt3(volIn3);

  const keithWaterG = keithWater(volIn3);
  const keithPlasterG = keithWaterG * (100 / consistency);

  const usgPlasterLb = usgRatio(consistency) * volFt3;
  const usgWaterLb = (usgPlasterLb * consistency) / 100;

  const andrewWaterQt = volIn3 / 80;
  const andrewPlasterLb = andrewWaterQt * 3;

  const campanaWaterG = volCm3 * 0.6;
  const campanaPlasterG = campanaWaterG * (100 / consistency);

  // Derek Au (tested at 70 consistency)
  const derekPlasterG = volCm3 * derekPlasterPerCm3;
  const derekWaterG = (derekPlasterG * consistency) / 100;

  const fmt = (n: number, p = precision) =>
    n.toLocaleString(undefined, {
      minimumFractionDigits: p,
      maximumFractionDigits: p,
    });

  return (
    <section className="grid gap-6 w-full max-w-xl">
      <Card title="Keith Simpson">
        <Row label="Water">{fmt(keithWaterG, 0)} g</Row>
        <Row label="Plaster">{fmt(keithPlasterG, 0)} g</Row>
      </Card>

      <Card title="USG">
        <Row label="Water">
          {fmt(usgWaterLb)} lb ({fmt(poundsToGrams(usgWaterLb))} g)
        </Row>
        <Row label="Plaster">
          {fmt(usgPlasterLb)} lb ({fmt(poundsToGrams(usgPlasterLb))} g)
        </Row>
      </Card>

      <Card title="Andrew Martin">
        <Row label="Water">
          {fmt(andrewWaterQt)} qt ({fmt(quartsToGrams(andrewWaterQt))} g)
        </Row>
        <Row label="Plaster">
          {fmt(andrewPlasterLb)} lb ({fmt(poundsToGrams(andrewPlasterLb))} g)
        </Row>
      </Card>

      <Card title="Bivins / Campana">
        <Row label="Water">{fmt(campanaWaterG, 0)} g</Row>
        <Row label="Plaster">{fmt(campanaPlasterG, 0)} g</Row>
      </Card>

      <Card title="Derek Au (exp)">
        <Row label="Water">{fmt(derekWaterG, 0)} g</Row>
        <Row label="Plaster">{fmt(derekPlasterG, 0)} g</Row>
      </Card>
    </section>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border shadow-xs p-4 rounded-xl">
      <h3 className="font-semibold text-primary mb-2">{title}</h3>
      {children}
    </div>
  );
}
function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <p className="flex justify-between text-sm">
      <span>{label}</span>
      <span className="font-medium">{children}</span>
    </p>
  );
}

// src/components/ResultsDisplay.tsx
import {
  poundsToGrams,
  quartsToGrams,
  keithWaterGrams,
  derekPlasterGrams,
  usgRatio,
  in3ToCm3,
  cm3ToIn3,
  in3ToFt3,
} from "@/utils/plaster";
import { useTranslation } from "react-i18next";
import { formatNumber } from "@/lib/utils";

interface Props {
  volume: number;
  units: "in" | "cm";
  consistency: number;
}
export default function ResultsDisplay({ volume, units, consistency }: Props) {
  const { t } = useTranslation();
  if (!volume) return null;

  const volIn3 = units === "in" ? volume : cm3ToIn3(volume);
  const volCm3 = units === "cm" ? volume : in3ToCm3(volume);
  const volFt3 = in3ToFt3(volIn3);

  const keithWaterG = keithWaterGrams(volIn3);
  const keithPlasterG = keithWaterG * (100 / consistency);

  const usgPlasterLb = usgRatio(consistency) * volFt3;
  const usgWaterLb = (usgPlasterLb * consistency) / 100;

  const andrewWaterQt = volIn3 / 80;
  const andrewPlasterLb = andrewWaterQt * 3;

  const campanaWaterG = volCm3 * 0.6;
  const campanaPlasterG = campanaWaterG * (100 / consistency);

  // Derek Au (tested at 70 consistency)
  const derekPlasterG = derekPlasterGrams(volCm3);
  const derekWaterG = (derekPlasterG * consistency) / 100;

  return (
    <section className="grid gap-6 w-full">
      <Card title={t("ResultsDisplay.keith")}>
        <Row label={t("ResultsDisplay.water")}>
          {formatNumber(keithWaterG, 0)} g
        </Row>
        <Row label={t("ResultsDisplay.plaster")}>
          {formatNumber(keithPlasterG, 0)} g
        </Row>
      </Card>

      <Card title={t("ResultsDisplay.usg")}>
        <Row label={t("ResultsDisplay.water")}>
          {formatNumber(usgWaterLb)} lb (
          {formatNumber(poundsToGrams(usgWaterLb))} g)
        </Row>
        <Row label={t("ResultsDisplay.plaster")}>
          {formatNumber(usgPlasterLb)} lb (
          {formatNumber(poundsToGrams(usgPlasterLb))} g)
        </Row>
      </Card>

      <Card title={t("ResultsDisplay.andrew")}>
        <Row label={t("ResultsDisplay.water")}>
          {formatNumber(andrewWaterQt)} qt (
          {formatNumber(quartsToGrams(andrewWaterQt))} g)
        </Row>
        <Row label={t("ResultsDisplay.plaster")}>
          {formatNumber(andrewPlasterLb)} lb (
          {formatNumber(poundsToGrams(andrewPlasterLb))} g)
        </Row>
      </Card>

      <Card title={t("ResultsDisplay.bivins")}>
        <Row label={t("ResultsDisplay.water")}>
          {formatNumber(campanaWaterG, 0)} g
        </Row>
        <Row label={t("ResultsDisplay.plaster")}>
          {formatNumber(campanaPlasterG, 0)} g
        </Row>
      </Card>

      <Card title={t("ResultsDisplay.derek")}>
        <Row label={t("ResultsDisplay.water")}>
          {formatNumber(derekWaterG, 0)} g
        </Row>
        <Row label={t("ResultsDisplay.plaster")}>
          {formatNumber(derekPlasterG, 0)} g
        </Row>
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

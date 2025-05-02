// src/components/ResultsDisplay.tsx
import {
  poundsToGrams,
  quartsToGrams,
  in3ToCm3,
  cm3ToIn3,
  in3ToFt3,
} from "@/utils/conversions";
import {
  andrewWaterQuarts,
  andrewPlasterPounds,
  campanaWaterGrams,
  campanaPlasterGrams,
  derekPlasterGrams,
  derekWaterGrams,
  keithWaterGrams,
  keithPlasterGrams,
  usgRatio,
  usgPlasterPounds,
  usgWaterPounds,
} from "@/utils/formula";
import { useTranslation } from "react-i18next";
import { formatNumber } from "@/lib/utils";

interface Props {
  volume: number;
  units: "in" | "cm";
  consistency: number;
  canCalculate: boolean;
}
export default function ResultsDisplay({
  volume,
  units,
  consistency,
  canCalculate,
}: Props) {
  const { t } = useTranslation();
  if (!canCalculate) return null;

  const volIn3 = units === "in" ? volume : cm3ToIn3(volume);
  const volCm3 = units === "cm" ? volume : in3ToCm3(volume);
  const volFt3 = in3ToFt3(volIn3);

  const keithWaterG = keithWaterGrams(volIn3);
  const keithPlasterG = keithPlasterGrams(keithWaterG, consistency);

  const ratio = usgRatio(consistency);
  const usgPlasterLb = usgPlasterPounds(ratio, volFt3);
  const usgWaterLb = usgWaterPounds(usgPlasterLb, consistency);

  const andrewWaterQt = andrewWaterQuarts(volIn3);
  const andrewPlasterLb = andrewPlasterPounds(andrewWaterQt);

  const campanaWaterG = campanaWaterGrams(volCm3);
  const campanaPlasterG = campanaPlasterGrams(campanaWaterG, consistency);

  // Derek Au (tested at 70 consistency)
  const derekPlasterG = derekPlasterGrams(volCm3);
  const derekWaterG = derekWaterGrams(derekPlasterG, consistency);

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
          {formatNumber(poundsToGrams(usgWaterLb), 0)} g)
        </Row>
        <Row label={t("ResultsDisplay.plaster")}>
          {formatNumber(usgPlasterLb)} lb (
          {formatNumber(poundsToGrams(usgPlasterLb), 0)} g)
        </Row>
      </Card>

      <Card title={t("ResultsDisplay.andrew")}>
        <Row label={t("ResultsDisplay.water")}>
          {formatNumber(andrewWaterQt)} qt (
          {formatNumber(quartsToGrams(andrewWaterQt), 0)} g)
        </Row>
        <Row label={t("ResultsDisplay.plaster")}>
          {formatNumber(andrewPlasterLb)} lb (
          {formatNumber(poundsToGrams(andrewPlasterLb), 0)} g)
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
    <div className="border p-4 rounded-md flex flex-col gap-2 items-center">
      <h3 className="font-semibold text-highlight text-center">{title}</h3>
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
    <p className="flex justify-between text-base gap-2">
      <span>{label}</span>
      <span className="font-bold">{children}</span>
    </p>
  );
}

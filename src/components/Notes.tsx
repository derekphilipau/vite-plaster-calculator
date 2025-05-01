import { useTranslation, Trans } from "react-i18next";
import {
  cm3ToIn3,
  in3ToCm3,
  in3ToFt3,
  keithWaterGrams,
  keithPlasterGrams,
  usgRatio as usgRatioCalc,
  usgPlasterPounds,
  usgWaterPounds,
  andrewWaterQuarts,
  andrewPlasterPounds,
  campanaWaterGrams,
  campanaPlasterGrams,
  derekPlasterGrams,
  derekWaterGrams,
  poundsToGrams,
} from "@/utils/plaster";
import { formatNumber } from "@/lib/utils";

interface NotesProps {
  volume: number;
  units: "in" | "cm";
  consistency: number;
}

export default function Notes({
  volume,
  units,
  consistency: selectedConsistency,
}: NotesProps) {
  const { t } = useTranslation();

  const transComponents = {
    strong: <strong />,
    em: <em />,
    br: <br />,
    a: <a />,
    sup: <sup />,
    sub: <sub />,
  };

  // Base Volume Conversions
  const volumeCubicInches =
    volume === null ? 0 : units === "in" ? volume : cm3ToIn3(volume);
  const volumeCubicCentimeters =
    volume === null ? 0 : units === "cm" ? volume : in3ToCm3(volume);
  const volumeCubicFeet = in3ToFt3(volumeCubicInches);

  // Keith Simpson Calculations
  const keithSimpsonGramsOfWater = keithWaterGrams(volumeCubicInches);
  const keithSimpsonGramsOfPlaster = keithPlasterGrams(
    keithSimpsonGramsOfWater,
    selectedConsistency
  );

  // USG Calculations
  const usgRatio = usgRatioCalc(selectedConsistency);
  const usgPoundsOfPlaster = usgPlasterPounds(usgRatio, volumeCubicFeet);
  const usgPoundsOfWater = usgWaterPounds(
    usgPoundsOfPlaster,
    selectedConsistency
  );

  // Andrew Martin Calculations
  const andrewMartinQuartsOfWater = andrewWaterQuarts(volumeCubicInches);
  const andrewMartinPoundsOfPlaster = andrewPlasterPounds(
    andrewMartinQuartsOfWater
  );

  // Bivins/Campana Calculations
  const campanaGramsOfWater = campanaWaterGrams(volumeCubicCentimeters);
  const campanaGramsOfPlaster = campanaPlasterGrams(
    campanaGramsOfWater,
    selectedConsistency
  );

  // Derek Au Calculations
  const derekGramsOfPlaster = derekPlasterGrams(volumeCubicCentimeters);
  const derekGramsOfWater = derekWaterGrams(
    derekGramsOfPlaster,
    selectedConsistency
  );

  return (
    <section className="prose">
      <div>
        <h2>{t("Notes.title")}</h2>

        <p>{t("Notes.intro")}</p>

        <Trans i18nKey="Notes.consistencyNotes" components={transComponents} />

        <p>{t("Notes.disclaimer")}</p>

        <h3>
          <a href="https://www.simpsonstudio.us/about">Keith Simpson</a>
        </h3>
        <p>
          <Trans i18nKey="Notes.keithFormula" components={transComponents} />
        </p>
        {volume > 0 && (
          <p>
            {formatNumber(volumeCubicInches)} in<sup>3</sup> × 11 ={" "}
            <strong>{formatNumber(keithSimpsonGramsOfWater, 0)}</strong> g{" "}
            {t("Notes.water")}
            <br />
            {formatNumber(keithSimpsonGramsOfWater, 0)} g {t("Notes.water")} ×
            (100 / {selectedConsistency}) ={" "}
            <strong>{formatNumber(keithSimpsonGramsOfPlaster, 0)}</strong> g{" "}
            {t("Notes.plaster")}
          </p>
        )}
        <Trans i18nKey="Notes.keithDisclaimer" components={transComponents} />

        <h3>
          <a href="https://www.usg.com/">USG</a>
        </h3>
        <p>
          <a href="https://www.usg.com/content/dam/USG_Marketing_Communications/united_states/product_promotional_materials/finished_assets/gypsum-cement-plaster-volume-mix-guide.xlsx">
            {t("Notes.usgDownload")}
          </a>
          <br />
          {t("Notes.usgExplain")}
          <br />
          <em>{t("Notes.ratio")}</em> = (-0.00004 ×{" "}
          <strong>
            <em>{t("Notes.consistency")}</em>
          </strong>
          <sup>3</sup>) + (0.0154 ×{" "}
          <strong>
            <em>{t("Notes.consistency")}</em>
          </strong>
          <sup>2</sup>) - (2.23 ×{" "}
          <strong>
            <em>{t("Notes.consistency")}</em>
          </strong>
          ) + 164.25
          <br />
          <em>{t("Notes.ratio")}</em> × <em>{t("Notes.cubicFeet")}</em> ={" "}
          <em>{t("Notes.poundsOfPlaster")}</em>
          <br />
          <em>{t("Notes.poundsOfPlaster")}</em> ×{" "}
          <em>{t("Notes.consistency")}</em> / 100 ={" "}
          <em>{t("Notes.poundsOfWater")}</em>
        </p>
        {volume > 0 && (
          <p>
            {t("Notes.ratio")} = (-0.00004 ×{" "}
            <strong>
              <em>{selectedConsistency}</em>
            </strong>
            <sup>3</sup>) + (0.0154 ×{" "}
            <strong>
              <em>{selectedConsistency}</em>
            </strong>
            <sup>2</sup>) - (2.23 ×{" "}
            <strong>
              <em>{selectedConsistency}</em>
            </strong>
            ) + 164.25 ={" "}
            <strong>
              <em>{formatNumber(usgRatio)}</em>
            </strong>
            <br />
            {formatNumber(usgRatio)} × {formatNumber(volumeCubicFeet, 5)} ft
            <sup>3</sup> = <strong>{formatNumber(usgPoundsOfPlaster)}</strong>{" "}
            lbs. plaster
            <br />
            <strong>{formatNumber(usgPoundsOfPlaster)}</strong>{" "}
            {t("Notes.poundsOfPlaster")} × ({selectedConsistency} / 100) ={" "}
            <strong>{formatNumber(usgPoundsOfWater)}</strong>{" "}
            {t("Notes.poundsOfWater")}
          </p>
        )}

        <h3>Andrew Martin</h3>
        <p>
          <Trans i18nKey="Notes.andrewFormula" components={transComponents} />
        </p>
        {volume > 0 && (
          <p>
            {formatNumber(volumeCubicInches)} in<sup>3</sup> / 80 ={" "}
            <strong>{formatNumber(andrewMartinQuartsOfWater)}</strong>{" "}
            {t("Notes.quartsOfWater")}
            <br />
            {formatNumber(andrewMartinQuartsOfWater)} {t("Notes.quartsOfWater")}{" "}
            × 3 = <strong>{formatNumber(andrewMartinPoundsOfPlaster)}</strong>{" "}
            {t("Notes.poundsOfPlaster")} (
            {formatNumber(poundsToGrams(andrewMartinPoundsOfPlaster))}g)
          </p>
        )}

        <p>
          <Trans i18nKey="Notes.andrewNotes" components={transComponents} />
        </p>

        <h3>
          <a href="https://nicholasbivins.com/">Nick Bivins</a> &{" "}
          <a href="https://jeffcampana.com/">Jeff Campana</a>
        </h3>
        <p>
          <Trans i18nKey="Notes.campanaFormula" components={transComponents} />
        </p>
        {volume > 0 && (
          <p>
            {formatNumber(volumeCubicCentimeters)} cm<sup>3</sup> × 0.6 ={" "}
            <strong>{formatNumber(campanaGramsOfWater)}</strong> g{" "}
            {t("Notes.water")}
            <br />
            {formatNumber(campanaGramsOfWater)} g {t("Notes.water")} × (100 /{" "}
            {selectedConsistency}) ={" "}
            <strong>{formatNumber(campanaGramsOfPlaster)}</strong> g{" "}
            {t("Notes.plaster")}
          </p>
        )}

        <h3>
          <a href="https://derekau.net">Derek Au:</a>
        </h3>
        <p>
          <em>{t("Notes.derekDisclaimer")}</em>
        </p>
        <p>
          <Trans
            i18nKey="Notes.derekExplanation"
            components={transComponents}
          />
        </p>
        <p>
          <Trans i18nKey="Notes.derekNotes" components={transComponents} />
        </p>
        {volume > 0 && (
          <p>
            <em>{t("Notes.volumeInCm3")}</em> × 15000 / 15860 ={" "}
            <strong>{formatNumber(derekGramsOfPlaster)}</strong>{" "}
            <em>{t("Notes.gramsOfPlaster")}</em>
            <br />
            {formatNumber(derekGramsOfPlaster)} {t("Notes.gramsOfPlaster")} ×{" "}
            {selectedConsistency} / 100 ={" "}
            <strong>{formatNumber(derekGramsOfWater)}</strong>{" "}
            <em>{t("Notes.gramsOfWater")}</em>
          </p>
        )}
      </div>

      <div>
        <h2>{t("Notes.links")}</h2>
        <h3>USG</h3>
        <p>
          <a href="https://www.usg.com/content/dam/USG_Marketing_Communications/united_states/product_promotional_materials/finished_assets/gypsum-cement-plaster-volume-mix-guide.xlsx">
            Calculator
          </a>
          ,{" "}
          <a href="https://plaster.com/product-comparison-chart/">
            Plaster Chart
          </a>
          , <a href="https://plaster.com/videos/">Videos</a>
        </p>
        <p>
          <a href="https://www.usg.com/content/usgcom/en/products/industrial/tool-prototype-casting/hydroperm-metal-casting-plaster.html">
            Hydroperm® Metal Casting Plaster
          </a>
          ,
          <a href="https://www.usg.com/content/usgcom/en/products/industrial/tool-prototype-casting/hydroperm-metal-casting-plaster.html">
            USG Hydroperm®
          </a>
          ,
          <a href="https://www.usg.com/content/usgcom/en/products/industrial/art-statuary/no-1-moulding-plaster.html">
            USG #1 Moulding
          </a>
          ,
          <a href="https://www.usg.com/content/usgcom/en/products/industrial/art-statuary/no-1-casting-plaster.html">
            USG #1 Casting
          </a>
          ,
          <a href="https://www.usg.com/content/usgcom/en/products/industrial/ceramics/no-1-pottery-plaster.html">
            USG #1 Pottery, White Art®
          </a>
          ,
          <a href="https://www.usg.com/content/usgcom/en/products/industrial/ceramics/puritan-pottery-plaster.html">
            USG Puritan® Pottery
          </a>
          ,
          <a href="https://www.usg.com/content/usgcom/en/products/industrial/ceramics/duramold-pottery-plaster.html">
            Duramold™ Pottery
          </a>
          ,
          <a href="https://www.usg.com/content/usgcom/en/products/industrial/art-statuary/tuf-cal-casting-statuary-plaster.html">
            Tuf-Cal™
          </a>
          ,
          <a href="https://www.usg.com/content/dam/USG_Marketing_Communications/united_states/product_promotional_materials/finished_assets/usg-hydrocal-A-11-Gypsum-Cement-Submittal-en-IG1390.pdf">
            USG Hydrocal® A-11
          </a>
          ,
          <a href="https://www.usg.com/content/usgcom/en/products/industrial/tool-prototype-casting/hydrocal-b-11-gypsum-cement.html">
            USG Hydrocal® B-11
          </a>
          ,
          <a href="https://plaster.com/product/usg-ultracal-30/">
            USG Ultracal® 30
          </a>
          ,
          <a href="https://plaster.com/product/usg-drystone/">
            USG Ultimate Drystone™
          </a>
          ,
          <a href="https://plaster.com/product/usg-hydrostone/">
            USG Hydro-Stone®
          </a>
          ,
          <a href="https://plaster.com/product/usg-hydro-stone-super-x/">
            USG Hydro-Stone® Super X
          </a>
        </p>
        <h3>Georgia Pacific Plasters</h3>
        <p>
          <a href="http://gpindustrialplasters.com/pottery-plaster/">
            Plaster Chart
          </a>
        </p>
        <h3>Saint-Gobain Formula Plasters</h3>
        <p>
          <a href="https://www.saintgobainformula.com/product/crystacal-r">
            Crystacal R
          </a>
          ,
          <a href="https://www.saintgobainformula.com/product/keramicast">
            Keramicast
          </a>
          ,
          <a href="https://www.saintgobainformula.com/product/newcast-96">
            Newcast 96
          </a>
          ,
          <a href="https://www.saintgobainformula.com/product/pottery-plaster">
            Pottery Plaster
          </a>
          ,
          <a href="https://www.saintgobainformula.com/product/fine-casting-plaster">
            Fine Casting Plaster
          </a>
          ,
          <a href="https://www.saintgobainformula.com/product/casting-plaster">
            Casting Plaster
          </a>
          ,
          <a href="https://www.saintgobainformula.com/product/molda-3-normal">
            Molda 3 Normal
          </a>
        </p>
      </div>
    </section>
  );
}

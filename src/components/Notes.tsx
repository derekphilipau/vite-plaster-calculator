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

interface NotesProps {
  volume: number;
  units: "in" | "cm";
  consistency: number;
  precision?: number;
}

export default function Notes({
  volume,
  units,
  consistency: selectedConsistency,
  precision = 2,
}: NotesProps) {
  const { t } = useTranslation();

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

  const fmt = (n: number, p = precision) =>
    n.toLocaleString(undefined, {
      minimumFractionDigits: p,
      maximumFractionDigits: p,
    });

  return (
    <section className="prose">
      <div>
        <h2>{t("Notes.title")}</h2>

        <p>{t("Notes.intro")}</p>

        <Trans
          i18nKey="Notes.consistency"
          components={{ strong: <strong />, em: <em /> }}
        />

        <p>{t("Notes.disclaimer")}</p>

        <h3>
          <a href="https://www.simpsonstudio.us/about">Keith Simpson</a>
        </h3>
        <p>
          <em>volume in cubic inches</em> &times; 11 = <em>grams of water</em>
          <br />
          <em>grams of water</em> &times; (100 / consistency) ={" "}
          <em>grams of Pottery Plaster</em>
        </p>
        {volume > 0 && (
          <p>
            {fmt(volumeCubicInches)} in<sup>3</sup> &times; 11 ={" "}
            <strong>{fmt(keithSimpsonGramsOfWater, 0)}</strong> g water
            <br />
            {fmt(keithSimpsonGramsOfWater, 0)} g water &times; (100 /{" "}
            {selectedConsistency}) ={" "}
            <strong>{fmt(keithSimpsonGramsOfPlaster, 0)}</strong> g plaster
          </p>
        )}
        <p>
          Water should be room temperature
          <br />
          Sift plaster through fingers into water
          <br />
          Slake plaster for 3 minutes
          <br />
          Mix for 3 minutes
        </p>

        <h3>
          <a href="https://www.usg.com/">USG</a>
        </h3>
        <p>
          <a href="https://www.usg.com/content/dam/USG_Marketing_Communications/united_states/product_promotional_materials/finished_assets/gypsum-cement-plaster-volume-mix-guide.xlsx">
            Download the USG Excel calculator.
          </a>
          <br />
          The USG calculator first calculates a ratio based on consistency and
          then the amounts of plaster and water:
          <br />
          <em>ratio</em> = (-0.00004 &times;{" "}
          <strong>
            <em>consistency</em>
          </strong>
          <sup>3</sup>) + (0.0154 &times;{" "}
          <strong>
            <em>consistency</em>
          </strong>
          <sup>2</sup>) - (2.23 &times;{" "}
          <strong>
            <em>consistency</em>
          </strong>
          ) + 164.25
          <br />
          <em>ratio</em> &times; <em>cubic feet</em> ={" "}
          <em>pounds of plaster</em>
          <br />
          <em>pounds of plaster</em> &times; <em>consistency</em> / 100 ={" "}
          <em>pounds of water</em>
        </p>
        {volume > 0 && (
          <p>
            ratio = (-0.00004 &times;{" "}
            <strong>
              <em>{selectedConsistency}</em>
            </strong>
            <sup>3</sup>) + (0.0154 &times;{" "}
            <strong>
              <em>{selectedConsistency}</em>
            </strong>
            <sup>2</sup>) - (2.23 &times;{" "}
            <strong>
              <em>{selectedConsistency}</em>
            </strong>
            ) + 164.25 ={" "}
            <strong>
              <em>{Number(usgRatio).toFixed(2)}</em>
            </strong>
            <br />
            {Number(usgRatio).toFixed(2)} &times;{" "}
            {Number(volumeCubicFeet).toFixed(5)} ft<sup>3</sup> ={" "}
            <strong>{fmt(usgPoundsOfPlaster)}</strong> lbs. plaster
            <br />
            <strong>{fmt(usgPoundsOfPlaster)}</strong> lbs. plaster &times; (
            {selectedConsistency} / 100) ={" "}
            <strong>{fmt(usgPoundsOfWater)}</strong> lbs. water
          </p>
        )}

        <h3>Andrew Martin</h3>
        <p>
          <em>volume in cubic inches</em> / 80 = <em>quarts of water</em>
          <br />
          <em>quarts of water</em> &times; 3 = <em>pounds of plaster</em>
        </p>
        {volume > 0 && (
          <p>
            {fmt(volumeCubicInches)} in<sup>3</sup> / 80 ={" "}
            <strong>{fmt(andrewMartinQuartsOfWater)}</strong> qts. water
            <br />
            {fmt(andrewMartinQuartsOfWater)} qts. water &times; 3 ={" "}
            <strong>{fmt(andrewMartinPoundsOfPlaster)}</strong> lbs. plaster (
            {fmt(poundsToGrams(andrewMartinPoundsOfPlaster))}g)
          </p>
        )}
        <p>
          <em>Keith Simpson's notes:</em> Simplified technique by Andrew Martin
          from{" "}
          <a href="https://books.google.com/books/about/The_Essential_Guide_to_Mold_Making_Slip.html?id=X-rtBGDCBb0C">
            "The Essential Guide to Mold Making & Slip Casting"
          </a>
          . This technique creates a slightly thicker plaster as Andrew has
          rounded the required water down to make the calculation simpler and
          allow for the water to be measured by volume.
        </p>

        <h3>
          <a href="https://nicholasbivins.com/">Nick Bivins</a> &{" "}
          <a href="https://jeffcampana.com/">Jeff Campana</a>
        </h3>
        <p>
          <em>volume in cubic centimeters</em> &times; 0.6 ={" "}
          <em>grams of water</em>
          <br />
          <em>grams of water</em> &times; (100 / {selectedConsistency}) ={" "}
          <em>grams of plaster</em>
        </p>
        {volume > 0 && (
          <p>
            {fmt(volumeCubicCentimeters)} cm<sup>3</sup> &times; 0.6 ={" "}
            <strong>{fmt(campanaGramsOfWater)}</strong> g water
            <br />
            {fmt(campanaGramsOfWater)} g water &times; (100 /{" "}
            {selectedConsistency}) ={" "}
            <strong>{fmt(campanaGramsOfPlaster)}</strong> g plaster
          </p>
        )}

        <h3>Derek Au:</h3>
        <p>
          <em>Experimental. Needs more data!</em>
        </p>
        <p>
          This method is based on test batches with known quantities of plaster
          and water and precise measurements of the resulting plaster volume.
          Currently only one test has been performed with Pottery Plaster #1 at
          70 consistency.
        </p>
        <p>
          Notes: With a batch of 15kg fresh Pottery Plaster #1 and 10.5kg water
          (70 consistency), plaster was sifted into water and then soaked for 1
          minute, then mixed with a drill and Jiffy mixer attachment for 5
          minutes, hand-mixed until plaster just began to set, then gently
          poured onto a flat, level surface bordered by coddles forming a
          rectangular space of 45.7cm x 82.63cm, the resulting plaster slab
          measured 45.7cm x 82.63cm x 4.2cm, or{" "}
          <em>
            15860 cm<sup>3</sup>
          </em>
        </p>
        {volume > 0 && (
          <p>
            <em>volume in cubic centimeters</em> &times; 15000 / 15860 ={" "}
            <strong>{fmt(derekGramsOfPlaster)}</strong>{" "}
            <em>grams of plaster</em>
            <br />
            {fmt(derekGramsOfPlaster)} g plaster &times; {selectedConsistency} /
            100 = <strong>{fmt(derekGramsOfWater)}</strong>{" "}
            <em>grams of water</em>
          </p>
        )}
      </div>

      <div>
        <h2>{t("Notes.links")}</h2>
        <p>
          USG:
          <a href="https://plaster.com/product-comparison-chart/">
            Plaster Chart
          </a>
          ,<a href="https://plaster.com/videos/">Videos</a>
        </p>
        <p>
          USG Links:
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
        <p>
          Georgia Pacific Plasters:
          <a href="http://gpindustrialplasters.com/pottery-plaster/">
            Plaster Chart
          </a>
        </p>
        <p>
          Saint-Gobain Formula Plasters:
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

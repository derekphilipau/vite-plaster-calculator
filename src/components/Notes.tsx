import { useTranslation } from "react-i18next";

export default function NotesDialog() {
  const { t } = useTranslation();

  return (
    <section className="pt-10 pb-4">
      <h3>Keith Simpson (recommended for potters)</h3>
      <p>
        <em>volume in cubic inches</em> × 11 = <em>grams of water</em>
        <br />
        <em>grams of water</em> × (100 / <strong>consistency</strong>) ={" "}
        <em>grams of plaster</em>
      </p>

      <h3>USG</h3>
      <p>
        <a href="https://plaster.com/product-comparison-chart/">
          Plaster chart
        </a>{" "}
        &bull;
        <a href="https://www.usg.com/content/dam/USG_Marketing_Communications/united_states/product_promotional_materials/finished_assets/gypsum-cement-plaster-volume-mix-guide.xlsx">
          Excel calculator
        </a>
      </p>
      <pre className="whitespace-pre-wrap text-xs">
        ratio = −0.00004 c³ + 0.0154 c² − 2.23 c + 164.25 ratio × ft³ = pounds
        plaster
        <br />
        plaster × c / 100 = pounds water
      </pre>

      <h3>Andrew Martin</h3>
      <p>
        <em>volume in³</em> / 80 = <em>quarts water</em>
        <br />
        water × 3 = <em>pounds plaster</em>
      </p>

      <h3>Bivins / Campana</h3>
      <p>
        <em>volume cm³</em> × 0.6 = <em>grams water</em>
        <br />
        water × (100 / <strong>consistency</strong>) = <em>grams plaster</em>
      </p>

      <h3>
        Derek Au <small>(experimental, 70 consistency)</small>
      </h3>
      <p>
        15 kg plaster + 10.5 kg water produced a 45.7 × 82.63 × 4.2 cm slab (15
        860 cm³).
      </p>

      <h2>Reference Links</h2>
      <ul>
        <li>
          <a href="https://plaster.com/videos/">USG videos</a>
        </li>
        <li>
          <a href="http://gpindustrialplasters.com/pottery-plaster/">
            Georgia-Pacific plaster chart
          </a>
        </li>
        <li>
          <a href="https://www.saintgobainformula.com/product/crystacal-r">
            Saint-Gobain Formula plasters
          </a>
        </li>
      </ul>
    </section>
  );
}

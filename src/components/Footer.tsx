import { GlazyLogo } from "./GlazyLogo";
import { useTranslation } from "react-i18next";

const LANGS = [
  { code: "de", name: "Deutsch" },
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "it", name: "Italiano" },
  { code: "pt", name: "Português" },
  { code: "nl", name: "Nederlands" },
  { code: "zh", name: "中文" },
];

export default function Footer() {
  const { t, i18n } = useTranslation();
  const current = i18n.language.split("-")[0];

  return (
    <footer className="mt-16 mb-6 flex flex-col items-center gap-2 text-base text-muted-foreground">
      <p className="flex flex-col items-center gap-1">
        <a href="https://glazy.org" aria-label="Glazy">
          <GlazyLogo className="size-24" />
        </a>
        <a href="https://glazy.org">glazy.org</a>
      </p>
      <p>
        &copy;{new Date().getFullYear()}{" "}
        <a href="https://derekau.net">Derek Au</a>
      </p>
      <p>
        {t("Footer.useful")}{" "}
        <a href="https://www.patreon.com/join/derekau">
          {t("Footer.support")}
        </a>
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1">
        {LANGS.map((l) => (
          <button
            key={l.code}
            onClick={() => i18n.changeLanguage(l.code)}
            className={`text-sm hover:underline ${current === l.code ? "font-semibold" : ""}`}
          >
            {l.name}
          </button>
        ))}
      </div>
    </footer>
  );
}

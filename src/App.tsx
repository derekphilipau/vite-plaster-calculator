import Calculator from "@/components/Calculator";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";

export default function App() {
  const { t } = useTranslation();

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start p-6 mx-auto">
      <LocaleSwitcher className="absolute top-4 right-4" />
      <h1 className="mb-6 text-2xl md:text-3xl font-bold tracking-tight text-highlight">
        {t("App.title")}
      </h1>

      <Calculator />

      <Footer />
    </main>
  );
}

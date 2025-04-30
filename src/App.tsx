import Calculator from "@/components/Calculator";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import Footer from "@/components/Footer";

export default function App() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start p-6 mx-auto">
      <LocaleSwitcher className="absolute top-4 right-4" />
      <h1 className="mb-6 text-2xl md:text-3xl font-bold tracking-tight text-highlight">
        Plaster Calculator
      </h1>

      <Calculator />

      <Footer />
    </main>
  );
}

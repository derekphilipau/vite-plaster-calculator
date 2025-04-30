import Calculator from "@/components/Calculator";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import Footer from "@/components/Footer";

export default function App() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start p-6 max-w-lg mx-auto">
      <LocaleSwitcher className="absolute top-4 right-4" />
      <h1 className="mb-6 text-3xl font-bold tracking-tight">
        Plaster Calculator
      </h1>

      <Calculator />

      <Footer />
    </main>
  );
}

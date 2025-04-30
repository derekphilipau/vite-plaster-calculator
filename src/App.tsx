import Calculator from "@/components/Calculator";

export default function App() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-6">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">
        Plaster Calculator
      </h1>

      <Calculator />
    </main>
  );
}

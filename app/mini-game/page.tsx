import dynamic from "next/dynamic";

const PhaserGame = dynamic(() => import("@/components/PhaserGame"), {
  ssr: false,
});

export default function MiniGamePage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">🌱 Plant Trees, Clean the Air!</h1>
      <PhaserGame />
    </main>
  );
}

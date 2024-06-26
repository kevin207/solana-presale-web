import Navbar from "@/components/Navbar";
import About from "@/views/About";
import HeroSection from "@/views/HeroSection";
import TokenEconomics from "@/views/TokenEconomics";

export default function Home() {
  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-start bg-violet-800">
      <Navbar />
      <HeroSection />
      <About />
      <TokenEconomics />
    </main>
  );
}

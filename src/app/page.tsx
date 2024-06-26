import Navbar from "@/components/Navbar";
import About from "@/views/About";
import HeroSection from "@/views/HeroSection";

export default function Home() {
  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-start space-y-10 p-5 bg-violet-800">
      <Navbar />
      <HeroSection />
      <About />
    </main>
  );
}

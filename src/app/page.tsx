import Navbar from "@/components/Navbar";
import About from "@/views/About";
import HeroSection from "@/views/HeroSection";
import MoreAbout from "@/views/MoreAbout";

export default function Home() {
  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-start bg-violet-800">
      <Navbar />
      <HeroSection />
      <div className="flex bg-bg-about w-full items-center justify-center">
        <About />
      </div>
      <div className="flex bg-accent w-full items-center justify-center">
        <MoreAbout />
      </div>
    </main>
  );
}

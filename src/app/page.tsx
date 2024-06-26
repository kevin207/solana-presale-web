import Navbar from "@/components/Navbar";
import About from "@/views/About";

export default function Home() {
  return (
    <main className="flex w-full h-screen flex-col items-center justify-start space-y-10 p-5 bg-blue-500/40">
      <Navbar />
      <About />
    </main>
  );
}

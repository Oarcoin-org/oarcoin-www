import About from "@/components/home/about";
import Hero from "@/components/home/hero";
import Player from "@/components/home/player";
import Products from "@/components/home/products";

export default function Home() {
  return (
    <main>
      <Hero />
      <Player src="/assets/player/home.mp4" />
      <Products />
      <About />
    </main>
  );
}

import About from "@/components/home/about";
import Hero from "@/components/home/hero";
import Player from "@/components/home/player";
import Products from "@/components/home/products";
import JsonLd from "@/components/seo/json-ld";
import { ROUTES } from "@/lib/constants";
import { SITE_DESCRIPTION, SITE_TITLE, webPageSchema } from "@/lib/seo";

export default function Home() {
  return (
    <main>
      <JsonLd
        data={webPageSchema({
          title: SITE_TITLE,
          description: SITE_DESCRIPTION,
          path: ROUTES.home,
        })}
      />
      <Hero />
      <Player src="/assets/player/home.mp4" />
      <Products />
      <About />
    </main>
  );
}

import type { Metadata } from "next"
import Hero from "@/components/hero"

export const metadata = {
  title: "About Me",
};

export const generateViewport = () => ({
  width: "device-width",
  initialScale: 1,
});


export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <Hero />
    </div>
  )
}

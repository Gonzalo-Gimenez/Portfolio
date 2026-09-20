import { PortfolioHud } from "@/components/hud/PortfolioHud";
import { HomeIndex } from "@/components/home/HomeIndex";

export default function Home() {
  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-[var(--bg-base)]">
      <HomeIndex />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-44 bg-[linear-gradient(180deg,rgba(18,20,22,0.72)_0%,transparent_100%)]"
      />
      <PortfolioHud />
    </div>
  );
}

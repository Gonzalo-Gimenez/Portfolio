import { PortfolioHud } from "@/components/hud/PortfolioHud";
import { HomeIndex } from "@/components/home/HomeIndex";

export default function Home() {
  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-[var(--bg-base)]">
      <HomeIndex />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(8,10,12,0.62)_0%,transparent_28%,transparent_62%,rgba(8,10,12,0.72)_100%)]"
      />
      <PortfolioHud />
    </div>
  );
}

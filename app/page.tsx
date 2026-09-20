import { PortfolioHud } from "@/components/hud/PortfolioHud";
import { HomeIndex } from "@/components/home/HomeIndex";

export default function Home() {
  return (
    <div className="relative flex min-h-[100dvh] flex-col lg:flex-row">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[var(--bg-base)]"
      >
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 50% at 70% 20%, color-mix(in oklab, var(--accent) 12%, transparent), transparent)",
          }}
        />
      </div>
      <PortfolioHud />
      <HomeIndex />
    </div>
  );
}

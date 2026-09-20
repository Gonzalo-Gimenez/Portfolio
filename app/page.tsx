import { IdentityBanner } from "@/components/home/IdentityBanner";
import { WorkShowcase } from "@/components/home/WorkShowcase";
import { HomeStory } from "@/components/story/HomeStory";

export default function Home() {
  return (
    <div className="bg-[var(--bg-base)]">
      <IdentityBanner />
      <WorkShowcase />
      <HomeStory />
    </div>
  );
}

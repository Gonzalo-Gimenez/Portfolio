import { CoverflowGallery } from "@/components/gallery/CoverflowGallery";
import { IdentityBanner } from "@/components/home/IdentityBanner";
import { HomeAbout } from "@/components/home/HomeAbout";
import { HomeContact } from "@/components/home/HomeContact";
import { HomeSkills } from "@/components/home/HomeSkills";
import { SiteFooter } from "@/components/layout/SiteFooter";

export default function Home() {
  return (
    <>
      <div id="inicio" className="scroll-mt-16">
        <IdentityBanner />
      </div>
      <CoverflowGallery />
      <HomeAbout />
      <HomeSkills />
      <HomeContact />
      <SiteFooter />
    </>
  );
}

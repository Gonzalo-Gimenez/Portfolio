import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyBody } from "@/components/case-study/CaseStudyBody";
import { PortfolioHud } from "@/components/hud/PortfolioHud";
import { getWork, WORK_SLUGS } from "@/lib/projects";
import { SITE } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return WORK_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) {
    return { title: SITE.name };
  }
  return {
    title: `${work.title} · ${SITE.name}`,
    description: work.tagline,
  };
}

export default async function TrabajoPage({ params }: PageProps) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) notFound();

  return (
    <div className="relative flex min-h-[100dvh] flex-col lg:flex-row">
      <PortfolioHud showBack />
      <CaseStudyBody work={work} />
    </div>
  );
}

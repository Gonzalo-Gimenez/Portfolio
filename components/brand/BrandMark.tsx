import Image from "next/image";

import { SITE } from "@/lib/site";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={`relative inline-flex shrink-0 overflow-hidden ${className ?? "h-8 w-8"}`}
    >
      <Image
        src={SITE.logoPath}
        alt=""
        fill
        sizes="40px"
        className="scale-[1.85] object-contain"
      />
    </span>
  );
}

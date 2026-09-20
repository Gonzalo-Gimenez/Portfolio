"use client";

import Image from "next/image";

type CoverMotion = "zoom" | "rise" | "drift";

export function CoverMedia({
  src,
  alt,
  motion = "zoom",
  sizes = "100vw",
  priority = false,
}: {
  src: string;
  alt: string;
  motion?: CoverMotion;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover will-change-transform transition-transform duration-700 ease-out group-hover:scale-[1.04] ${
          motion === "zoom"
            ? "cover-zoom"
            : motion === "rise"
              ? "cover-rise"
              : "cover-drift"
        }`}
      />
    </div>
  );
}

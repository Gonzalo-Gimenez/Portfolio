import Image from "next/image";

export function XenonCover({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="xenon-cover">
      <span className="xenon-cover-halo" aria-hidden />
      <div className="xenon-cover-frame">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 768px) 48rem, 100vw"
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}

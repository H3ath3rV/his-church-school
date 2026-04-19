import type { CSSProperties } from "react";

type ResponsiveHeroValue = {
  mobile?: string;
  tablet?: string;
  desktop?: string;
};

type PageHeroProps = {
  title: string;
  imageUrl: string;
  imagePosition?: ResponsiveHeroValue;
  imageSize?: ResponsiveHeroValue;
};

export default function PageHero({
  title,
  imageUrl,
  imagePosition,
  imageSize,
}: PageHeroProps) {
  const style = {
    backgroundImage: `url(${imageUrl})`,
    "--hcs-page-hero-position-mobile": imagePosition?.mobile ?? "center center",
    "--hcs-page-hero-position-tablet":
      imagePosition?.tablet ?? imagePosition?.mobile ?? "center center",
    "--hcs-page-hero-position-desktop":
      imagePosition?.desktop ??
      imagePosition?.tablet ??
      imagePosition?.mobile ??
      "center center",
    "--hcs-page-hero-size-mobile": imageSize?.mobile ?? "960px",
    "--hcs-page-hero-size-tablet":
      imageSize?.tablet ?? imageSize?.mobile ?? "1280px",
    "--hcs-page-hero-size-desktop":
      imageSize?.desktop ?? imageSize?.tablet ?? imageSize?.mobile ?? "1680px",
  } as CSSProperties;

  return (
    <section className="hcs-page-hero">
      <div className="hcs-page-hero-media" style={style} />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,16,64,0.1)_0%,rgba(5,16,64,0.2)_42%,rgba(5,16,64,0.48)_68%,rgba(5,16,64,0.86)_100%)]" />
      <div className="relative z-10 mx-auto w-full max-w-7xl hcs-shell pb-10">
        <h1 className="font-display text-5xl md:text-7xl font-black text-white">
          {title}
        </h1>
      </div>
    </section>
  );
}

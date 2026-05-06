import type { CSSProperties, ReactNode } from "react";

type ResponsiveHeroValue = {
  mobile?: string;
  tablet?: string;
  desktop?: string;
};

type PageHeroProps = {
  title?: ReactNode;
  imageUrl: string;
  mobileAspectRatio?: string;
  mobileShowFullImage?: boolean;
  mobileHeight?: string;
  tabletImageUrl?: string;
  tabletAspectRatio?: string;
  tabletShowFullImage?: boolean;
  tabletHeight?: string;
  desktopImageUrl?: string;
  desktopAspectRatio?: string;
  desktopShowFullImage?: boolean;
  desktopHeight?: string;
  imagePosition?: ResponsiveHeroValue;
  imageSize?: ResponsiveHeroValue;
  children?: ReactNode;
  className?: string;
  overlayClassName?: string;
  shellClassName?: string;
  titleClassName?: string;
};

export default function PageHero({
  children,
  className = "",
  title,
  imageUrl,
  mobileAspectRatio,
  mobileShowFullImage = false,
  mobileHeight,
  tabletImageUrl,
  tabletAspectRatio,
  tabletShowFullImage = false,
  tabletHeight,
  desktopImageUrl,
  desktopAspectRatio,
  desktopShowFullImage = false,
  desktopHeight,
  imagePosition,
  imageSize,
  overlayClassName,
  shellClassName,
  titleClassName,
}: PageHeroProps) {
  const style = {
    "--hcs-page-hero-aspect-mobile": mobileAspectRatio ?? "1080 / 1201",
    "--hcs-page-hero-aspect-tablet": tabletAspectRatio ?? "2 / 1",
    "--hcs-page-hero-aspect-desktop": desktopAspectRatio ?? "4 / 1",
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
    "--hcs-page-hero-height-mobile": mobileHeight ?? "16rem",
    "--hcs-page-hero-height-tablet": tabletHeight ?? "18rem",
    "--hcs-page-hero-height-desktop": desktopHeight ?? "20rem",
  } as CSSProperties;

  return (
    <section
      className={`hcs-page-hero${mobileShowFullImage ? " hcs-page-hero--mobile-full" : ""}${tabletShowFullImage ? " hcs-page-hero--tablet-full" : ""}${desktopShowFullImage ? " hcs-page-hero--desktop-full" : ""} ${className}`.trim()}
    >
      <picture className="hcs-page-hero-media" style={style} aria-hidden="true">
        <source
          media="(min-width: 1024px)"
          srcSet={desktopImageUrl ?? imageUrl}
        />
        <source
          media="(min-width: 640px)"
          srcSet={tabletImageUrl ?? imageUrl}
        />
        <img
          src={imageUrl}
          alt=""
          width="1080"
          height="1201"
          fetchPriority="high"
          decoding="async"
        />
      </picture>
      <div
        className={
          overlayClassName ??
          "pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,16,64,0.1)_0%,rgba(5,16,64,0.2)_42%,rgba(5,16,64,0.48)_68%,rgba(5,16,64,0.86)_100%)]"
        }
      />
      <div
        className={`relative z-10 mx-auto flex h-full w-full max-w-7xl box-border items-end hcs-shell ${shellClassName ?? "pb-10"}`.trim()}
      >
        {children ?? (
          <h1
            className={
              titleClassName ??
              "font-display text-5xl font-black text-white md:text-7xl"
            }
          >
            {title}
          </h1>
        )}
      </div>
    </section>
  );
}

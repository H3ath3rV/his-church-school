type ResponsiveEditorialImageProps = {
  desktopImageUrl: string;
  alt: string;
  mobileImageUrl?: string;
  tabletImageUrl?: string;
  className?: string;
  imageClassName?: string;
  decoding?: "async" | "auto" | "sync";
  fetchPriority?: "auto" | "high" | "low";
  loading?: "eager" | "lazy";
  sizes?: string;
  width?: number;
  height?: number;
};

export default function ResponsiveEditorialImage({
  desktopImageUrl,
  alt,
  mobileImageUrl,
  tabletImageUrl,
  className = "",
  imageClassName = "",
  decoding = "async",
  fetchPriority = "auto",
  loading = "lazy",
  sizes = "(max-width: 639px) 100vw, (max-width: 1023px) min(42rem, 100vw), 50vw",
  width,
  height,
}: ResponsiveEditorialImageProps) {
  const resolvedDesktopImageUrl = desktopImageUrl;
  const resolvedTabletImageUrl = tabletImageUrl ?? desktopImageUrl;
  const resolvedMobileImageUrl = mobileImageUrl ?? resolvedTabletImageUrl;

  return (
    <div className={className}>
      <picture>
        <source
          media="(min-width: 640px) and (max-width: 1023px)"
          srcSet={resolvedTabletImageUrl}
        />
        <source media="(max-width: 639px)" srcSet={resolvedMobileImageUrl} />
        <img
          src={resolvedDesktopImageUrl}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          loading={loading}
          decoding={decoding}
          fetchPriority={fetchPriority}
          className={imageClassName}
        />
      </picture>
    </div>
  );
}

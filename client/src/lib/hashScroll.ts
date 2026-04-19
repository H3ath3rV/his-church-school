const FALLBACK_HEADER_OFFSET = 80;
const HASH_SCROLL_RETRY_DELAY_MS = 60;
const HASH_SCROLL_RETRY_LIMIT = 12;

function getStickyHeaderOffset() {
  const header = document.querySelector<HTMLElement>("[data-site-header]");
  return header?.getBoundingClientRect().height || FALLBACK_HEADER_OFFSET;
}

function getHashTarget(hash: string) {
  const normalizedHash = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!normalizedHash) return null;

  const decodedHash = decodeURIComponent(normalizedHash);
  return document.getElementById(decodedHash);
}

export function scrollToHashTarget(
  hash: string,
  behavior: ScrollBehavior = "auto"
) {
  if (typeof window === "undefined" || typeof document === "undefined")
    return false;

  const target = getHashTarget(hash);
  if (!target) return false;

  const scrollMarginTop =
    Number.parseFloat(window.getComputedStyle(target).scrollMarginTop) ||
    getStickyHeaderOffset() + 12;
  const top =
    window.scrollY + target.getBoundingClientRect().top - scrollMarginTop;

  window.scrollTo({
    top: Math.max(0, top),
    left: 0,
    behavior,
  });

  return true;
}

export function scheduleHashScroll(
  hash: string,
  behavior: ScrollBehavior = "auto"
) {
  if (!hash) return () => undefined;

  let attempt = 0;
  let timeoutId: number | null = null;
  let frameId: number | null = null;

  const tryScroll = () => {
    if (
      scrollToHashTarget(hash, behavior) ||
      attempt >= HASH_SCROLL_RETRY_LIMIT
    )
      return;

    attempt += 1;
    timeoutId = window.setTimeout(tryScroll, HASH_SCROLL_RETRY_DELAY_MS);
  };

  frameId = window.requestAnimationFrame(() => {
    frameId = window.requestAnimationFrame(tryScroll);
  });

  return () => {
    if (frameId !== null) {
      window.cancelAnimationFrame(frameId);
    }

    if (timeoutId !== null) {
      window.clearTimeout(timeoutId);
    }
  };
}

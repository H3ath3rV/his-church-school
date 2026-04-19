import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();

if (
  gaMeasurementId &&
  !document.querySelector("script[data-hcs-google-analytics='true']")
) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", gaMeasurementId, { send_page_view: false });

  const gaScript = document.createElement("script");
  gaScript.async = true;
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
    gaMeasurementId
  )}`;
  gaScript.dataset.hcsGoogleAnalytics = "true";
  document.head.append(gaScript);
}

createRoot(document.getElementById("root")!).render(<App />);

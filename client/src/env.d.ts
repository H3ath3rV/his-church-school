interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_ENQUIRY_FORM_ENDPOINT?: string;
  readonly VITE_FORMSPREE_ENDPOINT?: string;
  readonly VITE_ASSET_VERSION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const __ASSET_VERSION__: string;

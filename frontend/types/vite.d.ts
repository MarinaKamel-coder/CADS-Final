/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: Record<string, string | undefined>;
}

declare const __DEV__: boolean;
declare const __PROD__: boolean;
declare const __SSR__: boolean;

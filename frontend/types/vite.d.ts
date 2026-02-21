/// <reference types="vite/client" />

declare global {
  interface ImportMeta {
    readonly env: Record<string, string | undefined> & {
      VITE_CLERK_PUBLISHABLE_KEY?: string;
      VITE_API_URL?: string;
    };
  }
}

declare const __DEV__: boolean;
declare const __PROD__: boolean;
declare const __SSR__: boolean;

export {};

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STUDY_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

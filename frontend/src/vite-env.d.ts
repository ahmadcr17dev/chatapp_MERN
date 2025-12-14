/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LOGIN_KEY: string;
  readonly VITE_REGISTER_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
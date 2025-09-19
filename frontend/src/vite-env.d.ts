/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE: string
  readonly VITE_MAIL_PARSER_URL: string
  readonly VITE_METAMCP_HEALTH: string
  readonly VITE_USE_MOCK: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
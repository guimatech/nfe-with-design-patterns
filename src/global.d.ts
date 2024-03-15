namespace NodeJS {
  interface ProcessEnv {
    HOST?: string
    NODE_ENV?: "development" | "production"
    POSTGRES_HOST?: string
    POSTGRES_PORT?: number
    POSTGRES_USER?: string
    POSTGRES_DB?: string
    POSTGRES_PASSWORD?: string
    DATABASE_URL?: string
  }
}

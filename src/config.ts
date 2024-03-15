import path from "path";
import dotenv from "dotenv";
import dotenvexpand from "dotenv-expand";

dotenvexpand.expand(
  dotenv.config({
    path: path.resolve(__dirname, "../.env.development")
  })
);

interface ENV {
  NODE_ENV: string | undefined;
  POSTGRES_HOST: string | undefined;
  POSTGRES_PORT: number | undefined;
  POSTGRES_USER: string | undefined;
  POSTGRES_DB: string | undefined;
  POSTGRES_PASSWORD: string | undefined;
  DATABASE_URL: string | undefined;
}

interface Config {
  NODE_ENV: string;
  POSTGRES_HOST: string
  POSTGRES_PORT: number
  POSTGRES_USER: string
  POSTGRES_DB: string
  POSTGRES_PASSWORD: string
  DATABASE_URL: string
}

const getConfig = (): ENV => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    POSTGRES_HOST: process.env.NODE_ENV,
    POSTGRES_PORT: process.env.POSTGRES_PORT ? Number(process.env.POSTGRES_PORT) : undefined,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_DB: process.env.POSTGRES_DB,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    DATABASE_URL: process.env.DATABASE_URL
  };
};

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;

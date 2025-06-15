import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const { API_KEY, TL_TOKEN, PORT } = process.env;

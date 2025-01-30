import type { Request as ExpressRequest } from "express";
import type { JwtPayload } from "jsonwebtoken";
import { z } from "zod";

export const envVariables = z.object({
  HOST: z.string(),
  PORT: z.string(),
  JWT_SECRET: z.string(),
}) as const;

export const env = envVariables.parse({
  JWT_SECRET: process.env.JWT_SECRET,
  HOST: process.env.HOST,
  PORT: process.env.PORT,
}) as const;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
  namespace Express {
    interface Request {
      user: UserPayload;
    }
  }
}

export type UserPayload = {
  username: string;
};

import jwt from "jsonwebtoken";
import type { UserPayload } from "../global.js";

export const sign = (payload: { user: UserPayload; refresh?: boolean }) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: payload.refresh ? "7d" : "1h",
  });
};

export const verify = (token: string): UserPayload => {
  return jwt.verify(token, process.env.JWT_SECRET) as UserPayload;
};

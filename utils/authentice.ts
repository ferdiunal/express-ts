import type { Request, Response, NextFunction } from "express";
import { verify } from "./jwt.ts";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const decoded = verify(token);
  req.user = decoded;
  next();
};

export const authenticateRefresh = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const decoded = verify(token);
  req.user = decoded;
  next();
};

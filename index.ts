import "dotenv/config";
import express from "express";
import type { Request, Response } from "express";
import { sign } from "./utils/jwt.ts";
import { authenticate, authenticateRefresh } from "./utils/authentice.ts";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username !== "admin" || password !== "password") {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const token = sign({ user: { username } });
  const refreshToken = sign({
    user: { username },
    refresh: true,
  });
  res.json({ token, refreshToken });
});

app.post("/refresh", authenticateRefresh, (req: Request, res: Response) => {
  const { username } = req.user;

  const token = sign({
    user: { username },
  });
  const refreshToken = sign({
    user: { username },
    refresh: true,
  });

  res.json({ token, refreshToken });
});

app.get("/user", authenticate, (req: Request, res: Response) => {
  res.json({ user: req.user });
});

app.get("/protected", authenticate, (req: Request, res: Response) => {
  res.json({ message: "This is a protected route" });
});

const { HOST, PORT } = process.env;

app.listen(Number(PORT), HOST, () => {
  console.log(`Server is running on port http://${HOST}:${PORT}`);
});

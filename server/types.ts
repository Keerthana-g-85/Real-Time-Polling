import type { Request, Response } from "express";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface AuthContext {
  user: AuthUser | null;
  req: Request;
  res: Response;
}
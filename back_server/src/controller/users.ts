import { Request, Response } from "express";

export function newUser(req: Request, res: Response): Response {
  return res.send("hello");
}

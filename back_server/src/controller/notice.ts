import { Request, Response } from "express";
import Notice from "../database.notice";
export function newPage() {}
export async function getMainPage(req: Request, res: Response) {
  const notice = new Notice();
  const result = await notice.getNotice();
  if (result) {
    res.status(200).json(result);
  }
}
export function getClickedPage(req: Request, res: Response) {}
export function modifyPage() {}

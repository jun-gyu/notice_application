import { Request, Response } from "express";
import Notice from "../database.notice";

export function newPage() {}
export async function getMainPage(req: Request, res: Response) {
  const notice = new Notice();
  const result = await notice.getNotice();
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).send({ code: 404, message: `can not found anything` });
  }
}
export async function getClickedPage(req: Request, res: Response) {
  const { noticeId } = req.params;
  const notice = new Notice();
  const result = await notice.getClickedPage(noticeId);
  if (result) {
    res.status(200).json(result[0]);
  } else {
    res.status(404).send({ code: 404, message: `can not found anything` });
  }
}
export async function searchInput(req: Request, res: Response) {
  const { menuQuery, contentQuery } = req.body;
  console.log(menuQuery);
  const notice = new Notice();
  let userId = await notice.searchResult(menuQuery, contentQuery);
  res.send(userId);
}

export function modifyPage() {}

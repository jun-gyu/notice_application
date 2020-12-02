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
  console.log(noticeId);
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
  console.log(req.body);

  const notice = new Notice();
  let searchResult = await notice.searchResult(menuQuery, contentQuery);

  if (Array.isArray(searchResult)) {
    res.send(searchResult);
  } else {
    res.status(400).send({ code: 400, message: "bad request" });
  }
}

export function modifyPage() {}

import { Request, Response } from "express";
import Notice from "../database.notice";
import { NoticeInter, Query } from "../interface/index";
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
  const { menuQuery, contentQuery }: Query = req.body;

  const notice = new Notice();
  let searchResult = await notice.searchResult(menuQuery, contentQuery);

  if (Array.isArray(searchResult)) {
    res.send(searchResult);
  } else {
    res.status(400).send({ code: 400, message: "bad request" });
  }
}

export async function writePage(req: Request, res: Response) {
  const { noticeId, title, content, userId }: NoticeInter = req.body;
  const notice = new Notice();
  const result = await notice.wirtePage(noticeId, title, content, userId);
  console.log(result);
  if (result === undefined) {
    //저장이 오류 없이 되었다.
    res.status(200).send({ code: 200, message: "success save your data" });
  } else {
    res.status(400).send({ code: 400, message: result });
  }
}
export async function modifyPage(req: Request, res: Response) {
  const { noticeId, title, content }: NoticeInter = req.body;

  const notice = new Notice();
  const result = await notice.modifyPage(noticeId, title, content);
  if (result) {
    res.status(200).send({ code: 200, message: "modify complite" });
  } else {
    res.status(400).send({ code: 400, message: "bad request" });
  }
}

import { Request, Response } from "express";
import UserDb from "../databases.user";
import { bcryptFunc, compareBcy } from "../helper/bcy";
import { UserInter } from "../interface/index";
export async function signUp(req: Request, res: Response) {
  const { name, email, password }: UserInter = req.body;
  const bcyPassword = bcryptFunc(password);
  const conn: UserDb = new UserDb();
  const isErr = await conn.singUp(name, email, bcyPassword);
  if (isErr) {
    //에러가 있을 때만 signUp에서 return 값이 있음.
    return res.status(400).send(isErr.message);
  } else {
    return res.status(200).send("welcom newUser");
  }
}

export async function signIn(req: Request, res: Response) {
  const { email, password }: UserInter = req.body;
  const isExist = await compareBcy(email, password);
  // req.body로 들어온 비밀번호 값을 db에 저장된 암호화된 비밀번호와 비교함.
  if (isExist.checkPW) {
    //connect DB
    const conn = new UserDb();
    const userInfo = await conn.singIn(email, isExist.userPW);
    let session: any = req.session;
    session.email = userInfo[0][0].email;

    res.json({ message: `welcome ${userInfo[0][0].name}` });
  } else if (isExist) {
    res.status(400).send({ message: isExist.message });
  }
}

export function logOut(req: Request, res: Response) {
  let session: any = req.session;
  session.destroy();
  res.json({ message: `logout complite ,destroy session` });
}

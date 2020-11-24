import { Request, Response } from "express";
import Connection from "../databases";
import { bcryptFunc, compareBcy } from "../helper/bcy";

export async function signUp(req: Request, res: Response) {
  const { name, email, password } = req.body;
  const bcyPassword = bcryptFunc(password);
  const conn: Connection = new Connection();
  const isErr = await conn.singUp(name, email, bcyPassword);
  if (isErr) {
    //에러가 있을 때만 signUp에서 return 값이 있음.
    return res.status(500).send(isErr.message);
  } else {
    return res.status(200).send("welcom newUser");
  }
}

export async function signIn(req: Request, res: Response) {
  const { email, password } = req.body;
  const isExist = await compareBcy(email, password); // req.body로 들어온 비밀번호 값을 db에 저장된 암호화된 비밀번호와 비교함.
  if (isExist.checkPW) {
    const conn = new Connection();
    const result = await conn.singIn(email, isExist.userPW);

    res.status(200).send({ message: `welcome ${result[0][0].name}` });
  } else if (isExist) {
    res.status(500).send({ message: isExist.message });
  }
}

export function logOut() {}
export function deleteUser() {}

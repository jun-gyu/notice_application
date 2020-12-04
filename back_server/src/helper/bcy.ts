import bcrypt from "bcryptjs";
import UserDb from "../databases.user";
export function bcryptFunc(password: string): string {
  const salt: string = bcrypt.genSaltSync(10);
  const hash: string = bcrypt.hashSync(password, salt);
  return hash;
}

export async function compareBcy(
  email: string,
  password: string
): Promise<any> {
  const conn = new UserDb();
  try {
    const result = await conn.userPassword(email);
    if (result[0].length === 0) {
      throw new Error("not found user, check your email OR password plz");
    } else {
      const userPassword: string = result[0][0].password;
      const isExist: boolean = bcrypt.compareSync(password, userPassword);
      return { checkPW: isExist, userPW: userPassword };
    }
  } catch (err) {
    console.log(err);
    return err;
  }
}

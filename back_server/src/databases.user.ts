import { createPool } from "mysql2/promise";
import config from "./config/index";

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = config;

export default class UserDb {
  async connection() {
    const pool = createPool({
      connectionLimit: 10,
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_DATABASE,
    });
    return pool;
  }
  async userPassword(email: string): Promise<any> {
    try {
      const pool = await this.connection();
      const conn = await pool.getConnection();
      const insertSql: string = "select * from users where email=?";
      conn.beginTransaction();
      const result = await conn.query(insertSql, [email]);
      conn.release();
      return result;
    } catch (err) {
      return err;
    }
  }
  async singUp(name: string, email: string, password: string): Promise<any> {
    try {
      const pool = await this.connection();
      const conn = await pool.getConnection();
      const insertSql: string =
        "insert into users(name,email, password) values(?,?,?)";
      conn.beginTransaction();
      await conn.query(insertSql, [name, email, password]); // email 필드에 적용되어있는 unique속성으로 인해 중복이라면 catch 로 간다.
      conn.commit();
      conn.release();
    } catch (err) {
      return err;
      //err.message가 Duplicate(중복)일 경우 있음.;
    }
  }

  async singIn(email: string, password: string) {
    try {
      const pool = await this.connection();
      const conn = await pool.getConnection();
      const insertSql: string = `select * from users where email='${email}' AND password='${password}'`;
      conn.beginTransaction();
      const result = await conn.query(insertSql);
      conn.commit();
      conn.release();
      return result;
    } catch (err) {
      return err;
    }
  }

  async logOut() {
    //Redis 와 express-session 을 연결해야함.
  }
}

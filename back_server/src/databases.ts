import { createPool } from "mysql2/promise";
import config from "./config/index";

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = config;

export default class Connetion {
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

  async newUser(name: string, email: string, password: string) {
    try {
      const pool = await this.connection();
      const conn = await pool.getConnection();
      const insertSql: string = `insert into users(name,email, password) values(?,?,?)`;
      conn.beginTransaction();
      const users1 = await conn.query(insertSql, [name, email, password]); // email 필드에 적용되어있는 unique속성으로 인해 중복이라면 catch 로 간다.
      conn.commit();
      conn.release();
      return users1;
    } catch (err) {
      console.log(err); //err.message가 Duplicate(중복)일 경우 있음.;
      return err.message;
    }
  }
}

/*
모듈 설치 및 서버 테스트
config 환경변수 설정
express 초기 설정
데이터베이스 테스트
리액트 타입스크립트 확인.
router controller sql 생성 
*/

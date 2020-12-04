import { createPool } from "mysql2/promise";
import config from "./config/index";

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = config;

export default class DbConnection {
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
}

import UserDb from "./databases.user";

export default class Notice extends UserDb {
  constructor() {
    super();
  }
  async getNotice() {
    try {
      const pool = await this.connection();
      const conn = await pool.getConnection();
      const insertSql: string =
        "select notice_id,title,content,update_date from notice";
      conn.beginTransaction();
      const result = await conn.query(insertSql);
      conn.release();

      return result[0];
    } catch (err) {
      return err;
    }
  }
}

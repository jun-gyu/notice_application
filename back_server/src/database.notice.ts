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
  async getClickedPage(noticeId: string) {
    try {
      const pool = await this.connection();
      const conn = await pool.getConnection();
      const insertSql = `select notice.title,notice.content,notice.update_date ,users.name from notice left join users on notice.user_id = users.user_id where notice_id ="${noticeId}"`;
      conn.beginTransaction();
      const result = await conn.query(insertSql);
      conn.release();
      return result;
    } catch (err) {
      return err;
    }
  }
  async searchResult(menuQuery: string, contentQuery: string) {
    try {
      const pool = await this.connection();
      const conn = await pool.getConnection();
      let insertSql: string = "";
      conn.beginTransaction();
      if (menuQuery === "작성자") {
        insertSql = `select user_id from users where name="${contentQuery}"`;
        const userIdResult: any = await conn.query(insertSql);
        const userId: number = userIdResult[0][0].user_id;
        if (userId) {
          insertSql = `select users.name, notice.title, notice.content,notice.update_date from notice left join users on notice.user_id = users.user_id where users.user_id = ${userId};`;
          const searchResult: any = await conn.query(insertSql);
          conn.release();
          return searchResult[0];
        }
      } else if (menuQuery === "글") {
        insertSql = `select users.name, notice.title, notice.content,notice.update_date from notice left join users on notice.user_id = users.user_id where notice.content Like "%${contentQuery}%"`;
        const contentResult: any = await conn.query(insertSql);
        if (contentResult[0]) {
          conn.release();
          return contentResult[0];
        }
      } else if (menuQuery === "제목") {
        console.log("hello");
        insertSql = `select users.name, notice.title, notice.content,notice.update_date from notice left join users on notice.user_id = users.user_id where notice.title Like "%${contentQuery}%"`;
        console.log(insertSql);
        const titleResult: any = await conn.query(insertSql);
        console.log(titleResult);
        if (titleResult[0]) {
          conn.release();
          return titleResult[0];
        }
      }
    } catch (err) {
      return err;
    }
  }
}

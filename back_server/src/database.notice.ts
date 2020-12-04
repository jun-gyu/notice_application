import DbConnection from "./databases.conn";

export default class Notice extends DbConnection {
  constructor() {
    super();
  }
  async getNotice() {
    try {
      const pool = await this.connection();
      const conn = await pool.getConnection();
      const insertSql: string =
        "select users.name, notice_id,notice.title, notice.content,notice.update_date from notice left join users on notice.user_id = users.user_id;";
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
          insertSql = `select users.name, notice_id,notice.title, notice.content,notice.update_date from notice left join users on notice.user_id = users.user_id where users.user_id = ${userId};`;
          const searchResult: any = await conn.query(insertSql);
          conn.release();
          return searchResult[0];
        }
      } else if (menuQuery === "글") {
        insertSql = `select users.name, notice_id,notice.title, notice.content,notice.update_date from notice left join users on notice.user_id = users.user_id where notice.content Like "%${contentQuery}%"`;
        const contentResult: any = await conn.query(insertSql);
        if (contentResult[0]) {
          conn.release();
          return contentResult[0];
        }
      } else if (menuQuery === "제목") {
        insertSql = `select users.name, notice_id,notice.title, notice.content,notice.update_date from notice left join users on notice.user_id = users.user_id where notice.title Like "%${contentQuery}%"`;
        const titleResult: any = await conn.query(insertSql);
        if (titleResult[0]) {
          conn.release();
          return titleResult[0];
        }
      }
    } catch (err) {
      return err;
    }
  }

  async wirtePage(
    noticeId: string,
    title: string,
    content: string,
    userId: number
  ) {
    try {
      const pool = await this.connection();
      const conn = await pool.getConnection();
      const insertSql: string = `INSERT INTO notice(notice_id,title,content,create_date,update_date,user_id) VALUES("${noticeId}","${title}","${content}",now(),now(),${userId});`;
      conn.beginTransaction();
      await conn.query(insertSql);
      conn.commit();
      conn.release();
    } catch (err) {
      return err;
    }
  }
  async modifyPage(noticeId: string, title: string, content: string) {
    //Update data
    try {
      const pool = await this.connection();
      const conn = await pool.getConnection();
      const insertSql: string = `UPDATE notice SET title=? ,content=?,update_date=now() WHERE notice_id=?`;
      const query = [title, content, noticeId];
      conn.beginTransaction();
      const result = await conn.query(insertSql, query);
      conn.commit();
      conn.release();
      return result;
    } catch (err) {
      console.log(err);
    }
  }
}

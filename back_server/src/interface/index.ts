export interface NoticeInter {
  noticeId: string;
  title: string;
  content: string;
  userId: number;
}

export interface UserInter {
  name: string;
  email: string;
  password: string;
}
export interface Query {
  menuQuery: string;
  contentQuery: string;
}

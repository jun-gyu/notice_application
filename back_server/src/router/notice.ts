import { Router } from "express";
import {
  getMainPage,
  getClickedPage,
  searchInput,
  writePage,
  modifyPage,
} from "../controller/notice";
const router = Router();

router.get("/mainPage", getMainPage);
router.get("/clickPage/:noticeId", getClickedPage); // 글 수정 눌렀을 경우에도 해당 api 사용 modifyPage에해당 noticeId에 맞는 정보들 전달하여 input value에 표현.
router.post("/modifyPage", modifyPage);
router.post("/search", searchInput);
router.post("/writePage", writePage);

export default router;

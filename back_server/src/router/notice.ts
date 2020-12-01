import { Router } from "express";
import { getMainPage, getClickedPage, searchInput } from "../controller/notice";
const router = Router();

router.get("/mainPage", getMainPage);
router.get("/clickPage/:noticeId", getClickedPage);
router.post("/search", searchInput);
export default router;

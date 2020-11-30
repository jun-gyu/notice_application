import { Router } from "express";
import { getMainPage } from "../controller/notice";
const router = Router();

router.get("/mainPage", getMainPage);

export default router;

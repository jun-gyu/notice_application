import { Router } from "express";
import { signUp, signIn } from "../controller/users";
const router = Router();

router.post("/signIn", signIn);
router.post("/signUp", signUp);
export default router;

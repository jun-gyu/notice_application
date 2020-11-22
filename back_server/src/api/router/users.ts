import { Router, Request, Response } from "express";
import { newUser } from "../../controller/users";
const router = Router();

console.log(`newUser : ${newUser}`);
router.get("/", newUser);

export default router;

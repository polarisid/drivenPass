import { Router } from "express";
import userRouter from "./userRouter.js";
import credentialRouter from "./credentialRouter.js";
import wifiRouter from "./wifiRouter.js";
const router = Router();

router.use(userRouter);
router.use(credentialRouter);
router.use(wifiRouter);

export default router;

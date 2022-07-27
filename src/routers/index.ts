import { Router } from "express";
import userRouter from "./userRouter.js";
import credentialRouter from "./credentialRouter.js";
import cardRouter from "./cardRouter.js";
import wifiRouter from "./wifiRouter.js";
import notesRouter from "./notesRouter.js";
const router = Router();

router.use(userRouter);
router.use(credentialRouter);
router.use(wifiRouter);
router.use(cardRouter);
router.use(notesRouter);
export default router;

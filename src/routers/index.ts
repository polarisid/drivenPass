import { Router } from "express";
import defaultRouter from "./defaultRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

// router.use(defaultRouter);
router.use(userRouter);

export default router;

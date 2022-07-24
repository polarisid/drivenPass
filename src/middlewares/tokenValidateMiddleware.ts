import { NextFunction, Request, Response } from "express";
import { unauthorizedError } from "../utils/errorUtils.js";
import userServices from "../services/userServices.js";
import jwt from "jsonwebtoken";
export async function tokenvalidateMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers["authorization"];
  if (!authorization) throw unauthorizedError("Missing token in header");
  const token = authorization.replace("Bearer ", "");
  if (!token) throw unauthorizedError("Missing token in header");
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as {
      userId: number;
    };
    const user = userServices.findUserById(userId);
    res.locals = { ...res.locals, user };
    next();
  } catch (error) {
    throw unauthorizedError("Invalid Token");
  }
}

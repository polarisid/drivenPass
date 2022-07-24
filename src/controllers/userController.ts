import { Request, Response } from "express";

async function Signup(req: Request, res: Response) {
  res.send("Hello World!");
}

async function Signin(req: Request, res: Response) {
  res.send("Hello World!");
}
export default {
  Signup,
  Signin,
};

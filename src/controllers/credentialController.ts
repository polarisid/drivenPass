import { Request, Response } from "express";
import credentialServices from "../services/credentialServices.js";
import { CredentialType } from "../types/credentialTypes.js";
async function CreateCredential(req: Request, res: Response) {
  const credential = {
    url: req.body.url,
    name: req.body.name.toLowerCase(),
    login: req.body.login,
    password: req.body.password,
    userId: res.locals.user.id,
  } as CredentialType;
  //   console.log(res.locals.user.id);

  await credentialServices.createAndVerifyNewUser(credential);
  res.send(201);
}

export default {
  CreateCredential,
};

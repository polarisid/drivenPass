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

  await credentialServices.createAndVerifyNewByUser(credential);
  res.sendStatus(201);
}

async function SearchById(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const userId = res.locals.user.id;
  const credential = await credentialServices.SearchByIdAndCompareUser(
    userId,
    id
  );

  res.status(200).send(credential);
}

async function SearchAllByUser(req: Request, res: Response) {
  const userId = res.locals.user.id;
  const credentials = await credentialServices.SearchAllByUser(userId);
  res.status(200).send(credentials);
}

async function DeleteById(req: Request, res: Response) {
  const userId = res.locals.user.id;
  const id = parseInt(req.params.id);
  await credentialServices.DeleteByIdAndCompareUser(id, userId);
  res.status(200).send("deleted");
}
export default {
  CreateCredential,
  SearchById,
  SearchAllByUser,
  DeleteById,
};

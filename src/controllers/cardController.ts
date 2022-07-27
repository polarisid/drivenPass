import { Request, Response } from "express";
import cardServices from "../services/cardServices.js";
import { CardsType } from "../types/cardTypes.js";

async function CreateCard(req: Request, res: Response) {
  const card = {
    number: req.body.number,
    name: req.body.name.toLowerCase(),
    cvv: req.body.cvv,
    expirationDate: req.body.expirationDate,
    title: req.body.title,
    type: req.body.type,
    password: req.body.password,
    userId: res.locals.user.id,
    virtual: req.body.virtual,
  } as CardsType;

  await cardServices.createAndVerifyNewByUser(card);
  res.send(201);
}

async function SearchById(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const userId = res.locals.user.id;
  const card = await cardServices.SearchByIdAndCompareUser(userId, id);

  res.status(200).send(card);
}

async function SearchAllByUser(req: Request, res: Response) {
  const userId = res.locals.user.id;
  const cards = await cardServices.SearchAllByUser(userId);
  res.send(cards);
}

async function DeleteById(req: Request, res: Response) {
  const userId = res.locals.user.id;
  const id = parseInt(req.params.id);
  await cardServices.DeleteByIdAndCompareUser(id, userId);
  res.status(200).send("deleted");
}
export default {
  CreateCard,
  SearchById,
  SearchAllByUser,
  DeleteById,
};

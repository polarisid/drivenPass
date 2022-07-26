import { Request, Response } from "express";
import { WifiType } from "../types/wifiTypes.js";
import wifiServices from "../services/wifiServices.js";
async function CreateWifi(req: Request, res: Response) {
  const wifi = {
    ssid: req.body.ssid,
    name: req.body.name,
    password: req.body.password,
    userId: res.locals.user.id,
  } as WifiType;

  await wifiServices.createNew(wifi);
  res.send(201);
}

async function SearchById(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const userId = res.locals.user.id;
  const wifi = await wifiServices.SearchByIdAndCompareUser(userId, id);

  res.status(200).send(wifi);
}

async function SearchAllByUser(req: Request, res: Response) {
  const userId = res.locals.user.id;
  const wifi = await wifiServices.SearchAllByUser(userId);
  res.send(wifi);
}

async function DeleteById(req: Request, res: Response) {
  const userId = res.locals.user.id;
  const id = parseInt(req.params.id);
  await wifiServices.DeleteByIdAndCompareUser(id, userId);
  res.status(200).send("deleted");
}
export default {
  CreateWifi,
  SearchById,
  SearchAllByUser,
  DeleteById,
};

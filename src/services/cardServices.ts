import cardRepositories from "../repositories/cardRepositories.js";
import { CardsType } from "../types/cardTypes.js";
import Cryptr from "cryptr";
import {
  conflictError,
  notFoundError,
  unauthorizedError,
} from "../utils/errorUtils.js";

const cryptr = new Cryptr(process.env.CRYPTR_KEY);

async function createAndVerifyNewByUser(card: CardsType) {
  const cardExists = await cardRepositories.FindByTitleAndUser(
    card.title,
    card.userId
  );
  if (cardExists.length > 0)
    throw conflictError("CardTitle already exists in database");
  const encryptedPassword = cryptr.encrypt(card.password);
  const encryptedCVV = cryptr.encrypt(card.cvv);
  await cardRepositories.Insert({
    ...card,
    password: encryptedPassword,
    cvv: encryptedCVV,
  });
  return;
}

async function SearchByIdAndCompareUser(userId: number, id: number) {
  const cardExists = await cardRepositories.FindById(id);
  if (!cardExists) throw notFoundError("Not found");
  if (cardExists.userId !== userId)
    throw unauthorizedError("You are not Owner");

  const decryptedPassword = cryptr.decrypt(cardExists.password);
  const decryptedCVV = cryptr.decrypt(cardExists.cvv);
  const cardDecrypted = {
    ...cardExists,
    password: decryptedPassword,
    cvv: decryptedCVV,
  };
  return cardDecrypted;
}

async function SearchAllByUser(userId: number) {
  const card = await cardRepositories.FindByUserId(userId);
  const cardDecrypted = [];
  card.map((i) =>
    cardDecrypted.push({
      ...i,
      password: cryptr.decrypt(i.password),
      cvv: cryptr.decrypt(i.cvv),
    })
  );

  return cardDecrypted;
}

async function DeleteByIdAndCompareUser(id: number, userId: number) {
  const card = await cardRepositories.FindById(id);
  if (!card) throw notFoundError("Not found");
  if (card.userId !== userId) throw unauthorizedError("You are not Owner");
  await cardRepositories.DeleteById(id);
  return;
}

export default {
  createAndVerifyNewByUser,
  SearchByIdAndCompareUser,
  SearchAllByUser,
  DeleteByIdAndCompareUser,
};

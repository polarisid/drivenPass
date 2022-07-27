import { prisma } from "../database.js";
import { CardsType } from "../types/cardTypes.js";

async function Insert(card: CardsType) {
  const result = await prisma.cards.create({
    data: card,
  });
  return result;
}

async function FindByTitleAndUser(title: string, userId: number) {
  const result = await prisma.cards.findMany({
    where: { AND: [{ userId }, { title }] },
  });
  return result;
}

async function FindById(id: number) {
  const result = await prisma.cards.findUnique({
    where: { id },
  });
  return result;
}

async function FindByUserId(userId: number) {
  const result = await prisma.cards.findMany({
    where: { userId },
  });
  return result;
}

async function DeleteById(id: number) {
  const result = await prisma.cards.delete({
    where: { id },
  });
  return result;
}

export default {
  Insert,
  FindByTitleAndUser,
  FindById,
  FindByUserId,
  DeleteById,
};

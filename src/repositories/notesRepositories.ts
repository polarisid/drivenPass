import { prisma } from "../database.js";
import { NotesType } from "../types/noteTypes.js";

async function Insert(note: NotesType) {
  const result = await prisma.notes.create({
    data: note,
  });
  return result;
}

async function FindByNameAndUser(name: string, userId: number) {
  const result = await prisma.notes.findMany({
    where: { AND: [{ userId }, { name }] },
  });
  return result;
}

async function FindByUserId(userId: number) {
  const result = await prisma.notes.findMany({
    where: { userId },
  });
  return result;
}

async function FindById(id: number) {
  const result = await prisma.notes.findUnique({
    where: { id },
  });
  return result;
}

async function DeleteById(id: number) {
  const result = await prisma.notes.delete({
    where: { id },
  });
  return result;
}

export default {
  Insert,
  FindByNameAndUser,
  FindByUserId,
  FindById,
  DeleteById,
};

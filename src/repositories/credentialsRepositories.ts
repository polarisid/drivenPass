import { prisma } from "../database.js";
import { CredentialType } from "../types/credentialTypes.js";

async function Insert(credential: CredentialType) {
  const result = await prisma.credentials.create({
    data: credential,
  });
  return result;
}

async function FindByNameAndUser(name: string, userId: number) {
  const result = await prisma.credentials.findMany({
    where: { AND: [{ userId }, { name }] },
  });
  return result;
}

async function FindById(id: number) {
  const result = await prisma.credentials.findUnique({
    where: { id },
  });
  return result;
}

async function FindByUserId(userId: number) {
  const result = await prisma.credentials.findMany({
    where: { userId },
  });
  return result;
}

async function DeleteById(id: number) {
  const result = await prisma.credentials.delete({
    where: { id },
  });
  return result;
}

export default {
  Insert,
  FindByNameAndUser,
  FindById,
  FindByUserId,
  DeleteById,
};

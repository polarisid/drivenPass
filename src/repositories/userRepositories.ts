import { prisma } from "../database.js";
import { UserSignupType } from "../types/userTypes.js";

async function Insert(params: UserSignupType) {
  const result = await prisma.users.create({
    data: params,
  });
  return result;
}

async function FindByEmail(email: string) {
  const result = await prisma.users.findUnique({
    where: { email },
  });
  return result;
}

async function FindById(id: number) {
  const result = await prisma.users.findUnique({
    where: { id },
  });
  return result;
}

export default { Insert, FindByEmail, FindById };

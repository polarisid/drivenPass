import { prisma } from "../database.js";
import { credentials } from "@prisma/client";
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

export default { Insert, FindByNameAndUser };

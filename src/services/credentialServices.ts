import credentialsRepositories from "../repositories/credentialsRepositories.js";
import { CredentialType } from "../types/credentialTypes.js";
import Cryptr from "cryptr";
import {
  conflictError,
  notFoundError,
  unauthorizedError,
} from "../utils/errorUtils.js";

const cryptr = new Cryptr(process.env.CRYPTR_KEY);

async function createAndVerifyNewByUser(credential: CredentialType) {
  const credentialExists = await credentialsRepositories.FindByNameAndUser(
    credential.name,
    credential.userId
  );
  if (credentialExists.length > 0)
    throw conflictError("CredentialName already exists in database");
  const encryptedPassword = cryptr.encrypt(credential.password);
  await credentialsRepositories.Insert({
    ...credential,
    password: encryptedPassword,
  });
  return;
}

async function SearchByIdAndCompareUser(userId: number, id: number) {
  const credentialExists = await credentialsRepositories.FindById(id);
  if (!credentialExists) throw notFoundError("Not found");
  if (credentialExists.userId !== userId)
    throw unauthorizedError("You are not Owner");

  const decryptedPassword = cryptr.decrypt(credentialExists.password);
  const credentialDecrypt = {
    ...credentialExists,
    password: decryptedPassword,
  };
  return credentialDecrypt;
}

async function SearchAllByUser(userId: number) {
  const credentials = await credentialsRepositories.FindByUserId(userId);
  const credentialsDecrypted = [];
  credentials.map((i) =>
    credentialsDecrypted.push({ ...i, password: cryptr.decrypt(i.password) })
  );

  return credentialsDecrypted;
}

async function DeleteByIdAndCompareUser(id: number, userId: number) {
  const credential = await credentialsRepositories.FindById(id);
  if (!credential) throw notFoundError("Not found");
  if (credential.userId !== userId)
    throw unauthorizedError("You are not Owner");
  await credentialsRepositories.DeleteById(id);
  return;
}

export default {
  createAndVerifyNewByUser,
  SearchByIdAndCompareUser,
  SearchAllByUser,
  DeleteByIdAndCompareUser,
};

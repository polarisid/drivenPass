import credentialsRepositories from "../repositories/credentialsRepositories.js";
import { CredentialType } from "../types/credentialTypes.js";
import Cryptr from "cryptr";
import {
  conflictError,
  notFoundError,
  unauthorizedError,
} from "../utils/errorUtils.js";

const cryptr = new Cryptr(process.env.CRYPTR_KEY);

async function createAndVerifyNewUser(credential: CredentialType) {
  const credentialExists = await credentialsRepositories.FindByNameAndUser(
    credential.name,
    credential.userId
  );
  console.log(credentialExists);
  if (credentialExists.length > 0)
    throw conflictError("CredentialName already exists in database");
  const encryptedPassword = cryptr.encrypt(credential.password);
  await credentialsRepositories.Insert({
    ...credential,
    password: encryptedPassword,
  });
  return;
}

export default { createAndVerifyNewUser };

import wifiRepositories from "../repositories/wifiRepositories.js";
import { WifiType } from "../types/wifiTypes.js";
import Cryptr from "cryptr";
import { notFoundError, unauthorizedError } from "../utils/errorUtils.js";

const cryptr = new Cryptr(process.env.CRYPTR_KEY);

async function createNew(wifi: WifiType) {
  const encryptedPassword = cryptr.encrypt(wifi.password);
  await wifiRepositories.Insert({
    ...wifi,
    password: encryptedPassword,
  });
  return;
}

async function SearchAllByUser(userId: number) {
  const wifi = await wifiRepositories.FindByUserId(userId);
  const wifisDecrypted = [];
  wifi.map((i) =>
    wifisDecrypted.push({ ...i, password: cryptr.decrypt(i.password) })
  );
  return wifisDecrypted;
}

async function SearchByIdAndCompareUser(userId: number, id: number) {
  const wifiExists = await wifiRepositories.FindById(id);
  if (!wifiExists) throw notFoundError("Not found");
  if (wifiExists.userId !== userId)
    throw unauthorizedError("You are not Owner");

  const decryptedPassword = cryptr.decrypt(wifiExists.password);
  const wifiDecrypt = {
    ...wifiExists,
    password: decryptedPassword,
  };
  return wifiDecrypt;
}

async function DeleteByIdAndCompareUser(id: number, userId: number) {
  const wifi = await wifiRepositories.FindById(id);
  if (!wifi) throw notFoundError("Not found");
  if (wifi.userId !== userId) throw unauthorizedError("You are not Owner");
  await wifiRepositories.DeleteById(id);
  return;
}

export default {
  createNew,
  SearchByIdAndCompareUser,
  SearchAllByUser,
  DeleteByIdAndCompareUser,
};

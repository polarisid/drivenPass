import { prisma } from "../database.js";
import { WifiType } from "../types/wifiTypes.js";

async function Insert(wifi: WifiType) {
  const result = await prisma.wifi.create({
    data: wifi,
  });
  return result;
}

async function FindByUserId(userId: number) {
  const result = await prisma.wifi.findMany({
    where: { userId },
  });
  return result;
}

async function FindById(id: number) {
  const result = await prisma.wifi.findUnique({
    where: { id },
  });
  return result;
}

async function DeleteById(id: number) {
  const result = await prisma.wifi.delete({
    where: { id },
  });
  return result;
}

export default {
  Insert,
  FindByUserId,
  FindById,
  DeleteById,
};

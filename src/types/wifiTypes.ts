import { wifi } from "@prisma/client";

type WifiType = Omit<wifi, "id">;

export { WifiType };

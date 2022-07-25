import { credentials } from "@prisma/client";

type CredentialType = Omit<credentials, "id">;

export { CredentialType };

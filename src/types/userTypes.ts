import { users } from "@prisma/client";

type UserSignupType = Omit<users, "id">;
type UserSigninType = Omit<users, "id" | "name">;

export { UserSignupType, UserSigninType };

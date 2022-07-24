import userRepositories from "../repositories/userRepositories.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserSignupType, UserSigninType } from "../types/userTypes.js";
import {
  conflictError,
  notFoundError,
  unauthorizedError,
} from "../utils/errorUtils.js";

async function createAndVerifyNewUser(user: UserSignupType) {
  const userExists = await userRepositories.FindByEmail(user.email);
  if (userExists) throw conflictError("Email already exists in database");
  const hashPassword = await bcrypt.hash(user.password, 10);
  await userRepositories.Insert({
    ...user,
    password: hashPassword,
  });
  return;
}

async function authenticateUser(user: UserSigninType) {
  const userExists = await userRepositories.FindByEmail(user.email);
  if (!userExists) throw notFoundError("Email not in database");
  const validatePassword = await bcrypt.compare(
    user.password,
    userExists.password
  );
  if (!validatePassword) throw unauthorizedError("Incorrect password");
  const token = jwt.sign(
    {
      userId: userExists.id,
      name: userExists.name,
    },
    process.env.JWT_SECRET
  );
  console.log(process.env.JWT_SECRET);
  return token;
}

async function findUserById(id: number) {
  const user = await userRepositories.FindById(id);
  return user;
}
export default { createAndVerifyNewUser, authenticateUser, findUserById };

import { hash, compare, genSaltSync } from "bcryptjs";

const saltLevel = genSaltSync(12);

export const hashPassword = async (password: string) => {
  return await hash(password, saltLevel);
};

export const comparePasswords = async (
  password: string,
  storedPassword: string
) => {
  return await compare(password, storedPassword);
};

import * as bcrypt from "bcrypt";

const SALT = 12;

export async function passwordEncryption(password: string) {
  return await bcrypt.hash(password, SALT);
}
export async function passwordCompare(enterPassword: string, userPassword: string) {
  return await bcrypt.compare(enterPassword, userPassword);
}

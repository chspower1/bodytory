import * as bcrypt from "bcrypt";

const SALT = 12;

export function passwordEncryption(password: string) {
  return bcrypt.hash(password, SALT);
}
export function passwordCompare(enterPassword: string, userPassword: string) {
  return bcrypt.compare(enterPassword, userPassword);
}

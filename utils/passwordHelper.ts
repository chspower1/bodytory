import * as bcrypt from "bcrypt";

const SALT = 12;
const PasswordHelper = {
  async passwordEncryption(password: string) {
    return await bcrypt.hash(password, SALT);
  },
  async passwordCompare(enterPassword: string, userPassword: string) {
    return await bcrypt.compare(enterPassword, userPassword);
  },
};

export default PasswordHelper;

import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import client from "utils/server/client";
import { passwordCompare, passwordEncryption } from "utils/server/passwordHelper";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { password, newPassword } = req.body;
  const { user } = req.session;
  if (!user) return res.status(401).send("회원 정보를 확인해주세요");
  const foundUser = await client.user.findFirst({
    where: {
      id: user.id,
    },
  });
  if (!foundUser) {
    return res.status(401).send("현재 비밀번호를 적어주세요");
  } else {
    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password!);
    if (!isPasswordCorrect) {
      return res.status(401).send("현재 비밀번호를 적어주세요");
    } else {
      const hashedPassword = await passwordEncryption(newPassword);
      await client.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: hashedPassword,
        },
      });
      return res.status(204).end();
    }
  }
}
export default withApiSession(
  withHandler({
    methods: ["PUT"],
    handler,
  }),
);

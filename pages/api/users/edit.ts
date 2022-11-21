import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import client from "@libs/server/client";
import { passwordCompare, passwordEncryption } from "utils/passwordHelper";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { password, newPassword } = req.body;
  const { user } = req.session;
  const foundUser = await client.user.findFirst({
    where: {
      id: user?.id,
    },
  });
  if (foundUser) {
    const isPasswordCorrect = await passwordCompare(password, foundUser?.password!);
    if (isPasswordCorrect) {
      const hashedPassword = await passwordEncryption(newPassword);
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          password: hashedPassword,
        },
      });
      return res.status(204).end();
    } else {
      return res.status(401).send("현재 비밀번호를 적어주세요");
    }
  } else {
    return res.status(401).send("현재 비밀번호를 적어주세요");
  }
}
export default withApiSession(
  withHandler({
    methods: ["PUT"],
    handler,
  }),
);

import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import client from "@libs/server/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { password, newPassword } = req.body;
  const { user } = req.session;
  const findUserPW = await client.user.findFirst({
    where: {
      id: user?.id,
    },
  });
  const isPasswordCorrect = await bcrypt.compare(password, findUserPW?.password!);
  if (isPasswordCorrect) {
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const data = await client.user.update({
      where: {
        id: user?.id,
      },
      data: {
        password: hashedPassword,
      },
    });
    return res.status(204);
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

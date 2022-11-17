import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import client from "@libs/server/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { password } = req.body;
  const { user } = req.session;
  const findUser = await client.user.findUnique({
    where: {
      id: user?.id,
    },
  });
  const isPasswordCorrect = await bcrypt.compare(password, findUser?.password!);
  if (isPasswordCorrect) {
    await client.user.delete({
      where: {
        id: user?.id,
      },
    });
    return res.json({ ok: true });
  } else {
    return res.status(401).send("현재 비밀번호를 적어주세요");
  }
}
export default withApiSession(
  withHandler({
    methods: ["DELETE"],
    handler,
  }),
);

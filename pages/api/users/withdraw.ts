import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
// import bcrypt from "bcrypt";
import { Prisma, PrismaClient } from "@prisma/client";
import client from "@libs/server/client";
// const client = new PrismaClient();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { password } = req.body;
  const { user } = req.session;
  const findUserPW = await client.user.findUnique({
    where: {
      id: user?.id,
    },
  });
  // const hashedPassword = await bcrypt.compare(password , findUserPW?.password);
  if (password === findUserPW?.password) {
    const data = await client.user.delete({
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

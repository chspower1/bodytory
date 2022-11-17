import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { enterEmail } = req.body;

  const foundEmail = await client.user.findFirst({
    where: {
      email: enterEmail,
    },
  });

  if (foundEmail) return res.status(400).send("중복된 이메일입니다");

  return res.status(200).send("사용가능 이메일");
}

export default withApiSession(withHandler({ methods: ["POST"], handler, isPrivate: false }));

import type { NextApiRequest, NextApiResponse } from "next";
import client from "utils/server/client";
import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { accountId }: { accountId: string } = req.body;

  const foundUser = await client.user.findFirst({
    where: {
      accountId,
    },
  });
  console.log(foundUser);
  if (!foundUser) return res.status(200).send("사용가능한 아이디입니다.");

  return res.status(401).send("중복된 아이디입니다");
}

export default withApiSession(withHandler({ methods: ["POST"], handler, isPrivate: false }));
import type { NextApiRequest, NextApiResponse } from "next";
import client from "utils/server/client";
import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  if (!user) return ;
  const foundUser = await client.user.findFirst({
    where: {
      id: user?.id,
    },
    select: {
      id: true,
      accountId: true,
      name: true,
      email: true,
      gender: true,
      birth: true,
      type: true,
      phone: true,
    },
  });

  return res.status(200).json(foundUser);
}

export default withApiSession(withHandler({ methods: ["GET"], handler, isPrivate: false }));

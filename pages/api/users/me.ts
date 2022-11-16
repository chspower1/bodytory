import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const curUser = await client.user.findFirst({
    where: {
      id: user?.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      gender: true,
      age: true,
      phone: true,
    },
  });
  return curUser;
}

export default withApiSession(withHandler({ methods: ["POST"], handler, isPrivate: false }));

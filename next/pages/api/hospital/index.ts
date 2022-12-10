import type { NextApiRequest, NextApiResponse } from "next";
import client from "utils/server/client";
import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";


async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  if (!user) return res.status(401).send("회원 정보를 확인해주세요");
  const foundUser = await client.hospitalToUser.findMany({
    where: {
      hospitalId: user.id,
    },
    select: {
      id: true,
      user: true,
      shared: true,
    },
  });

  return res.status(200).json(foundUser);
}


export default withApiSession(withHandler({ methods: ["GET"], handler, isPrivate: false }));

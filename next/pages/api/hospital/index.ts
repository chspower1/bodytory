import type { NextApiRequest, NextApiResponse } from "next";
import client from "utils/server/client";
import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  if (!user) return ;
  console.log(user.id)
  const foundUser = await client.hospitalToUser.findMany({
    where: {
      hospitalId: user.id
    },
    select:{
      user : true,
      shared: true
    }
  });

  return res.status(200).json(foundUser);
}

export default withApiSession(withHandler({ methods: ["GET"], handler, isPrivate: false }));

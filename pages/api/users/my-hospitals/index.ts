import type { NextApiRequest, NextApiResponse } from "next";
import client from "utils/server/client";
import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  if (!user) return res.status(400).end();
  if (req.method === "GET") {
    const data = await client.user.findFirst({
      where: {
        id: user?.id,
      },
      select: {
        hospitals: true,
      },
    });
    return res.status(200).json(data?.hospitals);
  }
  await client.hospital.update({
    where: {
      id: 1,
    },
    data: {
      users: {
        connect: {
          id: 10,
        },
      },
    },
  });
}

export default withApiSession(withHandler({ methods: ["GET"], handler, isPrivate: false }));

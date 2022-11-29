import type { NextApiRequest, NextApiResponse } from "next";
import client from "utils/server/client";
import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  if (!user) return res.status(400).end();
  const data = await client.user.findFirst({
    where: {
      id: user?.id,
    },
    select: {
      hospitals: {
        include: {
          medicalDepartments: true,
        },
      },
    },
  });

  return res.status(200).json(data?.hospitals);
}

export default withApiSession(withHandler({ methods: ["GET"], handler, isPrivate: false }));

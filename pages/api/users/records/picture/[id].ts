import type { NextApiRequest, NextApiResponse } from "next";
import client from "utils/server/client";
import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  await client.recordImage.delete({
    where: {
      id: Number(id),
    },
  });
  res.status(200).end();
}
export default withApiSession(withHandler({ methods: ["DELETE"], handler }));

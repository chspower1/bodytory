import type { NextApiRequest, NextApiResponse } from "next";
import client from "utils/server/client";
import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  return res.status(200);
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));

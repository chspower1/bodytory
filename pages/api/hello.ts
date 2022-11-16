import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  res.status(200).json({ name: "John Doe" });
}

export default withApiSession(withHandler({ methods: ["GET"] }, handler));

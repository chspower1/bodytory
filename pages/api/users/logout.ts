import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  req.session.destroy();
  return res.status(204);
}
export default withApiSession(withHandler({ methods: ["DELETE"], handler }));

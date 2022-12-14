import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.session) return res.status(403).send("토큰을 확인해주세요");
  req.session.destroy();
  return res.status(204).end();
};
export default withApiSession(withHandler({ methods: ["DELETE"], handler }));

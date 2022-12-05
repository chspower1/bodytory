import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";
import client from "utils/server/client";
import { PrismaClient } from "@prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") return await checkSharedHospital(req, res);
};

async function checkSharedHospital(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { id } = req.query;

  return res.status(200).json({});
}

export default withApiSession(withHandler({ methods: ["POST", "GET", "PUT", "DELETE"], handler }));

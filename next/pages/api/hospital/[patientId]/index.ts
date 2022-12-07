import type { NextApiRequest, NextApiResponse } from "next";
import client from "utils/server/client";
import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { patientId } = req.query;
  if (!patientId) return ;
  const foundPatient = await client.user.findFirst({
    where: {
      id: Number(patientId)
    },
    select:{
      name:true,
      gender:true,
      birth: true
    }
  });

  return res.status(200).json(foundPatient);
}

export default withApiSession(withHandler({ methods: ["GET"], handler, isPrivate: false }));

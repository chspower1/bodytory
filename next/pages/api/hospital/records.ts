import type { NextApiRequest, NextApiResponse } from "next";
import client from "utils/server/client";
import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { patientId , position, description, diagnosis, prescription, createAt  } = req.body;
  const { user } = req.session;

  if (!user) return res.status(401).end() ;

  await client.record.create({
    data: {
      type: "hospital",
      position,
      description,
      diagnosis,
      prescription,
      hospitalId : user.id,
      userId: patientId,
      createAt
    },
  });

  return res.status(200).end();
}

export default withApiSession(withHandler({ methods: ["POST"], handler, isPrivate: false }));

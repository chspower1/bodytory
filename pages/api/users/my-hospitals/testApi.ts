import type { NextApiRequest, NextApiResponse } from "next";
import client from "utils/server/client";
import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {

  
  if (req.method === "GET") return await findHospital(req, res);

  // if (req.method === "DELETE") return await deleteHospital(req, res);
}


async function findHospital(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body;
  const { user } = req.session;
  if (!user) return res.status(401).send("회원 정보를 확인해주세요");
  const data = await client.hospital.findFirst({
    where: {
      id : 1
    },
    select:{
      user: true
    }
  });
  return res.status(200).json( data?.user );
}

/* async function deleteHospital(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body;
  await client.user.delete({
    
  });
  return res.status(200).end();
} */

export default withApiSession(withHandler({ methods: ["POST", "GET", "PUT", "DELETE"], handler }));

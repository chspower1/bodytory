import type { NextApiRequest, NextApiResponse } from "next";
import client from "utils/server/client";
import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";
export interface HospitalsForMap {
  name?: string;
  x: number | null;
  y: number | null;
}
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  if (!user) return res.status(400).end();
  if (req.method === "POST") {
    const { x, y } = req.body;
    const hospitals: HospitalsForMap[] = await client.hospital.findMany({
      where: {
        x: {
          lt: x + 0.000001,
          gt: x - 0.000001,
        },
        y: {
          lt: y + 0.000001,
          gt: y - 0.000001,
        },
      },
      select: {
        name: true,
        x: true,
        y: true,
      },
      take:
    });
    console.log(hospitals, x, y);
    return res.status(200).json({ hospitals });
  }
}

export default withApiSession(withHandler({ methods: ["POST"], handler, isPrivate: false }));

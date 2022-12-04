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
    const { longitude, latitude } = req.body;
    const hospitals: HospitalsForMap[] = await client.hospital.findMany({
      where: {
        x: {
          gte: longitude - 0.005,
          lte: longitude + 0.005,
        },

        y: {
          gte: latitude - 0.005,
          lte: latitude + 0.005,
        },
      },
      select: {
        id: true,
        name: true,
        x: true,
        y: true,
        address: true,
        homepage: true,
        medicalDepartments: {
          select: {
            medicalDepartment: {
              select: {
                department: true,
              },
            },
          },
        },
      },
      take: 100,
    });
    console.log(hospitals, hospitals.length, longitude, latitude);
    return res.status(200).json({ hospitals });
  }
}

export default withApiSession(withHandler({ methods: ["POST"], handler, isPrivate: false }));

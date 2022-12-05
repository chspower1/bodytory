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
  if (req.method === "GET") {
    const { longitude: lat, latitude: lng } = req.query;
    const [latitude, longitude] = [parseFloat(lat as string), parseFloat(lng as string)];
    console.log(longitude, latitude);
    const hospitals: HospitalsForMap[] = await client.hospital.findMany({
      where: {
        x: {
          gte: latitude - 0.005,
          lte: latitude + 0.005,
        },

        y: {
          gte: longitude - 0.005,
          lte: longitude + 0.005,
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
    console.log("map 요청");
    return res.status(200).json({ hospitals });
  }
}

export default withApiSession(withHandler({ methods: ["GET"], handler, isPrivate: false }));

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
    const {
      latitude: lat,
      longitude: lng,
      minLongitude: minLng,
      minLatitude: minLat,
      maxLongitude: maxLng,
      maxLatitude: maxLat,
    } = req.query;

    const [latitude, longitude, minLatitude, minLongitude, maxLatitude, maxLongitude] = [
      parseFloat(lat as string),
      parseFloat(lng as string),
      parseFloat(minLat as string),
      parseFloat(minLng as string),
      parseFloat(maxLat as string),
      parseFloat(maxLng as string),
    ];
    const initialValidate = latitude && longitude;
    const updateValidate = minLatitude && minLongitude && maxLatitude && maxLongitude;
    console.log(latitude, longitude, minLatitude, minLongitude, maxLatitude, maxLongitude);
    if (initialValidate) {
      const myHospitals: HospitalsForMap[] = await client.hospital.findMany({
        where: {
          y: {
            gte: latitude - 0.005,
            lte: latitude + 0.005,
          },
          x: {
            gte: longitude - 0.005,
            lte: longitude + 0.005,
          },
          NOT: {
            users: {
              none: {
                userId: user.id,
              },
            },
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
      const notMyHospitals: HospitalsForMap[] = await client.hospital.findMany({
        where: {
          y: {
            gte: latitude - 0.005,
            lte: latitude + 0.005,
          },
          x: {
            gte: longitude - 0.005,
            lte: longitude + 0.005,
          },
          NOT: {
            users: {
              some: {
                userId: user.id,
              },
            },
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
      const hospitals = [
        ...myHospitals.map(hospital => ({ ...hospital, my: true })),
        ...notMyHospitals.map(hospital => ({ ...hospital, my: false })),
      ];
      console.log("initial요청", hospitals.length);
      return res.status(200).json(hospitals);
    } else if (updateValidate) {
      const myHospitals: HospitalsForMap[] = await client.hospital.findMany({
        where: {
          y: {
            gte: minLatitude,
            lte: maxLatitude,
          },
          x: {
            gte: minLongitude,
            lte: maxLongitude,
          },
          NOT: {
            users: {
              none: {
                userId: user.id,
              },
            },
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
      const notMyHospitals: HospitalsForMap[] = await client.hospital.findMany({
        where: {
          y: {
            gte: minLatitude,
            lte: maxLatitude,
          },
          x: {
            gte: minLongitude,
            lte: maxLongitude,
          },
          NOT: {
            users: {
              some: {
                userId: user.id,
              },
            },
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
      const hospitals = [
        ...myHospitals.map(hospital => ({ ...hospital, my: true })),
        ...notMyHospitals.map(hospital => ({ ...hospital, my: false })),
      ];
      console.log("update요청", hospitals.length);
      return res.status(200).json(hospitals);
    }
  }
}

export default withApiSession(withHandler({ methods: ["GET"], handler, isPrivate: false }));

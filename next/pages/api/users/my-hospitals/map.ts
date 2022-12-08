import type { NextApiRequest, NextApiResponse } from "next";
import client from "utils/server/client";
import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";
export interface HospitalsForMap {
  name?: string;
  x: number | null;
  y: number | null;
}
interface GetHospitals {
  latitude?: number;
  longitude?: number;
  isMyHospital: boolean;
  method: "GET" | "POST";
  minLatitude?: number;
  minLongitude?: number;
  maxLatitude?: number;
  maxLongitude?: number;
  user: { id: number };
}
const getHospitals = async ({
  latitude,
  longitude,
  isMyHospital,
  method,
  minLatitude,
  minLongitude,
  maxLatitude,
  maxLongitude,
  user,
}: GetHospitals): Promise<HospitalsForMap[]> => {
  const hospitals = await client.hospital.findMany({
    where: {
      x: {
        gte: method === "GET" ? latitude! - 0.005 : minLatitude!,
        lte: method === "GET" ? latitude! + 0.005 : maxLatitude!,
      },
      y: {
        gte: method === "GET" ? longitude! - 0.005 : minLongitude!,
        lte: method === "GET" ? longitude! + 0.005 : maxLongitude!,
      },
      NOT: {
        users: isMyHospital
          ? {
              none: {
                userId: user.id,
              },
            }
          : {
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
  return hospitals;
};
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  if (!user) return res.status(400).end();

  if (req.method === "GET") {
    const { longitude: lat, latitude: lng } = req.query;
    const [latitude, longitude] = [parseFloat(lat as string), parseFloat(lng as string)];
    console.log(longitude, latitude);
    const getHospitalsProps = { latitude, longitude, method: "GET" as "GET", user };
    const myHospitals = await getHospitals({ ...getHospitalsProps, isMyHospital: true });
    const notMyHospitals = await getHospitals({ ...getHospitalsProps, isMyHospital: false });
    const hospitals = [
      ...myHospitals.map(hospital => ({ ...hospital, my: true })),
      ...notMyHospitals.map(hospital => ({ ...hospital, my: false })),
    ];
    console.log("inital 요청", hospitals.length);
    return res.status(200).json(hospitals);
  }
  if (req.method === "POST") {
    const { minLatitude, minLongitude, maxLatitude, maxLongitude } = req.body;
    const updateValidate = minLatitude && minLongitude && maxLatitude && maxLongitude;
    const getHospitalsProps = {
      minLatitude,
      minLongitude,
      maxLatitude,
      maxLongitude,
      method: "POST" as "POST",
      user,
    };
    console.log(minLatitude, minLongitude, maxLatitude, maxLongitude);
    if (updateValidate) {
      const myHospitals = await getHospitals({ ...getHospitalsProps, isMyHospital: true });
      const notMyHospitals = await getHospitals({ ...getHospitalsProps, isMyHospital: false });
      const hospitals = [
        ...myHospitals.map(hospital => ({ ...hospital, my: true })),
        ...notMyHospitals.map(hospital => ({ ...hospital, my: false })),
      ];
      console.log("update요청", hospitals.length);
      return res.status(200).json(hospitals);
    } else return res.status(401).end();
  }
}

export default withApiSession(withHandler({ methods: ["GET", "POST"], handler, isPrivate: false }));

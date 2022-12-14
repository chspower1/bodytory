import type { NextApiRequest, NextApiResponse } from "next";
import client from "utils/server/client";
import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { dash } = req.query;
  if (!dash) return res.status(401).send("api 주소가 잘못되었습니다");
  if (dash === "aMonth") return await aMonthFn(req, res);
  if (dash === "threeMonth") return await threeMonthFn(req, res);
};

async function aMonthFn(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;

  if (!user) return res.status(401).send("회원 정보를 확인해주세요");

  const now = new Date();
  let aMonthAgo = new Date();
  aMonthAgo.setMonth(now.getMonth() - 1);

  const aMonthData = await client.record.findMany({
    where: {
      type: "user",
      userId: user.id,
      createAt: {
        gte: aMonthAgo,
      },
    },
  });
  if (aMonthData.length === 0) return res.status(200).json({ mostInAMonth: [], mostThreeDepartment: [] });

  const departMentName = await client.medicalDepartment.findMany({});

  const dataReduce = aMonthData.reduce((total: any, current: any) => {
    if (!total[current.position]) {
      total[current.position] = 1;
    } else if (current.position in total) {
      total[current.position] += 1;
    }
    return total;
  }, {});
  const mostInAMonth: string[] = [];
  const mostInAMonthData = Object.entries(dataReduce).sort(([, a]: any, [, b]: any) => (a <= b ? 1 : -1));
  mostInAMonthData.map(ele => {
    if (mostInAMonthData[0][1] === ele[1]) {
      mostInAMonth.push(ele[0]);
    }
  });

  let mostThreeDepartmentObj = {};

  aMonthData.map(({ recommendDepartments }) => {
    if (recommendDepartments) {
      return recommendDepartments.split(",").reduce((total: any, current: any) => {
        if (!total[current]) {
          total[current] = 1;
        } else if (current in total) {
          total[current] += 1;
        }
        return total;
      }, mostThreeDepartmentObj);
    }
  });

  const mostThreeDepartment = Object.entries(mostThreeDepartmentObj)
    .sort(([, a]: any, [, b]: any) => b - a)
    .slice(0, 3)
    .map(ele => {
      return ele[0];
    });

  departMentName.map(ele => {
    if (mostThreeDepartment.includes(`${ele.id}`)) {
      mostThreeDepartment.splice(mostThreeDepartment.indexOf(`${ele.id}`), 1, `${ele.department}`);
    }
  });

  return res.status(200).json({ mostInAMonth, mostThreeDepartment });
}

async function threeMonthFn(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;

  if (!user) return res.status(401).send("회원 정보를 확인해주세요");

  const now = new Date();
  let threeMonthAgo = new Date();
  threeMonthAgo.setMonth(now.getMonth() - 3);

  let hospitalTemporaryStorage = {};
  let userTemporaryStorage = {};

  let result: { position: string; hospitalLength?: any; userLength?: any }[] = [];

  const reduceFn = (data: any[], storage: {}) => {
    data.reduce((total: any, current: any) => {
      if (!total[current.position]) {
        total[current.position] = 1;
      } else if (current.position in total) {
        total[current.position] += 1;
      }
      return total;
    }, storage);
  };
  const threeMonthUser = await client.record.findMany({
    where: {
      userId: user.id,
      type: "user",
      createAt: {
        gte: threeMonthAgo,
      },
    },
  });

  if (threeMonthUser.length === 0) return res.status(200).json({ result: [] });

  const threeMonthHospital = await client.record.findMany({
    where: {
      userId: user.id,
      type: "hospital",
      createAt: {
        gte: threeMonthAgo,
      },
    },
  });
  reduceFn(threeMonthUser, userTemporaryStorage);

  Object.entries(userTemporaryStorage).map(ele => {
    result.push({ position: ele[0], userLength: ele[1] });
  });

  reduceFn(threeMonthHospital, hospitalTemporaryStorage);

  Object.entries(hospitalTemporaryStorage).forEach(elem => {
    if (!result.some(record => record.position === elem[0])) {
      return result.push({ position: elem[0], hospitalLength: elem[1] });
    }

    result.map(record => {
      if (record.position === elem[0]) {
        record["hospitalLength"] = elem[1];
      }
    });
  });

  return res.status(200).json(result);
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));

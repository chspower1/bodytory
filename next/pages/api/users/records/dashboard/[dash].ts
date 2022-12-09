import type { NextApiRequest, NextApiResponse } from "next";
import client from "utils/server/client";
import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { dash } = req.query;
  if(!dash) return res.status(401).send("api 주소가 잘못되었습니다");
  if (dash === "aMonth") return await aMonthFn(req, res);
  if (dash === "threeMonth") return await threeMonthFn(req, res);
  if (dash === "toryRecommen") return await toryRecommen(req, res);
}

async function aMonthFn(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  if (!user) return res.status(401).send("회원 정보를 확인해주세요");
  const now = new Date();
  let aMonthAgo = new Date();
  aMonthAgo.setMonth(now.getMonth() - 1);
  const aMonthData = await client.record.findMany({
    where: {
      type:"user",
      userId: user.id,
      type: "user",
      createAt: {
        gte: aMonthAgo,
      },
    },
  });
  if(aMonthData.length === 0) return;
  const departMentName = await client.medicalDepartment.findMany({});

  const dataReduce = aMonthData.reduce((total: any, current: any) => {
    if (!total[current.position]) {
      total[current.position] = 1;
    } else if (current.position in total) {
      total[current.position] += 1;
    }
    return total;
  }, {});
  const mostInAMonth = Object.entries(dataReduce).sort(([, a]: any, [, b]: any) => (a <= b ? 1 : -1))[0][0];

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
async function toryRecommen(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  if (!user) return res.status(401).send("회원 정보를 확인해주세요");
  const aMonthData = await client.record.findMany({
    where: {
      type:"user",
      userId: user.id,
    },
  });
  if(aMonthData.length === 0) return;
  const departMentName = await client.medicalDepartment.findMany({});
  console.log({aMonthData})
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
  console.log({mostThreeDepartment})
  return res.status(200).json(mostThreeDepartment);
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

  const threeMonthHospital = await client.record.findMany({
    where: {
      userId: user.id,
      type: "hospital",
      createAt: {
        gte: threeMonthAgo,
      },
    },
  });
  if(threeMonthHospital.length === 0) return;

  reduceFn(threeMonthHospital, hospitalTemporaryStorage);

  Object.entries(hospitalTemporaryStorage).map(ele => {
    result.push({ position: ele[0], hospitalLength: ele[1] });
  });

  const threeMonthUser = await client.record.findMany({
    where: {
      userId: user.id,
      type: "user",
      createAt: {
        gte: threeMonthAgo,
      },
    },
  });

  reduceFn(threeMonthUser, userTemporaryStorage);

  Object.entries(userTemporaryStorage).forEach(elem => {
    if (!result.some(record => record.position === elem[0])) {
      return result.push({ position: elem[0], userLength: elem[1] });
    }

    result.forEach(record => {
      if (record.position === elem[0]) {
        record["userLength"] = elem[1];
      }
    });
  });


  return res.status(200).json(result);
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));

import type { NextApiRequest, NextApiResponse } from "next";
import client from "utils/server/client";
import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";
import { Position } from "@prisma/client";
import axios from "axios";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { position } = req.query;
  const { user } = req.session;
  if (!user) return res.status(401).send("회원 정보를 확인해주세요");
  if (!position) return res.status(401).send("api 주소를 확인해주세요");
  const records = await client.record.findMany({
    where: {
      type: "user",
      userId: user.id,
      position: position as Position,
    },
  });
  if (records.length === 0) return res.status(200).json(["empty"]);
  const departMentName = await client.medicalDepartment.findMany({});

  let mostThreeDepartmentObj = {};
  records.map(({ recommendDepartments }) => {
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
  const result: string[] = records.map((ele: { description: string }) => {
    return ele.description;
  });
  const postApi = await axios.post(`${process.env.FLASK_API}/api/keywords`, {
    headers: {
      "Content-Type": "application/json",
    },
    sentences: result,
  });
  departMentName.map(ele => {
    if (mostThreeDepartment.includes(`${ele.id}`)) {
      mostThreeDepartment.splice(mostThreeDepartment.indexOf(`${ele.id}`), 1, `${ele.department}`);
    }
  });
  return res.status(200).json({ mostThreeDepartment, keywords: postApi.data.keywords_result });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));

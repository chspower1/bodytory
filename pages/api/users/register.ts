import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import * as bcrypt from "bcrypt";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { password, email, name, age, gender } = req.body;
  if (await isduplicateEmail(email)) {
    res.status(404).send("회원가입 실패");
  }
  // 찾은다음 없으면 만들고 있으면 있는 유저 리턴해주는 걸로, 있는 유저면 오류가남
  await client.user.create({
    data: {
      name,
      age: Number(age),
      gender,
      email,
      password: await bcrypt.hash(password, 12),
    },
  });
  res.status(200).json({ ok: true });
}

function isCorrectEmail(email: string) {
  const regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  const result = regex.test(email);

  return result;
}

async function isduplicateEmail(email: string) {
  const foundEmail = await client.user.findFirst({
    where: {
      email: email,
    },
  });

  return foundEmail ? true : false;
}

export default withApiSession(withHandler({ methods: ["POST"], handler, isPrivate: false }));

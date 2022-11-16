import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { password, email, name, age, gender } = req.body;

  try {
    // isCorrectEmail(email);
    // await isduplicateEmail(email);
    await client.user.create({
      data: {
        name,
        age: Number(age),
        gender,
        email,
        password,
      },
    });
    res.status(200);
  } catch (error) {
    res.status(500);
    console.log(error);
    throw new Error("회원가입 실패");
  }
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

export default handler;

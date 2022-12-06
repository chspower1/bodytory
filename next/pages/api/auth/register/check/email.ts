import type { NextApiRequest, NextApiResponse } from "next";
import client from "utils/server/client";
import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";
import { HelpForm } from "pages/auth/help/find-pw";
import { UserType } from "@prisma/client";
import { getPayload } from "@utils/client/payload";
import sendMail from "@utils/server/sendMail";

const createEmailCheckToken = async (email: string) => {
  const payload = getPayload();

  await client.certification.deleteMany({
    where: { email },
  });

  await client.certification.create({
    data: {
      number: payload,
      email,
    },
  });
  sendMail(email, payload, "이메일 인증");
  console.log(payload);
};

const checkEmail = async (email: string, type: UserType) => {
  const user = await client.user.findFirst({
    where: {
      type,
      email,
    },
  });

  if (user) throw new Error("중복된 이메일입니다");

  return user;
};

const checkToken = async (email: string, token: string) => {
  const deleteToken = await client.certification.deleteMany({
    where: {
      number: token,
      email,
    },
  });

  if (deleteToken.count <= 0) throw new Error("인증번호를 확인해주세요");
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, token, type }: HelpForm = req.body;
  if (!email) return res.status(400).end();
  console.log("test", email, token);
  if (!token) {
    try {
      await checkEmail(email, type);
      await createEmailCheckToken(email);
      return res.status(200).json({ ok: true });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : (<Object>error).toString();
      return res.status(403).send(errorMessage);
    }
  }

  if (token) {
    try {
      await checkToken(email, token);
      res.status(200).json({ ok: true });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : (<Object>error).toString();
      res.status(403).send(errorMessage);
    }
  }
}

export default withApiSession(withHandler({ methods: ["POST"], handler, isPrivate: false }));

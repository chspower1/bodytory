import type { NextApiRequest, NextApiResponse } from "next";
import client from "utils/server/client";
import withHandler, { ResponseType } from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";
import smtpTransport from "@utils/server/email";
import { HelpForm } from "pages/auth/help/find-pw";
import { UserType } from "@prisma/client";
import { getPayload } from "@utils/client/payload";

const createToken = async (email: string) => {
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
  // sendMail(email, payload);
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

const sendMail = (email: string, payload: string) => {
  const mailOptions = {
    from: process.env.MAIL_ID,
    to: email,
    subject: "이메일 인증",
    text: `인증코드 : ${payload}`,
  };
  smtpTransport.sendMail(mailOptions, (error, responses) => {
    if (error) {
      console.log(error);
      return null;
    } else {
      console.log(responses);
      return null;
    }
  });
  smtpTransport.close();
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, token, type }: HelpForm = req.body;
  if (!email) return res.status(400).end();
  console.log("test", email, token);
  if (!token) {
    try {
      await checkEmail(email, type);
      await createToken(email);
      res.status(200).json({ ok: true });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : (<Object>error).toString();
      res.status(403).send(errorMessage);
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

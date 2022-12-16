import type { NextApiRequest, NextApiResponse } from "next";
import client from "utils/server/client";
import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";
import { HelpForm } from "pages/auth/help/find-pw";
import sendMail from "@utils/server/sendMail";
import { createToken } from "@utils/server/createToken";

const haveUser = async (email: string) => {
  const user = await client.user.findFirst({
    where: {
      type: "origin",
      email,
    },
  });

  if (!user) throw new Error("이메일 확인 해주세요");

  return user;
};

const deleteToken = async (email: string, token: string) => {
  const findToken = await client.certification.deleteMany({
    where: { number: token, user: { email } },
  });

  if (findToken.count <= 0) throw new Error("인증번호를 확인해주세요");
};

const foundUser = async (email: string, token: string) => {
  const foundUser = await client.user.findFirst({
    where: {
      type: "origin",
      email,
    },
  });
  if (!foundUser) throw new Error("회원정보가 없습니다");

  await deleteToken(email, token);

  return foundUser;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  const { email, token }: HelpForm = req.body;
  if (!email) {
    return res.status(400).end();
  }

  if (!token) {
    try {
      const user = await haveUser(email);
      const payload = await createToken(user);
      sendMail(user.email, payload, "아이디 찾기");
      res.status(200).json({ ok: true });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : (<Object>error).toString();
      res.status(403).send(errorMessage);
    }
  }

  if (token) {
    try {
      const user = await foundUser(email, token);
      res.status(200).json({ ok: true, data: user?.accountId });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : (<Object>error).toString();
      res.status(403).send(errorMessage);
    }
  }
};

export default withApiSession(withHandler({ methods: ["POST"], handler, isPrivate: false }));

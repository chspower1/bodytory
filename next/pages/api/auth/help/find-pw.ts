import type { NextApiRequest, NextApiResponse } from "next";
import client from "utils/server/client";
import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";
import { HelpForm } from "pages/auth/help/find-pw";
import sendMail from "@utils/server/sendMail";
import { createToken } from "@utils/server/createToken";

const checkId = async (accountId: string) => {
  const foundUser = await client.user.findFirst({
    where: {
      accountId,
      type: "origin",
    },
  });

  if (!foundUser) throw new Error("아이디를 확인해주세요");

  return foundUser;
};

const checkToken = async (accountId: string, token: string) => {
  const findToken = await client.certification.deleteMany({
    where: {
      number: token,
      user: {
        accountId,
      },
    },
  });

  if (findToken.count <= 0) throw new Error("인증번호를 확인해주세요");
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token, accountId }: HelpForm = req.body;
  if (!accountId) return res.status(400).end();

  if (!token) {
    try {
      const user = await checkId(accountId);
      const payload = await createToken(user);
      sendMail(user.email, payload, "비밀번호 찾기");
      res.status(200).json({ email: user.email, accountId });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : (<Object>error).toString();
      res.status(403).send(errorMessage);
    }
  }

  if (token) {
    try {
      await checkToken(accountId, token);
      res.status(200).send({ ok: true });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : (<Object>error).toString();
      res.status(403).send(errorMessage);
    }
  }
}

export default withApiSession(withHandler({ methods: ["POST"], handler, isPrivate: false }));

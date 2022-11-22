import type { NextApiRequest, NextApiResponse } from "next";
import client from "utils/server/client";
import withHandler, { ResponseType } from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";
import { LoginForm } from "pages/auth/login";
import bcrypt from "bcrypt";
import { passwordCompare } from "utils/server/passwordHelper";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { type } = req.body;

  try {
    switch (type) {
      case "naver":
        await loginBySocial(req, res);
        break;
      case "kakao":
        await loginBySocial(req, res);
        break;
      case "origin":
      default:
        await loginByOrigin(req, res);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : (<Object>error).toString();
    return res.status(401).send(errorMessage);
  }
}

async function loginByOrigin(req: NextApiRequest, res: NextApiResponse) {
  const { accountId, password }: LoginForm = req.body;
  let foundUser = await client.user.findFirst({
    where: {
      accountId,
    },
  });
  if (!foundUser) {
    throw new Error("회원정보를 확인해주세요");
  }

  const isPasswordCorrect = await passwordCompare(password, foundUser.password!);
  if (!isPasswordCorrect) {
    throw new Error("회원정보를 확인해주세요");
  }

  req.session.user = {
    id: foundUser.id,
  };
  await req.session.save();
  return res.status(201).end();
}

async function loginBySocial(req: NextApiRequest, res: NextApiResponse) {
  const { accountId, email, phone, name, birth, gender, type } = req.body;
  const foundUser = await client.user.findFirst({
    where: {
      accountId: accountId + "",
      type,
    },
  });

  if (!foundUser) {
    return res.status(201).json({ isNew: true, type, accountId, email, phone, name, birth, gender });
  }

  req.session.user = {
    id: foundUser.id,
  };
  await req.session.save();
  return res.status(201).end();
}

export default withApiSession(withHandler({ methods: ["POST"], handler, isPrivate: false }));

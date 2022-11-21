import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { LoginForm } from "pages/auth/login";
import bcrypt from "bcrypt";
import { passwordCompare } from "utils/passwordHelper";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { type } = req.body;
  let foundUser;
  try {
    switch (type) {
      case "naver":
      case "kakao":
        foundUser = await loginBySocial(req, res);
        break;
      case "origin":
      default:
        foundUser = await loginByOrigin(req);
    }

    if (!foundUser) {
      throw new Error("회원정보를 확인해주세요");
    }

    req.session.user = {
      id: foundUser.id,
    };
    await req.session.save();

    return res.status(201).end();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : (<Object>error).toString();
    return res.status(401).send(errorMessage);
  }
}

async function loginByOrigin(req: NextApiRequest) {
  const { accountId, password }: LoginForm = req.body;
  const foundUser = await client.user.findFirst({
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

  return foundUser;
}

async function loginBySocial(req: NextApiRequest, res: NextApiResponse) {
  const { id, email, phone, name, birth, gender, type } = req.body;
  const foundUser = await client.user.findFirst({
    where: {
      accountId: id + "",
      type,
    },
  });

  if (!foundUser) {
    res.status(400).json({ type, id, email, phone, name, birth, gender });
  }

  return foundUser;
}

export default withApiSession(withHandler({ methods: ["POST"], handler, isPrivate: false }));

import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { LoginForm } from "pages/auth/login";
import bcrypt from "bcrypt";
import { passwordCompare } from "utils/passwordHelper";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { type } = req.body;
  if (type === "origin") {
    const { accountId, password }: LoginForm = req.body;
    const foundUser = await client.user.findFirst({
      where: {
        accountId,
      },
    });
    if (!foundUser) {
      return res.status(401).send("회원정보를 확인해주세요");
    } else {
      const isPasswordCorrect = await passwordCompare(password, foundUser.password!);
      if (isPasswordCorrect) {
        req.session.user = {
          id: foundUser.id,
        };
        await req.session.save();
        return res.status(201).end();
      }
    }
  }
  if (type === "naver" || "kakao") {
    console.log(req.body);
    const { id, email, phone, name, birth, gender } = req.body;
    const foundUser = await client.user.findFirst({
      where: {
        accountId: id + "",
        type,
      },
    });
    // 새로운 유저
    if (!foundUser) {
      return res.status(400).json({ type, id, email, phone, name, birth, gender });
    }
    // 존재하는 유저
    else {
      req.session.user = {
        id: foundUser.id,
      };
      await req.session.save();
      return res.status(201).end();
    }
  }
}

export default withApiSession(withHandler({ methods: ["POST"], handler, isPrivate: false }));

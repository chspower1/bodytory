import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { LoginForm } from "pages/auth/login";
import bcrypt from "bcrypt";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { type } = req.body;
  // 네이버 로그인
  if (type === "naver") {
    const { email, phone, name, birth, gender } = req.body;
    const foundUser = await client.user.findFirst({
      where: {
        email: email + "/naver",
        type: "naver",
      },
    });
    // 존재하는 유저
    if (foundUser) {
      req.session.user = {
        id: foundUser.id,
      };
      await req.session.save();
      return res.status(201).end();
    }
    // 새로운 유저
    else {
      const newUser = await client.user.create({
        data: {
          type: "naver",
          email: email + "/naver",
          phone,
          name,
          birth,
          gender,
          password: Math.floor(10000 + Math.random() * 1000000) + "",
        },
      });
      req.session.user = {
        id: newUser.id,
      };
      await req.session.save();
      return res.status(201).end();
    }
  }
  if (type === "origin") {
    const { email, password, autoLogin }: LoginForm = req.body;
    const foundUser = await client.user.findFirst({
      where: {
        email,
      },
    });
    if (foundUser) {
      const isPasswordCorrect = await bcrypt.compare(password, foundUser.password!);
      if (isPasswordCorrect) {
        req.session.user = {
          id: foundUser.id,
        };
        await req.session.save();
        return res.status(201).end();
      } else {
        return res.status(401).send("회원정보를 확인해주세요");
      }
    } else {
      return res.status(401).send("회원정보를 확인해주세요");
    }
  }
  if (type === "kakao") {
  }
}

export default withApiSession(withHandler({ methods: ["POST"], handler, isPrivate: false }));

import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import client from "@libs/server/client";
import { passwordCompare } from "utils/passwordHelper";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { password, type } = req.body;
  const { user } = req.session;
  if (!user) return res.status(401).send("회원 정보를 확인해주세요");
  const foundUser = await client.user.findUnique({
    where: {
      id: user?.id!,
    },
  });
  if (!foundUser) {
    return res.status(401).send("유저 정보가 없습니다.");
  }else{
    if(type === "origin"){
      const isPasswordCorrect = await passwordCompare(password, foundUser.password!);
      if (isPasswordCorrect) {
        await client.user.delete({
          where: {
            id: user?.id,
          },
        });
        return res.status(204).end();
      } else {
        return res.status(401).send("현재 비밀번호를 적어주세요");
      }
    } else if (type !== "origin") {
      await client.user.delete({
        where: {
          id: user?.id,
        },
      });
      return res.status(204).end();
    } else {
      return res.status(401).send("탈퇴 오류");
    }
  }
}
export default withApiSession(
  withHandler({
    methods: ["DELETE"],
    handler,
  }),
);

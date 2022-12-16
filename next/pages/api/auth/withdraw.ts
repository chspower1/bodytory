import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import client from "utils/server/client";
import { passwordCompare } from "utils/server/passwordHelper";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { password, type } = req.body;
  const { user } = req.session;

  if (!user) return res.status(401).send("회원 정보를 확인해주세요");

  if (type !== "origin") {
    await client.user.delete({
      where: {
        id: user?.id,
      },
    });
    return res.status(204).end();
  }

  const foundUser = await client.user.findUnique({
    where: {
      id: user?.id!,
    },
  });

  if (!foundUser) {
    return res.status(401).send("유저 정보가 없습니다.");
  }

  if (type === "origin") {
    const isPasswordCorrect = await passwordCompare(password, foundUser.password!);

    if (!isPasswordCorrect) {
      return res.status(401).send("현재 비밀번호를 적어주세요");
    }

    await client.user.delete({
      where: {
        id: user?.id,
      },
    });

    return res.status(204).end();
  }

  return res.status(401).send("탈퇴 오류");
};

export default withApiSession(
  withHandler({
    methods: ["DELETE"],
    handler,
  }),
);

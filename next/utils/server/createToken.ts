import { User } from "@prisma/client";
import { getPayload } from "@utils/client/payload";
import client from "utils/server/client";

export const createToken = async (user: User) => {
  const payload = getPayload();

  await client.certification.deleteMany({
    where: { user: { id: user.id } },
  });

  await client.certification.create({
    data: {
      number: payload,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });
  console.log("인증번호 : ", payload);
  return payload;
};

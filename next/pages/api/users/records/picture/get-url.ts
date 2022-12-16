import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const response = await (
    await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/images/v1/direct_upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CF_TOKEN}`,
      },
    })
  ).json();
  res.json({
    ...response.result,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  }),
);

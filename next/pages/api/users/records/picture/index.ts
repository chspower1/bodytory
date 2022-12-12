import type { NextApiRequest, NextApiResponse } from "next";
import client from "utils/server/client";
import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { url, recordId }: { url: string; recordId: number } = req.body;
    if (!(url && recordId)) return res.status(404).end();
    await client.recordImage.create({
      data: {
        url,
        record: {
          connect: {
            id: recordId,
          },
        },
      },
    });
    res.status(200).end();
  }
  if (req.method === "DELETE") {
    const { imageId }: { imageId: number } = req.body;
    if (!imageId) return res.status(404).end();
    await client.recordImage.delete({
      where: {
        id: imageId,
      },
    });
    res.status(200).end();
  }
}
export default withApiSession(withHandler({ methods: ["POST", "DELETE"], handler }));

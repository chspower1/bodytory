import type { NextApiRequest, NextApiResponse } from "next";
import client from "utils/server/client";
import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";
import multer from "multer";
import nextconnect from "next-connect";
import path from "path";
import { connect } from "http2";
import { requestToBodyStream } from "next/dist/server/body-streams";
import { parseConnectionUrl } from "nodemailer/lib/shared";
import { useRouter } from "next/router";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  await client.recordImage.delete({
    where: {
      id: Number(id),
    },
  });
  res.status(200).end();
}
export default withApiSession(withHandler({ methods: ["DELETE"], handler }));

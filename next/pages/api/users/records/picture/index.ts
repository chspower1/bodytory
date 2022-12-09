import type { NextApiRequest, NextApiResponse } from "next";
import client from "utils/server/client";
import multer from "multer";
import multerS3 from "multer-s3";
import nextconnect from "next-connect";
import { S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const upload = multer({
  storage: multerS3({
    s3: new S3Client({
      credentials: {
        accessKeyId: process.env.ACCESSKEYID as string,
        secretAccessKey: process.env.SECRETACCESSKET as string,
      },
      region: process.env.REGION,
    }),
    bucket: "toriai",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { filedName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `uploads/${uuidv4()}.${file.mimetype.split("/")[1]}`);
    },
  }),
});

const handler = nextconnect<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    res.status(500).end("something broke");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("not found");
  },
});

handler.post(upload.array("image"), async (req, res) => {
  const { recordId } = req.body;
  const files: any = req.files;

  const saveFiles = files.map(async (file: any) => {
    await addPicture(recordId, file.location);
  });

  await Promise.all(saveFiles);

  res.status(200).end();
});

export const config = {
  api: {
    bodyParser: false,
  },
};

async function addPicture(id: string, fileUrl: string) {
  const data = await client.record.findFirst({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
    },
  });
  await client.recordImage.create({
    data: {
      url: `${fileUrl}`,
      record: {
        connect: {
          id: data?.id!,
        },
      },
    },
  });
}

export default handler;

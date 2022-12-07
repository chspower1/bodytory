import type { NextApiRequest, NextApiResponse } from "next";
import client from "utils/server/client";
import multer from "multer";
import multerS3 from "multer-s3";
import nextconnect from "next-connect";
import { S3Client } from "@aws-sdk/client-s3";

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
      cb(null, `uploads/${Date.now()}_${file.originalname}`);
    },
  }),
});
// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, ".@public");
//   },
//   filename(req, file, cb) {
//     cb(null, file.fieldname + "-" + Date.now() + file.originalname);
//   },
// });

const handler = nextconnect<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    res.status(500).end("something broke");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("not found");
  },
});

// const upload = multer({ storage: storage });

handler.post(upload.array("image"), async (req, res) => {
  const { recordId } = req.body;
  const files: any = req.files;
  console.log(files);

  const saveFiles = files.map(async file => {
    await addPicture(recordId, file.location);
  });

  await Promise.all(saveFiles);

  res.status(200).end();
});

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
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

function saveImage() {}
async function updatePicture(req: NextApiRequest) {
  const { id, images } = req.body;
  await client.record.update({
    where: {
      id,
    },
    data: {
      images,
    },
  });
}

export default handler;

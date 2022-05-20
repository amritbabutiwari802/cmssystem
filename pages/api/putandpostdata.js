import multer from "multer";
import upoadservice from "../../functions/uploader";

export const config = {
  api: {
    bodyParser: false,
  },
};

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/gallery");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

export default async (req, res) => {
  console.log("hello");
  try {
    upload.array("file", 3)(req, {}, (err) => {
      // do error handling here
      // do something with the files here
      const files = req.files;
      const metadata = req.body.metadata;
      const data = req.body.data;
      upoadservice(metadata, files, data);
    });
  } catch (err) {
    res.status(200).json({ data: err });
  }
  res.status(200).send({});
};

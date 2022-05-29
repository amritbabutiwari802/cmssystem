import multer from "multer";
import upoadservice from "../../functions/uploader";

export const config = {
  api: {
    bodyParser: false,
  },
};

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

export default async function operation (req, res)  {
  try {
    upload.array();
    upload.array("file", 3)(req, {}, (err) => {
      // do error handling here
      // do something with the files here

      const files = req.files;
      const metadata = JSON.parse(
        JSON.parse(JSON.stringify(req.body.metadata))
      );
      const data = JSON.parse(JSON.parse(JSON.stringify(req.body.data)));
      console.log(typeof metadata);
      upoadservice(metadata, files, data);
    });
  } catch (err) {
    res.status(200).json({ data: err });
    res.end();
  }
  res.status(200).json({ ok: "sjdf" });
  res.end();
};

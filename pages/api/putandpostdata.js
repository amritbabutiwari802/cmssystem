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

export default async function operation(req, res) {
  console.log("staring")
  try {
  
    await upload.array("file", 3)(req, {}, async (err) => {
      // do error handling here
      // do something with the files here

      const files = req.files;
      const metadata = JSON.parse(
        JSON.parse(JSON.stringify(req.body)).metadata
      );
      const data = JSON.parse(JSON.parse(JSON.stringify(req.body)).data);

      await upoadservice(metadata, files, data, res);
    });
  } catch (err) {
    res.status(200).json({ data: err });
    res.end();
  }
}

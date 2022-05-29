import { updatesms } from "../../dbservice/socialmedia";

export default async function operation (req, res)  {
  console.log(req.headers);
  if (req.method != "POST" || req.headers.secret != "skljdfklsdjfkl") {
    res.status(500).json({ dsjkfk: "fjkgtj" });
    console.log("point");
    res.end();
    return;
  }
  try {
    // do error handling here
    // do something with the files here
    console.log(JSON.parse(JSON.stringify(req.body)));
    const data = JSON.parse(JSON.stringify(req.body.data));

    const result = updatesms(data);
    if (result.success) {
      res.status(200).json({ status: "ok" });
    } else {
      res.staus(500);
    }
    return;
  } catch (err) {
    console.log(err);
    res.status(500);
    return;
  }
};

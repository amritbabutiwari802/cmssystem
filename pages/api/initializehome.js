import { initiate } from "../../functions/initiate";

export default function handler(req, res) {
  try {
    initiate();
    res.status(200).json({ success: true });
    res.end;
  } catch (err) {
    console.log("initialize home " + err);
    res.status(200).json({ success: false });
  }
}

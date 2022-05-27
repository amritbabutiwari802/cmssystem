// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import globalinitiate from "../../functions/initiateglobal";
import imageinitiate from "../../functions/saveimages";

export default function handler(req, res) {
  imageinitiate(res);
}

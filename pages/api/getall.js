// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import globalinitiate from "../../functions/initiateglobal";
import imageinitiate, { getmedia } from "../../functions/saveimages";
import getall from "./../../functions/getall";

export default async function handler(req, res) {
  await getall(req, res);
}

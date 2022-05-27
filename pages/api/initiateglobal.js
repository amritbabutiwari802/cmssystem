// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import globalinitiate from "../../functions/initiateglobal";

export default function handler(req, res) {
  globalinitiate(res);
}

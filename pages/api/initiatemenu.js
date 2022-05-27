// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import initiate from "../../functions/initiatemenubar";

export default function handler(req, res) {
  initiate(res);
}

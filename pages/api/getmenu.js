import getmenu from "../../functions/getmenu";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const data = await getmenu();

  res.status(200).json(data);
  res.end();
}

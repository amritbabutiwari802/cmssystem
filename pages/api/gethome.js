import getHome from "../../functions/getHome";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const data = await getHome();
  console.log(data);
  res.status(200).json(data);
  res.end();
}

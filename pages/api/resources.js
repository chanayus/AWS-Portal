// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const fetch = require('node-fetch');
  const request = await fetch(`https://6bum1uds90.execute-api.ap-southeast-1.amazonaws.com/api/get-resources`)
  const dataJson = await request.json()
  res.json(dataJson)
}

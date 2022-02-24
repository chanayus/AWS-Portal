// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dotenv from 'dotenv'
dotenv.config()

export default async function handler(req, res) {
  const fetch = require('node-fetch');
  const request = await fetch(`${process.env.GET_RESOURCES_END_POINT}/get-ec2relation`)
  const dataJson = await request.json()
  res.json(dataJson.usedResources)
}

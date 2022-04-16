// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dotenv from "dotenv"
import client from "../../context/apollo-client"
import { gql } from "@apollo/client"
import { getToken } from "../../hooks/getToken"
dotenv.config()

export default async function handler(req, res) {
  try{
    const { data } = await client.query({
      query: gql`
        query{
          resourcesTagging {
            PaginationToken {
              ap_southeast_1
              us_east_1
            }
            us_east_1 {
              ResourceARN
              Tags {
                Key
                Value
              }
            }
            ap_southeast_1 {
              ResourceARN
              Tags {
                Key
                Value
              }
            }
          }
        }
      `,
      context: {
        headers: {
          authorization: `Bearer ${getToken(req)}`,
        },
      },
      fetchPolicy: "network-only"
    })
    const { resourcesTagging } = data
    const newResourcesTagging = {
      PaginationToken: {
        "us-east-1": resourcesTagging.PaginationToken.us_east_1,
        "ap-southeast-1": resourcesTagging.PaginationToken.ap_southeast_1
      },
      "us-east-1": resourcesTagging.us_east_1,
      "ap-southeast-1": resourcesTagging.ap_southeast_1
    }

    // const fetch = require("node-fetch")
    // const request = await fetch(`${process.env.GET_RESOURCES_END_POINT}/get-resources/`)
    // const dataJson = await request.json()
    res.json(newResourcesTagging)
  } catch (err){
    res.status(400).json(err)
  }
}

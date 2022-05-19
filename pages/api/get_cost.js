import client from "../../context/apollo-client"
import { gql } from "@apollo/client"

const handler = async (req, res) => {
  try {
    const { data } = await client.query({
      query: gql`
        query {
          netResourcesCost {
            resourceId
            netCost
            createdAt
            serviceType
            region
          }
        }
      `,
    })
    res.status(200).json(data)
  } catch (e) {
    res.status(400).json(err)
  }
}

export default handler

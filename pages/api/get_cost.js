import client from "../../context/apollo-client"
import { getToken } from "../../hooks/getToken"
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
            owner
            usage {
              usageType
              cost
              usageAmount
              usageDescription
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
    res.status(200).json(data)
  } catch (e) {
    res.status(400).json(e)
  }
}

export default handler

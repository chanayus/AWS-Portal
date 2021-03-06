import client from "../../context/apollo-client"
import { gql } from "@apollo/client"

const handler = async (req, res) => {
  try {
    const { data } = await client.query({
      query: gql`
        query {
          notification {
            owner {
              username
            }
            description
          }
        }
      `,
      fetchPolicy: "network-only"
    })
    res.status(200).json(data)
  } catch (e) {
    res.status(400).json(e)
  }
}

export default handler

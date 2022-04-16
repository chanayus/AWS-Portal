import client from "../../context/apollo-client"
import { gql } from "@apollo/client"

const handler = async (req, res) => {
  try {
    const { data } = await client.query({
      query: gql`
        query {
          IAMUsers {
            principalId
            username
            type
          }
        }
      `,
    })
    res.status(200).json(data)
  } catch (err) {
    res.status(400).json(err)
  }
}

export default handler

import client from "../../context/apollo-client"
import { gql } from "@apollo/client"
import { getToken } from "../../hooks/getToken"

const handler = async (req, res) => {
  const input = req.body.map((item) => ({ resourceARN: item.ResourceARN }))
  try {
    const { data } = await client.mutate({
      mutation: gql`
        mutation DeleteEC2Resources($input: [resourceARNInput]) {
          deleteEC2Resources(records: $input) {
            success {
              resourceARN
            }
            failure {
              resourceARN
              error
            }
          }
        }
      `,
      variables: { input },
      context: {
        headers: {
          authorization: `Bearer ${getToken(req)}`,
        },
      },
      fetchPolicy: "network-only",
    })

    res.status(200).json(data)
  } catch (err) {
    res.status(400).json(err)
  }
}

export default handler

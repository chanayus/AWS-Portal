import client from '../../context/apollo-client'
import { gql } from "@apollo/client";

const handler = async (req, res) => {
    console.log(req.body)
    try {
        const { data } = await client.query({
            query: gql`
                query{
                    IAMUsers{
                        principalId
                        username
                        type
                    }
                }
            `
        })

        res.status(200).json(data);
    } catch (e) {}
}

export default handler
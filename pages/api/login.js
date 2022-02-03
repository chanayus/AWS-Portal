import client from '../../context/apollo-client'
import { gql } from "@apollo/client";

const handler = async (req, res) => {
    const input = req.body
    try{
        const { data } = await client.mutate({
            mutation: gql`
                mutation($username: String!, $password: String!){
                    login(username: $username, password: $password) {
                        token
                        user {
                            _id
                            username
                        }
                    }
                }
            `,
            variables: input
        })

        res.status(200).json(data);
    }catch(err){
        res.status(400).json(err)
    }
}

export default handler
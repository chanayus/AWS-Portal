import client from '../../context/apollo-client'
import { gql } from '@apollo/client';
import cookie from 'cookie'

const cookiesOption = {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 1, //60secs 60mins 24hours * TTL
};

const tokenName = "token";

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
        const { token = "" } = data?.login ?? {}
        if (!token) res.send(400)
        if (token){
            res.setHeader(
                "Set-Cookie", 
                cookie.serialize(tokenName, token, cookiesOption)
            );
        }

        res.status(200).json(data);
    }catch(err){
        res.status(400).json(err)
    }
}

export default handler
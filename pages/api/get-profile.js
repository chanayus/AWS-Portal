import client from '../../context/apollo-client'
import { gql } from '@apollo/client';
import cookie from 'cookie'

const getToken = (req) => {
    const encodeCookie = req?.headers?.cookie || ""
    return cookie.parse(encodeCookie)?.token
}

const handler = async (req, res) => {
    try {
        const { data } = await client.query({
            query: gql`
                query{
                    me{
                        _id
                        username
                        isAdmin
                    }
                }
            `,
            context: {
                headers: {
                    authorization: `Bearer ${getToken(req)}`
                }
            }
        })

        res.status(200).json(data)
    } catch (err) {
        res.status(401).json(err)
    }
}

export default handler
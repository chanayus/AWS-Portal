import client from '../../context/apollo-client'
import { gql } from '@apollo/client';
import cookie from 'cookie'

// const getToken = (req) => {
//     const encodeCookie = req?.headers?.cookie || ""
//     return cookie.parse(encodeCookie)?.token
// }

const handler = async (req, res) => {
    const encodeCookie = req?.headers?.cookie || ""
    const token = cookie.parse(encodeCookie)?.token
    if (token){
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
                        authorization: `Bearer ${token}`
                    }
                },
                fetchPolicy: "network-only"
            })
    
            res.status(200).json(data)
        } catch (err) {
            res.status(401).json(err)
        }
    }
    else{
        res.status(401).send("unauthorized")
    }
}

export default handler
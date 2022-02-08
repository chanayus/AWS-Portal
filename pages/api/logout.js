import cookie from 'cookie'

const cookiesOption = {
    path: "/",
    maxAge: -1, 
};

const tokenName = "token";

const handler = async (req, res) => {
    const token = ""
    res.setHeader(
        "Set-Cookie", 
        cookie.serialize(tokenName, token, cookiesOption)
    )
    res.redirect('/login')
}

export default handler
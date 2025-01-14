import jwt from 'jsonwebtoken'

export const userAuth = async (req, res,next) => {
    const { token } = req.cookies
    try {

       
        if (!token) {
            return res.json({ success: false, message: 'Not authorized, Login Agian' })
        }

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        if (tokenDecode.id) {
            req.body.userId = tokenDecode.id
        }
        else {
            return res.json({ success: false, message: "Not Authorized, Login Again " })
        }

        next()


    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';


dotenv.config();

const generateToken = (userId, res) => {
    const token = jwt.sign({userId},
    process.env.JWT_SECRET,
    {
        expiresIn: "1d"
    })

    res.cookie('jwt', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, 
        httpOnly: true,
        sameSite: "strict"
    })
}


export default generateToken;
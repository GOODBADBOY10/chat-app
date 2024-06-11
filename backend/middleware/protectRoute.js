import jwt from 'jsonwebtoken'
import User from '../models/userModel.js';

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt

        if(!token) {
            return  res.status(401).json({
                error: 'Unauthorized: no token provided'
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded) {
            res.status(401).json({
                error: 'Unauthorized: no token provided'
            })
        }

        // const user = await User.findOne({ _id: decoded.id }).select('-password');
        const user = await User.findById(decoded.userId).select('-password');
        // const user = await User.findById(decoded.id).select('-password');

        if(!user) {
            res.status(404).json({
                error: 'user not found'
            })
        }

        req.user = user;
        // req.userId = user._id;
        // req.token = token;

        next();

    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({
            error: 'error in internal server'
        })
    }
}


export default protectRoute;
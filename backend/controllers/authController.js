import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import generateToken from '../utils/webToken.js';


export const signup = async (req, res) => {
    try {
        const { fullName, username, email, password, confirmPassword, gender} = req.body;

        if(password !== confirmPassword) {
            return res.status(400).json({
                error: 'passwords do not match'
            })
        }

        const user = await User.findOne({username});

        if(user) {
            return res.status(400).json({
                error: 'username already exists'
            })
        }

        // avatar placeholder https://avatar-placeholder.iran.liara.run/
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`


        const newUser = await User.create({
            fullName,
            username,
            email,
            password,
            confirmPassword,
            gender,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
        })

        if(newUser) {
            // Generate jwt token
            const signToken = id => {
                return jwt.sign({
                    id: id
                },
                'jgkjfherjflehlghkvelvjk243678rvjchrgjkejkgjkbjhkbsk',
                    {
                        expiresIn: 100000000000
                    })
                    // res.cookie('jwt', token, {
                    //     maxAge: 15 * 24 * 60 * 60 * 1000, 
                    //     httpOnly: true,
                    //     sameSite: "strict"
                    // })
                    // console.log(token);
            }
            const token = signToken(newUser._id)
             res.cookie('jwt', token, {
                        maxAge: 15 * 24 * 60 * 60 * 1000, 
                        httpOnly: true,
                        sameSite: "strict"
                    })

        //    generateToken(newUser._id);

            await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            email: newUser.email,
            profilePic: newUser.profilePic
        })
    } else {
            res.status(400).json({
                error: 'Invalid user data'
            }) 
    }

    } catch (error) {
        console.log('error in signup controller', error.message)
        res.status(500).json({
            error: 'Internal server error'
        })
    }
}


export const login = async (req, res) => {
    try {
        const {username, password} = req.body
        const user = await User.findOne({username})

        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect) {
            return res.status(400).json({
                error: "invalid username or password"
            })
        }
        generateToken(user._id, res)
        

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        })

    } catch (error) {
        console.log("error in login controller", error.message)
        res.status(500).json({
            error: "internal server error"
        })
    }
}
// export const login = async (req, res, next) => {
//     try {
//         const { username, password} = req.body;
//         if(!username || !password) {
//             res.status(400).json({
//                 error: 'please provide email and password for login'
//             })
//             return next()
//         }

//         const user = await User.findOne({username}).select('+password');

//         const isMatch = await user.comparePassword(password, user.password);

//         // checking if user exist and passwor matches 
//         if(!user || !isMatch) {
//             res.status(400).json({
//                 error: 'incorrect email and password for login'
//             })
//             return next()
//         }

//         const token = jwt.sign({
//             id: newUser._id
//         },
//         'jgkjfherjflehlghkvelvjk243678rvjchrgjkejkgjkbjhkbsk',
//          {
//     expiresIn: 100000000000
//     })
//         // const signToken = id => {
//         //     return jwt.sign({
//         //         id: id
//         //     },
//         //     'jgkjfherjflehlghkvelvjk243678rvjchrgjkejkgjkbjhkbsk',
//         //         {
//         //             expiresIn: 100000000000
//         //         })
//                 // res.cookie('jwt', token, {
//                 //     maxAge: 15 * 24 * 60 * 60 * 1000, 
//                 //     httpOnly: true,
//                 //     sameSite: "strict"
//                 // })
//                 // console.log(token);
//         // const token = signToken(user._id)
//         res.status(200).json({
//             status: 'success',
//             // token,
//             // _id: user._id,
//             // fullName: user.fullName,
//             // email: user.email,
//             // username: user.username,
//             // profilePic: user.profilePic
//         })

//     } catch (error) {
//         console.log('error in login controller', error.message)
//         res.status(500).json({
//             error: "Internal server error"
//         })
//     }
// }


export const logout = async (req, res) => {
    try {
        res.cookie('jwt', '', {maxAge: 0} )
        res.status(200).json({
            message: 'logout succesfully'
        })
    } catch (error) {
        console.log('error in logout controller', error.message)
        res.status(500).json({
            error: "Internal server error"
        })
    }
}
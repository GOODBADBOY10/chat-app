import User from "../models/userModel.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUser  = req.user._id;
// if you want to find all users i.e to send message to one self
        // const allUsers = await User.find({ _id: { $ne: loggedInUser } })

        // if you want to exempt yourself
        const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select('-password')
        

         res.status(200).json(filteredUsers);


    } catch (error) {
        console.log('error in user(get user in sidebar) controller', error.message)
        res.status(500).json({
            error: "Internal server error"
        })
    }
}
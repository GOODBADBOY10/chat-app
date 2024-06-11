import { mongoose } from "mongoose";
import bcrypt from 'bcryptjs'
import validator from "validator";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: [true, 'username is required'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: 6
    },
    confirmPassword: {
        type: String,
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    profilePic: {
        type: String,
        default: ''
    }
}, { timestamps: true })

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 12);

    this.confirmPassword = undefined;

    next();
})


// userSchema.methods.comparePassword = async function(password, passwordDb) {
//     return await bcrypt.compare(password, passwordDb);
// }


const User = mongoose.model('User', userSchema)

export default User;
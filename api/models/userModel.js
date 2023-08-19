import mongoose from "mongoose"
import validator from "validator"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please tell us your name"]
    },
    email: {
        type: String,
        required: [true, "Please provide your name"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    photo: String,
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minLength: 10,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm a password"],
        validate: {
            validator: function(el){
                return el===this.password
            },
            message: "Passowrds are not the same!"
        }        
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    },
    role: {
        type: String,
        enum: ["admin","user"],
        default: "user"
    }
})

userSchema.pre('save', async function(next){
    //hash password with const of 12
    this.password = await bcrypt.hash(this.password, 12)
    //delete password confirm
    this.passwordConfirm = undefined;
    next();
})

//Pre middleware which not allowd query no active users.
userSchema.pre(/^find/, function(next){
    this.find({ active: {$ne: false} });
    next();
})


userSchema.methods.correctPassword = async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword)
}

const User = mongoose.model("User", userSchema)

export default  User;
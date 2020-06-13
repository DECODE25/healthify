const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email:{
            type: String,
            unique: true,
            trim: true,
            minlength: 1
        },
        googleId:{
            type: String,
            unique: true,
            trim: true,
            minlength: 1
        },
        phone:{
            type:Number,
            unique:true,
            minlength:10,
            maxlength:10
        },
        facebookId:{
            type: String,
            unique: true,
            trim: true,
            minlength: 1
        }
    }
)

const User = mongoose.model('users', userSchema);
module.exports = User;


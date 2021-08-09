const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default:""
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        min: 10,
        max: 12,
    },
    birthDate: {
        type: Date,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    favorites : {
        type: Array
    },
    resHotel : [{
        hotel:{
            type : mongoose.Schema.Types.ObjectId ,
            ref : 'hotel'
        }
    }],

    resFlight : [{
        flight:{
            type : mongoose.Schema.Types.ObjectId ,
            ref : 'flight'
        }
    }],
    resetLink: {
        data: String,
        default: ''
    }
}, {timestapm: true})

userSchema.pre("save" , function (next , done) {
    console.log("pre save");
    let salt = bcrypt.genSaltSync()
    let hash = bcrypt.hashSync(this.password , salt)
    this.password = hash
    next()
    done()
})

// VerifyPassword
userSchema.methods.verifyPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model("user" , userSchema);
module.exports = User;
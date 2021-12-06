const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: [true, 'Please provide name'],
      unique: true,
      maxlength: 50,
      minlength: 3,
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      minlength: 8,
    },
    IsAdmin:{
        type: Boolean,
        default: false,
    }
},{ timestamps: true }
)

//hashing the password using the mongo middleware
UserSchema.pre('save', async function(next){
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next() //going to the next function (in this case, its register in auth.js)
})

//using instance methods on the schema to create a token, you invoke the function in the register controller
UserSchema.methods.createJwt = function(){
  return jwt.sign({userId:this._id, username:this.username}, process.env.jwt_secret, {expiresIn:process.env.jwt_expiration})
}

//comparing the passwords
UserSchema.methods.comparePassword = async function(candidatePassword){
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

module.exports = mongoose.model('Users', UserSchema)
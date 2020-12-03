var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: { type: Date, default: Date.now },
});

userSchema.methods.verifyPassword = function (password) {
  console.log("this password: ", this.password);
  console.log("given password: ", password);
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function () {
  let expire = new Date();
  expire.setDate(expire.getDate() + 7);

  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      password: this.password,
      exp: parseInt(expire.getTime() / 1000),
    },
    process.env.JWTSECRET
  );
};

module.exports = { userSchema };

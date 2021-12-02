const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your name"],
        maxlength: [20, "Cannot exceed the limit"],
        minlength: [4, "Name should have more that 5 chrs"],
      },
      email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter Valid Email"],
      },
      password: {
        type: String,
        required: [true, "Please Enter Password"],
        minlength: [8, "Password should have more that 8 chrs"],
        select: false,
      },
      role: {
        type: String,
        default: "user",
      },
});







module.exports = mongoose.model("Users",userSchema);

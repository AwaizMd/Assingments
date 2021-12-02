//Creating token and saving in cookie.
const COOKIE_EXPIRE="7d";
const nodemailer = require("nodemailer");


const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  const options = {
    expires: new Date(
      Date.now + COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ), //if we give cookie_expire = 7 it will expire in 7 days. 
    httpOnly: true,
  };
  res.status(statusCode).cookie('token',token,options).json({
      success:true,
      user,
      token,
  })
  if (statusCode===201) {
    let transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "", //enter email
        pass: "", //enter password
      },
    });
  
    //send email
    let mailOptions ={
      from:'mdawaiz.0403@gmail.com',
      to:`${user.email}`,
      subject:"Welcome Email!!!!",
      text:`Hey ${user.name}, Congratulations You have signedUp Successfully with us!!!!`
    }
  
    transport.sendMail(mailOptions,function(error,info) {
      if(error){
        console.log(error);
      }else{
        console.log("Email sent!!" + info.response);
      }
    })
  }
};

module.exports = sendToken;
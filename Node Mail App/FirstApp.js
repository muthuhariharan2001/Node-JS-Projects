var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'muthuhariharan2001@gmail.com',
    pass: 'eifh rsqv ynyn tmyj'
  }
});

var mailOptions = {
  from: 'muthuhariharan2001@gmail.com',
  to: 'muthuhariharan2001@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
const nodemailer = require('nodemailer');
const mailer = (mailBody) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kjsceintern@gmail.com',
            pass: 'ftpberoupesefpbe'
        }
    });
    var mailOptions = {
        from: 'kjsceintern@gmail.com',
        to: `${mailBody.emails.join(', ')}`,
        subject: mailBody.subject,
        text: mailBody.text
    }
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            return console.log(err.message);
        }
        console.log('Message Sent : %s', info.messageId);
        console.log('Preview URL : %s', info.getTestMessageURL(info));
    });
    return res.status(200).json({
        ...newUser._doc, token
    })
}
module.exports = mailer;
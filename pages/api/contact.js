// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nodemailer from "nodemailer";
const {ADMIN_EMAIL} = process.env;

const handler = async (req, res) => {
    let testAccount = await nodemailer.createTestAccount();
    
    const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, //true for 465, false for other ports
  auth: {
    user: testAccount.user, //generated ethereal user
    pass: testAccount.pass, //generated ethereal password
  },
});

const { from, subject, message } = req.body;
const msg = {
    to: from,
    from: ADMIN_EMAIL,
    subject,
    text: message,
    html: `<p>${message}</p>`,
};
console.log(msg); 

try {
    let info = await transporter.sendMail(msg);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    res.status(201).json({ message: "Email sent", id: info.messageId });
}   catch (error) {
    console.error(error);

    res.status(500).json({ message: "Failed to send email"});
}
};
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //


export default handler;
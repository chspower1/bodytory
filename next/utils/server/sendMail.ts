import smtpTransport from "@utils/server/email";
import { MailOptions } from "nodemailer/lib/sendmail-transport";
import email_authentication from "@public/static/email_authentication.png"

const sendMail = (email: string, payload: string, subject: string) => {
  const mailOptions: MailOptions = {
    from: process.env.MAIL_ID,
    to: email,
    subject,
    // text: `인증코드 : ${payload}`,
    html: `
    <div style="width: 100%; height: 100%; display: flex;" >
      <div style="flex-shrink:0; position:relative; margin: auto; width: 1000px; height: 454px;box-sizing: content-box; padding-right: 143px;">
        <div style="width: 100%; height: 100%; background: url(https://toriai.s3.ap-northeast-2.amazonaws.com/uploads/email_authentication.png) no-repeat center center; background-size: contain;"></div>
        <span style="position:absolute; left:50%; bottom:42px; transform:translateX(-50%); font-size:30px; font-weight:900; color:#4B50D3; letter-spacing:6px; ">123456</span>
      </div>
    </div>`,
  };
  smtpTransport.sendMail(mailOptions, (error, responses) => {
    if (error) {
      console.log(error);
      return null;
    } else {
      console.log(responses);
      return null;
    }
  });
  smtpTransport.close();
};

export default sendMail;

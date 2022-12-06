import smtpTransport from "@utils/server/email";
import { MailOptions } from "nodemailer/lib/sendmail-transport";

const sendMail = (email: string, payload: string, subject: string) => {
  // const mailOptions: MailOptions = {
  //   from: process.env.MAIL_ID,
  //   to: email,
  //   subject,
  //   text: `인증코드 : ${payload}`,
  //   html: "<div style={{backgroundColor:red}}>안녕하세요</div>",
  // };
  // smtpTransport.sendMail(mailOptions, (error, responses) => {
  //   if (error) {
  //     console.log(error);
  //     return null;
  //   } else {
  //     console.log(responses);
  //     return null;
  //   }
  // });
  // smtpTransport.close();
};

export default sendMail;

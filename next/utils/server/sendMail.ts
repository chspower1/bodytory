import smtpTransport from "@utils/server/email";
import { MailOptions } from "nodemailer/lib/sendmail-transport";
import email_authentication from "@public/static/email_authentication.png";

const sendMail = (email: string, payload: string, subject: string) => {
  const mailOptions: MailOptions = {
    from: process.env.MAIL_ID,
    to: email,
    subject: "바디토리에서 인증번호가 왔어요!",
    html: `
    <div style="width: 100%; height: 100%; display: flex;" >
      <div style="flex-shrink:0; position:relative; margin: auto; width: 1000px; height: 454px;box-sizing: content-box; ">
        <div style="display: flex; width: 100%; height: 100%; background: url(https://imagedelivery.net/AbuMCvvnFZBtmCKKJV_e6Q/c2e79463-e69a-48e4-055b-2c502e94ea00/public) no-repeat center center; background-size: contain;">
          <div style="margin: auto 287px 49px auto; width:280px; height:54px; display: flex;">
            <span style="font-size:30px; font-weight:900; color:#4B50D3; letter-spacing:6px; margin: auto; ">${payload}</span>
          </div>
        </div>
      </div>
    </div>`,
  };
  smtpTransport.sendMail(mailOptions, (error, responses) => {
    if (error) {
      return null;
    } else {
      return null;
    }
  });
  smtpTransport.close();
};

export default sendMail;

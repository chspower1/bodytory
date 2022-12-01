import smtpTransport from "@utils/server/email";

const sendMail = (email: string, payload: string, subject: string) => {
  const mailOptions = {
    from: process.env.MAIL_ID,
    to: email,
    subject,
    text: `인증코드 : ${payload}`,
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

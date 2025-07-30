// import nodeMailer from "nodemailer";

// export const sendEmail = async({email,subject,message})=>{
//    try {
//      const transporter = nodeMailer.createTransport({
//         host:process.env.SMTP_HOST,
//         port:process.env.SMTP_PORT,
//         service:process.env.SMTP_SERVICE,
//         auth:{
//             user:process.env.SMTP_MAIL,
//             pass:process.env.SMTP_PASSWORD,
//         }
//     });

//     const options = {
//         from:process.env.SMTP_MAIL,
//         to:email,
//         subject:subject,
//         text:message
//     }

//     await transporter.sendMail(options);
//     console.log("✅ Email sent:", info.response);
//    } catch (error) {
//      console.error("❌ Error sending email:", error.message);
//     throw error;
//    }
// }

 import nodeMailer from "nodemailer";
export const sendEmail = async ({ email, subject, message }) => {
  try {
    const transporter = nodeMailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      service: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      }
    });

    const options = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject,
      text: message
    };

    const info = await transporter.sendMail(options);
    console.log("✅ Email sent:", info.response);
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    throw error;
  }
}

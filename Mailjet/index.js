import Mailjet from "node-mailjet";
import dotenv from "dotenv";

dotenv.config();

const sendEmail = async () => {
  try {
    const mailjet = new Mailjet({
      apiKey: process.env.MAILJET_API_KEY,
      apiSecret: process.env.MAILJET_API_SECRET,
    });

    await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: process.env.MAILJET_SENDER,
            Name: process.env.MAILJET_SEND_NAME,
          },
          To: [
            {
              Email: "YOUR_MAIL@YOUR_ADRESS",
              Name: "YOUR_NAME",
            },
          ],
          Subject: "Salidos desde LibreriasJS",
          TextPart: "Salidos desde LibreriasJS",
          HTMLPart:
            '<h3>Mantente informado de todos los avances en desarrollo frontend y backend con <a href="https://libreriasjs.com">LibreriasJS</a></h3><br /> Hasta la próxima desarrollador!🖐️',
        },
      ],
    });
    console.log("Mail sent correctly!");
  } catch (error) {
    console.log("Something went wrong", error.message);
  }
};

sendEmail();

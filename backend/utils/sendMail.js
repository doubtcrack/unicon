const nodemailer = require("nodemailer");
const handlebars = require("handlebars");

const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const data = handlebars.compile(options.template);
  const replacments = {
    name: options.name,
    email_link: options.url,
  };
  const html = data(replacments);

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    name: options.name,
    url: options.url,
    subject: options.subject,
    html: html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;

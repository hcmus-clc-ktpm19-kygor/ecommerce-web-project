const fs = require("fs");
const path = require("path");
const hbs = require("hbs");
const sgMail = require("../../config/email.config");

exports.forgetPassword = async function ({ email }) {
  // Send email template
  const template = fs.readFileSync(
    path.resolve(__dirname, "../auth/views/reset_password_email_template.hbs"),
    "utf8"
  );
  const compiledTemplate = hbs.compile(template);
  const msg = {
    to: email, // Change to your recipient
    from: process.env.EMAIL_SENDER, // Change to your verified sender
    subject: "Aroma reset password",
    html: compiledTemplate({ domain_name: process.env.DOMAIN_NAME, email }),
  };
  await sgMail.send(msg);
};
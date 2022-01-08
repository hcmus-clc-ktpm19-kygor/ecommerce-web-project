const fs = require("fs");
const path = require("path");
const hbs = require("hbs");
const sgMail = require("../../config/email.config");

const accountModel = require("../account/accountModel");
const bcrypt = require("bcrypt");

exports.changePassword = async function (id, changedPasswordAccount) {
  const { old_password, new_password, confirm_password } =
    changedPasswordAccount;
  const account = await accountModel.findById(id).lean();

  const isPasswordCorrect = await bcrypt.compare(
    old_password,
    account.password
  );
  if (isPasswordCorrect) {
    if (new_password === confirm_password) {
      await accountModel.findByIdAndUpdate(id, {
        password: await bcrypt.hash(new_password, 10),
      });

      return true;
    }
  }

  return false;
};

exports.resetPassword = async function (resetPassword) {
  const { email, new_password, confirm_password } = resetPassword;

  if (new_password === confirm_password) {
    await accountModel.findOneAndUpdate(
      { email },
      { password: await bcrypt.hash(new_password, 10) }
    );
    return true;
  }
  return false;
};

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
    html: compiledTemplate({
      domain_name: process.env.DOMAIN_NAME,
      email,
      curr_time: Date.now(),
    }),
  };
  await sgMail.send(msg);
};

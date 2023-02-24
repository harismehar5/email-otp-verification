const express = require("express");
const bodyParser = require("body-parser");
const speakeasy = require("speakeasy");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

// Set SendGrid API key
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

// Generate and send OTP
app.post("/generate-otp", (req, res) => {
  const email = req.body.email;

  // Generate secret key for OTP generation
  const secret = speakeasy.generateSecret({ length: 20 });
  const secretKey = secret.base32;
  console.log("secret Key", secretKey);
  // Generate OTP based on secret key
  const otp = speakeasy.totp({
    secret: secretKey,
    encoding: "base32",
  });

  // Send OTP to user via email using SendGrid
  const msg = {
    to: email,
    from: "engr.saminasim@gmail.com", // from email
    subject: "OTP Verification",
    text: `Your OTP is ${otp}`,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log(`OTP sent to ${email}: ${otp}`);
      res.status(200).send("OTP sent successfully");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Error sending OTP");
    });
});

// Validate OTP
app.post("/validate-otp", (req, res) => {
  const userOTP = req.body.otp;
  const secretKey = req.body.secretKey;

  // Verify OTP
  const verified = speakeasy.totp.verify({
    secret: secretKey,
    encoding: "base32",
    token: userOTP,
    window: 1,
  });

  if (verified) {
    res.status(200).send("OTP validated successfully");
  } else {
    res.status(401).send("Invalid OTP");
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

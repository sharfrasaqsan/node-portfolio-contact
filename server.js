require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sgMail = require("@sendgrid/mail");

// Set the SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  const msg = {
    to: "sharfrasaqsan@gmail.com",
    from: process.env.EMAIL_FROM,
    subject: `New message from ${name}`,
    text: message,
    html: `<p>You have a new contact request</p>
           <p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Message:</strong> ${message}</p>`,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error sending email" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const nodemailer = require("nodemailer");

const { PORT, EMAIL, PASS } = process.env;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post("/", (req, res) => {
    const { email, body } = req.body;

    const date = new Date();
    const dateForHTML =
        date.getDay() +
        "/" +
        date.getMonth() +
        "/" +
        date.getFullYear() +
        " " +
        date.getHours() +
        ":" +
        (date.getMinutes() < 10 ? "0" : "") +
        date.getMinutes() +
        ":" +
        (date.getSeconds() < 10 ? "0" : "") +
        date.getSeconds();
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: EMAIL,
            pass: PASS,
        },
    });

    const mailOptions = {
        from: EMAIL,
        to: EMAIL,
        subject: `Email from  ${email}`,
        html: `<table  style="font-family: 'Roboto'; font-size: 18px; background: #313440; width: 100%; color: white">
        <tr style="color: #C3B171; font-size: 36px; text-align: center;">NEW MESSAGE!!!</tr>
        <tr><td  style="padding-left: 5px">From: <span style="color: #C3B171; text-align: center;"><a href=mailto:${email}>${email}</a></span></td></tr>
        <tr><td  style="padding-left: 5px">${body}</td></tr>
         <tr style="height: 60px; font-size: 12px; vertical-align: middle"><td  style="padding-left: 5px">${dateForHTML}</td></tr>
        <tr style="font-size: 16px; background: black; text-align: center; vertical-align: middle; height: 140px"> This project was made with &#x2764; <br/> <br/> by FRONT FLEX <br/><br/> <a href="https://frontflex.netlify.app"><img src="https://frontflex.netlify.app/static/minilogo-b5f69d0d94d67a6edcf46f536d48ee55.png" alt="" height=60/></a></tr>
        
        </table>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
    res.send(req.body);
});

app.listen(PORT, function () {
    console.log("Server is listening on..." + PORT);
});

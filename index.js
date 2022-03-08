const express = require("express");
const app = express();

require("dotenv").config();
var nodemailer = require("nodemailer");

const { PORT, EMAIL, PASS } = process.env;

app.post("/:email/:body", (req, res) => {
    const { email, body } = req.params;
    const emailSend = email;
    const bodySend = body;
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
        date.getMinutes() +
        ":" +
        date.getSeconds();
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: EMAIL,
            pass: PASS,
        },
    });

    var mailOptions = {
        from: EMAIL,
        to: EMAIL,
        subject: "Email from" + emailSend,
        html: `<table  style="font-family: 'Roboto'; font-size: 24px; background: #313440; width: 100%; color: white">
        <tr style="color: #C3B171; font-size: 48px; text-align: center;">NEW MESSAGE!!!</tr>
        <tr><td  style="padding-left: 20px">From: <span style="color: #C3B171; text-align: center;">${emailSend}</span></td></tr>
        <tr><td  style="padding-left: 20px">${bodySend}</td></tr>
        <tr style="height: 60px; font-size: 14px; vertical-align: middle"><td  style="padding-left: 20px">${dateForHTML}</td></tr>
        <tr style="font-size: 16px; background: black; text-align: center; vertical-align: middle; height: 140px"> This project was made with &#x2764; by FRONT FLEX <br/><br/> <a href="https://frontflex.netlify.app"><img src="https://frontflex.netlify.app/static/minilogo-b5f69d0d94d67a6edcf46f536d48ee55.png" alt="" height=60/></a></tr>
        
        </table>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
    res.send(body);
});

app.listen(PORT, function () {
    console.log("Server is listening on..." + PORT);
});

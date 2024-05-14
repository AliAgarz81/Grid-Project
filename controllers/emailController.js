const { validationResult } = require('express-validator');
const { google } = require('googleapis');
const nodemailer = require('nodemailer');


/*const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
)

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });*/

const sendEmail = async (req,res) => {
    const lng = req.params.lng;
    //const ACCESS_TOKEN = await oAuth2Client.getAccessToken();
    const { name, email, number, place, message } = req.body;
    var transport = nodemailer.createTransport({
        host: 'smtp.yandex.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.YANDEX_MAIL,
            pass: process.env.YANDEX_PASS
        },
    });
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            if(lng === "tr"){
                return res.status(400).json({ message: errors.array()[0].msg.tr });
            }
            else {
                return res.status(400).json({ message: errors.array()[0].msg.else });
            }
        };
        let info = await transport.sendMail({
            from: `${name} <${process.env.YANDEX_MAIL}>`,
            to: 'bakugridstudio@gmail.com',
            subject: 'Form',
            text: `
            Name: ${name},
            Number: ${number},
            Email: ${email},
            Where to find us: ${place},
            Message: ${message}`
        });
        if(lng === "tr"){
            return res.status(200).json({ message: "Mesaj göndərildi" });
        }
        else {
            return res.status(200).json({ message: 'Message sent successfully' });
        }
    } catch(error){
        res.status(500).json({ message: error.message });
    }
}

module.exports = sendEmail;
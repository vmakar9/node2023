import nodemailer,{Transporter} from 'nodemailer'
import EmailTemplates from "email-templates"
import {configs} from "../configs/config";
import * as path from "path";
import {allTemplates } from "../constants/email.constants";
import {EEmailActions} from "../enum/email.enum";

class EmailService{
    private trasnporter : Transporter;
    private templateParser;

    constructor() {
        this.trasnporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user: configs.NO_REPLY_EMAIL,
                pass: configs.NO_REPLY_EMAIL_PASSWORD,
            },
        });
        this.templateParser = new EmailTemplates({
            views: {
                root: path.join(process.cwd(),"src","statics"),
                options:{
                    extension:"hbs"
                },
            },
            juice:true,
            juiceResources:{
                webResources:{
                    relativeTo: path.join(process.cwd(),"src","statics","css"),
                },
            },
        })
    }
    public async sendEmail(email: string,emailAction: EEmailActions){
        const templateInfo = allTemplates[emailAction]
        const html =  await this.templateParser.render('register')
        return this.trasnporter.sendMail({
            from: "No reply",
            to: email,
            subject: templateInfo.subject,
            html,
        });
    }
}
export const emailService = new EmailService();
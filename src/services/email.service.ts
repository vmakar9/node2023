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
    public async sendEmail(email: string,emailAction: EEmailActions,locals:Record<string, string> = {}){
        try {
            const templateInfo = allTemplates[emailAction]
            locals.frontUrl =configs.FRONT_URL
            const html =  await  this.templateParser.render(
                templateInfo.templateName,
                locals
            )
            return this.trasnporter.sendMail({
                from: "No reply",
                to: email,
                subject: templateInfo.subject,
                html,
            });
        }catch (e) {
            console.error(e.message)
        }

    }
}
export const emailService = new EmailService();
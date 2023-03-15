import {EEmailActions} from "../enum/email.enum";


export const allTemplates : {
    [key:string]:{subject:string;templateName:string}
}={
    [EEmailActions.WELCOME]:{
        subject:"Great to see you in our app!",
        templateName:"register",
    },
    [EEmailActions.FORGOT_PASSWORD]:{
        subject: "We control your password, just follow all steps and everything will be fine",
        templateName: "forgotPassword"
    }
}

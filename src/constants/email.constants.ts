export enum EEmailActions{
    WELCOME="welcome",
    FORGOT_PASSWORD= "forgot_pass"
}


export const allTemplates = {
    [EEmailActions.WELCOME]:{
        subject:"Great to see you in our app!",
        templateName:"register",
    },
    [EEmailActions.FORGOT_PASSWORD]:{
        subject: "We control your password, just follow all steps and everything will be fine",
        templateName: "forgotPassword"
    }
}

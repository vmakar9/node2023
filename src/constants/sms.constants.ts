import {ESmsActionEnum} from "../enum/sms-action.enum";


export const smsTemplates:{[key:string]:string}={
    [ESmsActionEnum.WELCOME]:"Great to see you in our appi",

    [ESmsActionEnum.FORGOT_PASSWORD]:"We control your password all steps and everything will be good"

}

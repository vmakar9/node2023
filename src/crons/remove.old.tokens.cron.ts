import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Token } from "../models/Token.models";
import {User} from "../models/User.model";
import {EEmailActions} from "../enum/email.enum";
import {emailService} from "../services/email.service";


dayjs.extend(utc);

const tokensRemover = async (): Promise<void> => {
 const previousMonth = dayjs().utc().subtract(1, "month");

 const unvisitedUsers = await Token.find({
  createdAt: { $lte: previousMonth },
 });
 const ids = unvisitedUsers.map((record) => record._user_id);

 const users = await User.find({ _id: { $in: ids } });
 const emails = users.map((u) => u.email);

 await emailService.sendEmail(emails, EEmailActions.REMINDER);

 // await Promise.all(
 //   users.map(async ({ email }) => {
 //     return emailService.sendMail(email, EEmailActions.REMINDER);
 //   })
 // );

 await Token.deleteMany({ createdAt: { $lte: previousMonth } });
};

export const removeOldTokens = new CronJob("0 0 * * *", tokensRemover);
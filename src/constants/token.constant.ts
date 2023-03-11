import {config} from "dotenv";

config()

export const tokenConstants = {
    ACCESS_SECRET: process.env.JWT_ACEESS_SECRET,
    REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
};
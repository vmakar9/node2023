import * as Joi from "joi";


import { EGenders } from "../enum/gender.enum";

export class UserValidator {
    private static firstName = Joi.string().min(2).max(50).trim();
    private static email = Joi.string()

        .lowercase()
        .trim();
    private static password = Joi.string();
    private static gender = Joi.valid(...Object.values(EGenders));

    static createUser = Joi.object({
        name: this.firstName.required(),
        email: this.email.required(),
        password: this.password.required(),
        gender: this.gender.required(),
    });

    static updateUser = Joi.object({
        name: this.firstName,
        gender: this.gender,
    });

    static loginUser = Joi.object({
        email: this.email.required(),
        password: this.password.required(),
    });
}
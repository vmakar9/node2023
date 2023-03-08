import * as Joi from "joi";

export class UserValidator{
  private static fistName = Joi.string().min(2).max(50);

  private static age = Joi.number().greater(2);

  static createUser = Joi.object({
      name: this.fistName,
      age: this.age
  })

  static updateUser = Joi.object({
    name:this.fistName,
    age: this.age
  })
}
import {NextFunction, Request, Response} from "express";
import {User} from "../models/User.model";
import {ApiError} from "../errors/api.error";
import {UserValidator} from "../validators/user.validators";

class UserMiddleware{
   public async getByIdAndThrow(req:Request,res:Response,next:NextFunction):Promise<void>{
       try {
           const {userId} = req.params;
           const user = await User.findById(userId);
           if(!user){
               throw new ApiError("User not found",404);
           }
           next();
       }catch (e) {
         next(e);
       }

   }
    public async isUserValidCreate(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
           const {error,value} = UserValidator.createUser.validate(req.body);
            if(error){
                throw new ApiError(error.message,400);
            }
            req.body = value;
            next();
        }catch (e) {
            next(e);
        }

    } public async isUserValidUpdate(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const {error,value} = UserValidator.updateUser.validate(req.body);
            if(error){
                throw new ApiError(error.message,400);
            }
            req.body = value;
            next();
        }catch (e) {
            next(e);
        }

    }



}

export const userMiddleware = new UserMiddleware()
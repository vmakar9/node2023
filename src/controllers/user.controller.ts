import {NextFunction, Request, Response} from "express";
import  {IUser} from "../types/user.types";
import {User} from "../models/User.model";
import {userService} from "../services/user.service";
import {ICommonResponse} from "../types/common.types";
import {IQuery} from "../types/pagination.type";
import {UploadedFile} from "express-fileupload";
import {userMapper} from "../mapper/user.mapper";

class UserController {
    public async getAll(req:Request,res:Response,next:NextFunction):Promise<Response<IUser[]>>{
        try {
            const users = await userService.getWithPagination(req.query as unknown as IQuery);
            return res.json(users);
        }catch (e){
            next(e);
            }
    }


    public async getById(req:Request,res:Response,next:NextFunction):Promise<Response<IUser>>{
        try{
            const {userId} = req.params;
            const user = await userService.getById(userId);
            return res.json(user)
        }catch(e) {
            next(e)
        }
    }

    public async create(req:Request,res:Response,next:NextFunction):Promise<Response<ICommonResponse<IUser>>>{
        try {
            const body = req.body;
            const user = await User.create(body);
            return res.status(201).json({
                message:"User created",
                data:user
            });
        }catch (e){
            next(e)
        }
    }
    public async update(req:Request,res:Response,next:NextFunction):Promise<Response<ICommonResponse<IUser>>>{
        try {
            const {userId} = req.params;
            const user = req.body;

            const updatedUser = await user.updateOne({_id:userId},{...user});
            return res.status(200).json({
                message:"User updated",
                data: updatedUser,
            })
        }catch (e) {
            next(e)
        }
    }
    public async delete(req:Request,res:Response,next:NextFunction):Promise<Response<ICommonResponse<IUser>>>{
        try {
            const {userId} = req.params;

            await User.deleteOne({_id:userId});
            return  res.status(200).json({
                message:"User deleted"
            })
        }catch (e) {
            next(e)
        }
    }

    public async uploadAvatar(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response<void>> {
        try {
            const { userId } = req.params;
            const avatar = req.files.avatar as UploadedFile;

            const user = await userService.uploadAvatar(avatar, userId);

            return res.status(201).json(user);
        } catch (e) {
            next(e);
        }
    }
    public async deleteAvatar(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response<IUser>> {
        try {
            const userEntity = res.locals.user as IUser;

            const user = await userService.deleteAvatar(userEntity);

            const response = userMapper.toResponse(user);

            return res.status(201).json(response);
        } catch (e) {
            next(e);
        }
    }

}

export const userController = new UserController();
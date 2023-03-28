import {User} from "../models/User.model";
import {IUser} from "../types/user.types";
import {ApiError} from "../errors/api.error";
import {IPaginationResponse, IQuery} from "../types/pagination.type";
import {UploadedFile} from "express-fileupload"
import {s3Service} from "./s3.service";


class UserService{
   public async getAll():Promise<IUser[]>{
       try {
           return User.find()
       }catch (e) {
           throw new ApiError(e.message,e.status)
       }

   }

   public async getWithPagination(query: IQuery):Promise<IPaginationResponse<any>>{
       try {
           const queryStr = JSON.stringify(query);
           const queryObj = JSON.parse(
               queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`)
           );

           const {
               page = 1,
               limit = 5,
               sortedBy = "createdAt",
               ...searchObject
           } = queryObj;

           const skip = limit * (page - 1);

           const users = await User.find(searchObject)
               .limit(limit)
               .skip(skip)
               .sort(sortedBy)
               .lean();

           const usersTotalCount = await User.count();

           return {
               page: +page,
               itemsCount: usersTotalCount,
               perPage: +limit,
               itemsFound: users.length,
               data: users,
           };
       }catch (e) {
           throw new ApiError(e.message,e.status)
       }
   }

   public async getById(id:string):Promise<IUser>{
       try {
           return User.findById(id);
       }catch (e) {
           throw new ApiError(e.message,e.status);
       }
   }
    public async uploadAvatar(
        file: UploadedFile,
        userId: string
    ): Promise<IUser> {
        try {
            const filePath = await s3Service.uploadPhoto(file, "user", userId);

            return await User.findByIdAndUpdate(
                userId,
                { avatar: filePath },
                { new: true }
            );
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }

}

export const userService = new UserService()
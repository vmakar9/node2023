import {Model, model, Schema} from "mongoose";
import {EGenders} from "../enum/gender.enum";
import {EUserStatus} from "../enum/user-status.enum";
import {IUser} from "../types/user.types";

const userSchema = new Schema(
    {
        name: {
            type: String,
            index:true
        },

        email: {
            type: String,
            unique: true,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        gender: {
            type: String,
            enum: EGenders,
        },
        status:{
            type: String,
            enum: EUserStatus,
            default:EUserStatus.inactive
        }
    },
    {
        versionKey: false,
        timestamps:true
    }
);

interface IUserMethods{
    nameWithAge():void;
}

interface IUserModel extends Model<IUser, object, IUserMethods>{
    findByName(name:string):Promise<IUser[]>;
}

userSchema.methods={
    nameWithAge(){}
}


userSchema.statics ={
    async findByName(){
       return this.find({name})
    }
}

export const User = model<IUser, IUserModel>('user',userSchema)

const users = User.findByName("Vlad");
console.log(users);
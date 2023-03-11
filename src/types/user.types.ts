export enum EGenders{
    male = 'male',
    female = 'female',
    mixed = 'mixed'
}

export interface IUser {
    _id?:string
    name: string;
    email: string;
    password: string;
    gender: string;
}

export interface ICommonResponse<T>{
    message: string;
    data: T
}
interface IIndex{
    [key:string]:any
}
export type IRequest = IIndex;


export enum EGenders{
    male = 'male',
    female = 'female',
    mixed = 'mixed'
}

export interface IUser {
    name: string;
    age: number;
    email: string;
    password: string;
    gender: string;
}

export interface ICommonResponse<T>{
    message: string;
    data: T
}
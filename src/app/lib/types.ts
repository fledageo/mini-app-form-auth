export interface IUser {
    id:string
    name:string
    surname:string
    email:string
    password:string
}

export interface ISignUpResponse{
    status:string
    message?:string
    userId?:string
}
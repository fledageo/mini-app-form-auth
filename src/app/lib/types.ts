export interface IUser {
    id:string
    name:string
    surname:string
    email:string
    password:string
}


export interface ISignInData{
    email:string
    password:string
}

export interface ISignUpResponse{
    status:string
    message?:string
    userId?:string
}

export interface ISignInResponse{
    error:{
        email?:string
        password?:string
    } | null
    message?:string
    profileId?:string
}
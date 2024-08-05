import { getUserByEmail, isUserExists } from "@/app/lib/api"
import { ISignInData } from "@/app/lib/types"
import bcrypt from 'bcrypt'
import { redirect } from "next/navigation"




export const POST = async(req:Request) => {
    const data = await req.json() as ISignInData
    const userByEmail = getUserByEmail(data.email)

    if(userByEmail){
       const isValidPassword = await bcrypt.compare(data.password,userByEmail.password)
       if(isValidPassword){
        //    redirect(`/user/profile/${userByEmail.id}`)
           return Response.json({error:null,profileId:userByEmail.id})
       }else{
            return Response.json({error:{password:true},message:"Invalid password"})
       }
    }else{
        return Response.json({error:{email:true},message:"Invalid Email"})
    }
}
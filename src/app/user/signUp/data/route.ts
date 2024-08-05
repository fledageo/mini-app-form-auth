import { isUserExists } from "@/app/lib/api";
import { IUser } from "@/app/lib/types";
import { nanoid } from "nanoid"
import bcrypt from 'bcrypt'
import { addNewUser } from "@/app/lib/api";

export async function POST(req: Request, res: Response) {
    

    const newUserData = await req.json()

    const user:IUser = {
        id:nanoid(),
        name:newUserData.name,
        surname:newUserData.surname,
        email:newUserData.email,
        password:newUserData.password,
    }
    user.password = await bcrypt.hash(user.password, 10)
    const userExists = isUserExists(user.email)
    
    if(!userExists.CNTREC){
       const result = addNewUser(user)
       if(result.changes){
            return Response.json({status:"ok"})
       }else{
            return Response.json({status:"error",message:"Error"})
       }
    }else{
        return Response.json({status:"error",message:"User with this email already registred"})
    }
}


import { getUserByEmail, isUserExists } from "@/app/lib/api"
import { ISignInData } from "@/app/lib/types"
import bcrypt from 'bcrypt'
import { createAuthSession } from "@/app/lib/auth"



export const POST = async (req: Request) => {
    try {
        const data = await req.json() as ISignInData;
        const userByEmail = getUserByEmail(data.email);

        if (userByEmail) {
            const isValidPassword = await bcrypt.compare(data.password, userByEmail.password);
            if (isValidPassword) {
                await createAuthSession(userByEmail.id);
                return new Response(JSON.stringify({ error: null, profileId: userByEmail.id }), { status: 200, headers: { 'Content-Type': 'application/json' } });
            } else {
                return new Response(JSON.stringify({ error: { password: true }, message: "Invalid password" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
            }
        } else {
            return new Response(JSON.stringify({ error: { email: true }, message: "Invalid Email" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }
    } catch (error) {
        console.error('Error in POST handler:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
};
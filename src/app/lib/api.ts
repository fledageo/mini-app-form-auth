import Database from "better-sqlite3";
import { FieldValues } from "react-hook-form";
import { IUser } from "./types";
const db = new Database("auth.db");

export const addNewUser = (data:FieldValues) => {
    return db.prepare(`
        INSERT INTO users(id,name,surname,email,password)
        VALUES(@id,@name,@surname,@email,@password)
    `).run(data)
}

export const isUserExists = (email:string) => {
    return db.prepare(`
        SELECT COUNT(*) AS CNTREC FROM users WHERE email='${email}';
    `).get() as {CNTREC:number}
}


export const getAllUsers = () => {
    return db.prepare(`
        SELECT * FROM users
    `).all() as IUser[]
}

export const getUserById = (id:string):IUser => {
    return db.prepare(`
        SELECT * FROM users 
        WHERE id='${id}'    
    `).get() as IUser
}
export const getUserByEmail = (email:string) => {
    return db.prepare(`
        SELECT * FROM users 
        WHERE email='${email}'    
    `).get() as IUser | undefined
}
"use client"
import React, { useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import "./style.css"
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ISignUpResponse } from '@/app/lib/types';
import { redirect, useRouter } from 'next/navigation';
// import { getUserByEmail } from '../../api';



const validSchema = Yup.object({
    name: Yup.string()
        .required("Required field"),
    surname: Yup.string()
        .required("Required field"),
    email: Yup.string()
        .required("Required field")
        .email('Invalid email format.'),
    password: Yup.string()
        .required("Required field")
        .min(6, "Please enter a password with at least 6 characters")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, "Must contain letter,number, and special character."),
    confirm: Yup.string()
        .required("Required field")
        .oneOf([Yup.ref('password')], 'Passwords must match')

})


export default function Form() {
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(validSchema) })
    const [error, setError] = useState<ISignUpResponse | null>(null)
    const router = useRouter()

    const handleOnSubmit = async (data: FieldValues) => {

        const response = await fetch("signUp/api", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const result = await response.json() as ISignUpResponse
        if(result.status == "error"){
            setError(result) 
        }else{
            router.push(`/signIn`)   
            setError(null)
        }
    }

    

    return (
        <>
            <div className="form-container">
                <div className="form-wrapper box">
                    <span className='subtitle is-5 signup-title'>Sign Up</span>
                    <form onSubmit={handleSubmit((data) => handleOnSubmit(data))} className='form'>
                        <div className="name-surname-block">
                            <div className="input-helper-block mr-2 ">
                                <input
                                    type="text"
                                    className={`input ${errors.name ? "is-danger" : "is-info"}`}
                                    placeholder='Name'
                                    {...register("name")}
                                />
                                <span className='help-message ml-1'>{`${errors.name ? errors.name.message : ""}`}</span>
                            </div>

                            <div className="input-helper-block ml-2 ">
                                <input
                                    type="text"
                                    className={`input ${errors.surname ? "is-danger" : "is-info"}`}
                                    placeholder='Surname'
                                    {...register("surname")}
                                />
                                <span className='help-message ml-1'>{`${errors.surname ? errors.surname.message : ""}`}</span>

                            </div>

                        </div>

                        <div className="other-inputs-block mt-4">
                            <div className="input-helper-block">
                                <input
                                    type="text"
                                    className={`input mt-4 ${errors.email ? "is-danger" : "is-info"}`}
                                    placeholder='Email'
                                    {...register("email")}
                                    onChange={() => setError(null)}
                                />
                                <span className='help-message ml-1'>{`${errors.email ? errors.email.message : error ? error.message : ""}`}</span>
                            </div>

                            <div className="input-helper-block">
                                <input
                                    type="password"
                                    className={`input mt-4 ${errors.password ? "is-danger" : "is-info"}`}
                                    placeholder='Password'
                                    {...register("password")}
                                />
                                <span className='help-message ml-1'>{`${errors.password ? errors.password.message : ""}`}</span>
                            </div>

                            <div className="input-helper-block">
                                <input
                                    type="password"
                                    className={`input mt-4 ${errors.confirm ? "is-danger" : "is-info"}`}
                                    placeholder='Confirm Password'
                                    {...register("confirm")}
                                />
                                <span className='help-message ml-1'>{`${errors.confirm ? errors.confirm.message : ""}`}</span>
                            </div>

                        </div>
                        <button className='button is-info mt-6 mx-auto'>Join</button>
                    </form>
                </div>
            </div>
        </>
    )
}

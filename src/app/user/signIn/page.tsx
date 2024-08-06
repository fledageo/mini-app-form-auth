"use client"
import React, { useState } from 'react'
import "./style.css"
import { FieldValues, useForm } from 'react-hook-form'
import { ISignInResponse } from '@/app/lib/types'
import { useRouter } from 'next/navigation'
import { createAuthSession } from '@/app/lib/auth'

export default function Page() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [invalidField, setInvalidField] = useState<ISignInResponse | null>(null)
  const router = useRouter()

  const handleSignIn = async (data: FieldValues) => {
    const response = await fetch("signIn/data", {
      method: "POST",
      body: JSON.stringify(data)
    })
    const result = await response.json() as ISignInResponse
    if (result.error) {
      setInvalidField(result)
    }else{
      router.push(`profile`)
    }
  }
  // onchange -->  remove error text 
  return (
    <>
      <div className="box container">
        <div className="box form-wrapper">
          <form onSubmit={handleSubmit((data) => handleSignIn(data))}>
            <div className="fields-wrapper">
              <div className="input-helptext-block mb-5">
                <input
                  type="text"
                  className='input is-info'
                  placeholder='Email'
                  {...register("email", {
                    required: "Required field"
                  })}
                />
                <span className='help-text ml-1'>{`${errors.email ? errors.email.message :
                                                invalidField?.error?.email ? invalidField.message : ""}`}
                </span>
              </div>
              <div className="input-helptext-block mb-5">
                <input
                  type="password"
                  className='input is-info'
                  placeholder='Password'
                  {...register("password", {
                    required: "Required field"
                  })}
                />
                <span className='help-text ml-1'>{`${errors.password ? errors.password.message :
                                                invalidField?.error?.password ? invalidField.message : ""}`}
                </span>
              </div>
              <button className='button is-info is-outlined is-rounded'>Sign In</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

import { getUserById } from '@/app/lib/api'
import { verifyAuth } from '@/app/lib/auth'
import { redirect } from 'next/navigation'
import React from 'react'


interface IProps{
  params:{id:string}
}

const Profile = async () => {
  const result = await verifyAuth()
  if(!result.user){
    redirect("/user/signIn")
  }
  const user = await getUserById(result.user.id)

  return (
    <>
      <h1 className='subtitle is-2'>Hello {user.name} {user.surname}</h1>
    </>
  )
}

export default Profile
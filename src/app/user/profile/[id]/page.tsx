import { getUserById } from '@/app/lib/api'
import React from 'react'


interface IProps{
  params:{id:string}
}

const Profile = async ({params}:IProps) => {
  const user = await getUserById(params.id)
  return (
    <>
      <h1 className='subtitle is-2'>Hello {user.name} {user.surname}</h1>
    </>
  )
}

export default Profile
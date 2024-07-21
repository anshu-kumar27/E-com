import React from 'react'
import Metadata from '../Metadata'
import { useSelector } from 'react-redux'

const Profile = () => {
    const {user} = useSelector((state)=>state.user);
  return (
    <>
        
    <Metadata title={`${user.name}'s profile`}/>
    <h4>Full Name</h4>
    <p>{user.name}</p>
    <h4>Email</h4>
    <p>{user.email}</p>
    <div></div>
    </>
  )
}

export default Profile
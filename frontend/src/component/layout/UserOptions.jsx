import React, { useState } from 'react'
import './Header.css'
import {SpeedDial} from '@material-ui/lab'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/userAction';
import Profile from './Profile';
const UserOptions = ({user}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open,SetOpen] = useState(false);
    
    const handlelogout = () =>{
      dispatch(logout());
      navigate('/login')
      alert('logout successfully')
    }
    if(user.role === 'admin')
  return (
    <> 
    <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={()=>SetOpen(false)}
        onOpen={()=>SetOpen(true)}
        open = {open}
        >
    </SpeedDial>
      <div>
        <Profile/>

      <input type="button" value='logout' onClick={handlelogout}/>
      <Link to='/me/update'>change password</Link>
    </div>
    </>
  )
}

export default UserOptions
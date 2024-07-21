import React, { useState, useRef , useEffect, Fragment} from 'react';
import './signin.css';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { clearErrors,login,register } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import Loader from '../../loader/loader';

const LoginSignup = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const {error , loading, isAuthenticated} = useSelector((state)=> state.user)
    console.log("error :",error);
    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const[name,setName] = useState('');
    const[password,setPassword] = useState('')
    const[email,setEmail] = useState('');


  const handleLoginSubmit = (e) =>{
    e.preventDefault();
    dispatch(login(loginEmail,loginPassword))
  }
  
    
    const handleRegisterSubmit = (e) =>{
    e.preventDefault();


    dispatch(register(name,email,password));
    console.log(`name :${name} , email :${email}, password :${password}`)
  }


    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(isAuthenticated){
            navigate("/account")
        }
    },[dispatch,error,alert,navigate,isAuthenticated])

  const switchTabs = (e, tab) => {
    if (tab === 'login') {
      switcherTab.current.classList.add('shifttoNeutral');
      switcherTab.current.classList.remove('shiftToRight');
      loginTab.current.classList.remove('shiftToLeft');
      registerTab.current.classList.remove('shifttoNeutralForm');
    }
    if (tab === 'register') {
      switcherTab.current.classList.add('shiftToRight');
      switcherTab.current.classList.remove('shifttoNeutral');
      loginTab.current.classList.add('shiftToLeft');
      registerTab.current.classList.add('shifttoNeutralForm');
    }
  };
  return (
    <Fragment>
        {loading?<Loader/>:
        <Fragment>
        <div className="loginsignupcontainer">
        <div className="loginsignupbox">
          <div>
            <div className="login_signup_toogle">
            <p onClick={(e)=> switchTabs(e,"login")}>Login</p>
            <p onClick={(e)=> switchTabs(e,"register")}>Register</p>
            </div>
            <button ref={switcherTab} className='shift_button'></button>
          </div>
  
          <form className="loginForm" onSubmit={handleLoginSubmit} ref={loginTab}>
            <div className="loginEmail">
              <input
                type="email"
                placeholder="Email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="loginPassword">
              <input
                type="password"
                name='password'
                placeholder="Password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            {console.log(email,password)}
            <Link to="/password/forgot">Forgot password?</Link>
            <input type="submit" value="Login" className="loginBtn" />
          </form>
  
          <form className="signUpForm" onSubmit={handleRegisterSubmit} ref={registerTab}>
            <div className="signUpName">
              <input
                type="text"
                name='name'
                placeholder="Name"
                required
                value={name}
                onChange={(e)=> setName(e.target.value)}
              />
            </div>
            <div className="SignUpEmail">
              <input
                type="email"
                placeholder="Email"
                required
                name='email'
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
              />
            </div>
            <div className="SignUpPassword">
              <input
                type="password"
                name='password'
                placeholder="Password"
                required
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
              />
            </div>
            <input type="submit" value="Register" className="SignUpBtn" />
          </form>
        </div>
      </div>
    </Fragment>}
    </Fragment>
  )
};

export default LoginSignup;

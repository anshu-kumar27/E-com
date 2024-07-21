import './App.css';
import React , {useEffect} from 'react';
import Header from "./component/layout/Header.jsx"
import Home from './component/home/Home.jsx'
import Footer from './component/layout/Footer.jsx'
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import ProductDetails from './component/Product/ProductDetails.js'
import LoginSignup from './component/user/Loginsignup.jsx';
import store from './store.js'
import { loadUser} from './actions/userAction.js';
import { useSelector } from 'react-redux';
import UserOptions from './component/layout/UserOptions.jsx'
import Profile from './component/layout/Profile.jsx'
import ProtectedRoute from './component/protectedRoute/ProtectedRoute.js';
import UpdateProfile from './component/user/UpdateProfile.jsx';
function App() {
  const { isAuthenticated ,user } = useSelector((state) => state.user)
  useEffect(() => {
      store.dispatch(loadUser())
  }, [])
  return (
    <Router>
        <Header/>
        {isAuthenticated && <UserOptions user={user}/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product/:id' element={<ProductDetails/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
        <Route path='/account' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
        <Route path='/me/update' element={<ProtectedRoute><UpdateProfile/></ProtectedRoute>}/>
      </Routes>
      <Footer/>
      </Router>
  );
}

export default App;

import React , { Fragment, useEffect } from 'react'
import {Link} from 'react-router-dom'
import '../style/home.css'
import Product from './product'
import Metadata from '../Metadata'
import {clearErrors, getProduct} from '../../actions/poductactions'
import {useSelector, useDispatch} from 'react-redux'
import Loader from '../../loader/loader'
import { useAlert } from 'react-alert'

const Home = () => {

  const alert = useAlert()

  const dispatch = useDispatch();
  const {loading,error,products,productsCount} = useSelector((state)=>state.products)

  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  },[dispatch,error, alert])


  return <Fragment>
    {loading? <Loader/>:
    (<Fragment>
    <Metadata title="home page"/>
    <Link to='/login'>Login</Link>
    <div className="banner">
        <p>welcome to Ecommerce</p>
        <h1>find amazing products below</h1>
        <Link to='/'></Link>
        <button>
            {/* Scroll <CgMouse/> */}
        </button>
    </div>
    <h2 className='homeheading'>Feature Products</h2>
        <div className="container">
            {products && products.map((product)=><Product product={product}/>)}
        </div>
    </Fragment>)}
  </Fragment>
}

export default Home
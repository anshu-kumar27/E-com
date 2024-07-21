import React, { Fragment, useEffect } from 'react'
import Carousel from 'react-material-ui-carousel'
import './productDetails.css'
import {useSelector , useDispatch} from 'react-redux'
import { clearErrors, getProductDetails } from '../../actions/poductactions'
import {useParams} from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import ReviewCard from './ReviewCard.jsx'
import {useAlert} from 'react-alert'

const ProductDetails = () => {
    const {id} = useParams()
    const alert = useAlert();
    const {product, loading, error} = useSelector((state)=>state.productDetails)
    console.log('state is :' , product);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProductDetails(id))// this is used to get id form the url just like req.params.id in backend
    },[dispatch,id,alert,error,alert]);

    const options={ 
        edit:false,
        color:"rgba(20,20,20,0.1",
        activeColor:'tomato',
        value:product.ratings,
        isHalf:true
    }

  return (
    <Fragment>
    <div className='productDetails'> 
        <div>
            <Carousel>
                {product.images && product.images.map((item,i)=>(
                    <img
                    className='CarouselImage'
                    key={item.url}
                    src={item.url}
                    alt={`${i} slide`}
                    />
                ))}
            </Carousel>
        </div>

        <div>
            <div className='detailsBlock-1'>
                <h2>{product.name}</h2>
                <p>Product#{product._id}</p>
                </div>
                <div className='detailsBlock-2'>
                    <ReactStars {...options}/>
                    <span>({product.numofReviews})</span>
                </div>
                    <div className='detailBlock-3'>
                        <h1>{`${product.price}`}</h1>
                        <div className='detailBlock-3-1'>
                            <div className='detailBlock-3-1-1'>
                                <button>-</button>
                                <input value='1' type='number'/>
                                <button>+</button>
                            </div>{" "}
                            <button>Add to cart</button>
                        </div>
                        <p>
                            Status:{" "}
                            <b className={product.Stock <1 ? "redColor" : "greenColor"}>
                                {product.Stock <1? "outOfStock" : "InStock"}
                            </b>
                        </p>
                    </div>
                    <div className='detailBlock-4'>
                        Description : <p>{product.description}</p>
                    </div>
                    <button className='submitReview'>Submit Review</button>
            </div>
        </div>
        <h3 className='reviewsHeading'>Reviews</h3>
        {product.reviews && product.reviews[0]? (
            <div className='reviews'>
                {product.reviews && product.reviews.map((review)=><ReviewCard review={review}/>)}
            </div>
        ):
        (<p className='noReviews'> No reviews yet</p>)
        }
    </Fragment>
  )
}


export default ProductDetails
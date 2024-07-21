import React from 'react'
import ReactStars from 'react-rating-stars-component'

const ReviewCard = ({review}) => {
    const options={ 
        edit:false,
        color:"rgba(20,20,20,0.1",
        activeColor:'tomato',
        value:review.rating,
        isHalf:true
    }
  return (
    <div className='reviewCard'>
        <img src='https://png.pngtree.com/png-clipart/20210129/ourmid/pngtree-default-male-avatar-png-image_2811083.jpg' alt='user'/>
        <p>{review.name}</p>
        <ReactStars {...options}/>
        <span> {review.comment}</span>
    </div>
    
  )
}

export default ReviewCard
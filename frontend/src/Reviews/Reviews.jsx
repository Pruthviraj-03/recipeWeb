import React, { useState } from 'react';
import Header from '../Header/Header';
import { FaStar, FaStarHalfAlt, FaQuoteRight } from 'react-icons/fa';
import logo from '../images/logo.jpg';
import "../index.css"

const Reviews = () => {

  const [numReviews, setNumReviews] = useState(20);

  return (
    <>
      <Header /> 
      <div className='ReviewPage'>
        {[...Array(numReviews)].map((_, index) => (
          <div className='ReviewBox' key={index}>
            <div className='InnerBox'>
              <div className='FirstReview'>
                <img src={logo} alt='Logo' />
                <div className='ReviewRating'>
                  <span>Raj Kurane</span>
                  <div className='Rating'>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStarHalfAlt />
                  </div>
                </div>
                <div className='Quote'>
                  <FaQuoteRight />
                </div>
              </div>
              <div className='SecondReview'>
                <p>The love at first sight exists, guys... So this is my story. She was the prettiest girl that I've ever seen. I was in Disney, Magical Kingdom (5/5/2022). I will never forget that date. It was 9:45 pm, I was running at an attraction (Space Mountain, it's like a roller coaster) and a girl was running too with her little sister.</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Reviews;

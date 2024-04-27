import React, { useState } from 'react';
import "../index.css";
import Image from "../images/home2_image.jpeg";
import { FaTrash } from 'react-icons/fa';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddToCart = () => {

    const [deleteFromATC, setDeletefromATC] = useState([
        {
            id: 1,
            img: Image,
            title: 'Chicken Biryani',
            views: '12',
        },
        {
            id: 2,
            img: Image,
            title: 'Veg Biryani',
            views: '12',
        },
        {
            id: 3,
            img: Image,
            title: 'Dum Biryani',
            views: '12',
        },
        {
            id: 4,
            img: Image,
            title: 'Mutton Biryani',
            views: '12',
        },
        {
            id: 5,
            img: Image,
            title: 'Kauva Biryani',
            views: '12',
        }
    ])

    const notify = () => {
        toast.error('Oops! You removed the video from your ATC list.', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
          style: {
            background: "#ff6f61",
            color: "#ffffff", 
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
            fontSize: "16px",
            fontWeight: "bold", 
          },
        });
        console.log('ATC video remove.');
    };
    
    const handleDeleteClick = (id) => {
        const updatedVideos = deleteFromATC.filter(video => video.id !== id);
        setDeletefromATC(updatedVideos);
        notify(); 
    };

    return (
        <>
            <div className='AddToCart'>
                <div className='ATClist'>

                    <div className='ATCtop'>
                        <div className='TopLeft'>
                            <span>My Cart</span>
                            <span>{deleteFromATC.length} items</span>
                        </div>
                        <div className='TopRight'>
                            <span>Cart Total</span>
                            <span>$ 40</span>
                        </div>
                        <div className='TopLine'></div>
                    </div>

                    <div className='ATCmid'>
                        {deleteFromATC.map(video => (
                            <div key={video.id} className='ATCvideos'>
                                <div className='ATCvideosImage'>
                                    <img src={video.img} alt="Video Thumbnail" />
                                </div>

                                <div className='ATCvideosinfo'>
                                    <div className='ATCvideosTitle'>
                                        <span>{video.title}</span>
                                    </div>

                                    <div className='ATCdivide'>
                                        <div className='ATCvideosViews'>
                                            <span>{video.views} views</span>
                                        </div>

                                        <div className="deleteButton" title={"Click to delete the video."} onClick={() => handleDeleteClick(video.id)}>
                                            <span>
                                                <FaTrash />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='ATCbottom'>
                        <div className='PaymentLine'></div>
                        <button className='PaymentButton' title={"Click to Proceed the Payment."} type='submit'>
                            Proceed To Payment
                        </button>
                    </div>

                </div>
            </div>

            <ToastContainer />
        </>
    )
}

export default AddToCart;

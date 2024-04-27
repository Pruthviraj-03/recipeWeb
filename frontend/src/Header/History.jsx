import React, { useState } from 'react'
import Header from "./Header"
import "../index.css"
import Image from "../images/home2_image.jpeg"
import { FaTrash } from 'react-icons/fa'
import { Bounce, ToastContainer, toast } from 'react-toastify';

const History = () => {

    const [historyData, setHistoryData] = useState([
        {
            id: 1,
            img: Image,
            title: 'Chicken Biryani',
            views: '12',
            desc: 'Chicken Biryani is a very nice recipe',
        },
        {
            id: 2,
            img: Image,
            title: 'Veg Biryani',
            views: '12',
            desc: 'Veg Biryani is a very nice recipe',
        },
        {
            id: 3,
            img: Image,
            title: 'Dum Biryani',
            views: '12',
            desc: 'Dum Biryani is a very nice recipe',
        },
        {
            id: 4,
            img: Image,
            title: 'Mutton Biryani',
            views: '12',
            desc: 'Mutton Biryani is a very nice recipe',
        },
        {
            id: 5,
            img: Image,
            title: 'Kauva Biryani',
            views: '12',
            desc: 'Kauva Biryani is a very nice recipe',
        }
    ])

    const notify = () => {
        toast.error('Oops! You removed the video from your history.', {
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
        console.log('Dislike done.');
      };
    
    const handleDeleteClick = (id) => {
    const updatedVideos = historyData.filter(video => video._id !== id);
    setHistoryData(updatedVideos);
    notify(); 
    };

  return (
    <>
        <Header />

        <div className='UserHistory'>
                <span className='Hspan1'>Your History</span><br></br><br></br>
                <span className='Hspan2'>Feb 1</span>

                {historyData.map((video) => (
                    <div className='historyVideos' key={video.id}>
                        <div className='historyVideosImage'>
                            <img src={video.img} alt='Video Thumbnail' />
                        </div>

                        <div className='historyVideosinfo'>
                            <div className='historyVideosTitle'>
                                <span>{video.title}</span>
                            </div>

                            <div className='historyDivide'>
                                <div className='historyVideosViews'>
                                    <span>{`${video.views} views`}</span>
                                </div>

                                <div
                                    className='deleteButton'
                                    title={'Click to delete the video.'}
                                    onClick={() => handleDeleteClick(video.id)}
                                >
                                    <span>
                                        <FaTrash />
                                    </span>
                                </div>
                            </div>

                            <div className='historyVideosDesc'>
                                <span>{video.desc}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        <ToastContainer />
    </>
  )
}

export default History
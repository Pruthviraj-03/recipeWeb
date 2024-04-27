import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Like = (props) => {
  const [likedVideos, setLikedVideos] = useState(props.likedVideos || []);

  useEffect(() => {
    console.log('Props likedVideos in Like component:', props.likedVideos);
    setLikedVideos(props.likedVideos || []);
  }, [props.likedVideos]);
  
  const notify = () => {
    toast.error('Oops! You removed the video from your liked list.', {
      position: "top-left",
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
    const updatedVideos = likedVideos.filter(video => video._id !== id);
    setLikedVideos(updatedVideos);
    notify(); 
  };
  
  return (
    <>
      <div className='likeList'>
        {likedVideos.map((video,index) => (
          <div className='likevideos' key={index}>
            <div className='likevideosImage'>
              <img src={video.image} alt="Video Thumbnail" />
            </div>

            <div className='likevideosinfo'>
              <div className='likevideosTitle'>
                <span>{video.title}</span>
              </div>

              <div className='Divide'>
                <div className='likevideosViews'>
                  <span>{video.views} views</span>
                </div>

                <div className="deleteButton" title={"Click to delete the video."} onClick={() => handleDeleteClick(video._id)}>
                  <span>
                    <FaTrash />
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </>
  );
};

export default Like;

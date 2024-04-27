import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { FaEye, FaClock, FaHeart, FaDollarSign } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../images/raj-removebg-preview.png";
import "../index.css";
import Header from '../Header/Header';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Like from '../Header/Like';

const Dinner = () => {

  const notifyFreeVideo = () => {
    toast.info('Great choice! You successfully like the video.', {
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
          color: "#ffffff", 
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
          fontSize: "16px",
          fontWeight: "bold", 
        },
      });
      console.log('Like done.')
  }

  const notifyPaidVideo = () => {
    toast.error('Oops! This video is paid. Please add it to your cart to watch.', {
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
  };
  
  const navigate = useNavigate();

  const location = useLocation();
  const [searchResults, setSearchResults] = useState([])
  const [videos, setVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [hasShuffled, setHasShuffled] = useState(false);
  const [likedVideos, setLikedVideos] = useState([]);

  const handleVideoClick = (video) => {
    console.log('Video clicked:', video);
    setLikedVideos((prevLikedVideos) => [...prevLikedVideos, 
      { _id: video._id, title: video.title, image: video.thumbnailURL, views: video.views }]);
  };

  const fetchVideos = async () => {
    try {
      setLoadingVideos(true);
      const response = await axios.get('http://localhost:8000/api/v2/videos');
      const DinnerVideos = response.data.filter(video => video.Category === 'Dinner');
      setVideos(DinnerVideos);
      setHasShuffled(false); 
    } catch (error) {
      console.error('Error fetching videos:', error.message);
    } finally {
      setLoadingVideos(false);
    }
  };
  

  useEffect(() => {
    fetchVideos();
  }, []);

  // Function to shuffle an array using Fisher-Yates algorithm
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Shuffle the array after it has been fetched and state is updated
  useEffect(() => {
    if (!hasShuffled && videos.length > 0) {
      setVideos((prevOtherVideos) => shuffleArray(prevOtherVideos));
      setHasShuffled(true); // Set the flag to true after shuffling
    }
  }, [hasShuffled, videos]);

  const formatViews = (views) => {
    if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + 'M';
    } else if (views >= 1000) {
      return (views / 1000).toFixed(1) + 'k';
    } else {
      return views.toString();
    }
  };

  const handleSearch = (searchTerm) => {
    if(searchTerm && videos && videos.length > 0) {
      const filteredResults = videos.filter((video) => 
      video.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredResults);
    }
  };

  useEffect(() => {
    if(location && location.state) {
      let searchTerm= location?.state?.searchTerm
    handleSearch(searchTerm)
    }
  },[location , videos])
  
return (
  <>
    <Header onSearch={handleSearch} />
    {/* <Like likedVideos={likedVideos} /> */}

    <div className='HomePage'>
      <div className="Cards">
        {searchResults.length > 0 ? (
          searchResults.map((video, index) => (
            <div key={index}>
              <div className="Card">
                <button
                  onClick={() => navigate(`/nextCard`, { state: { videoInfo: video } })}
                >
                  <Link to={{
                    pathname: '/nextCard',
                    state: { videoInfo: video }
                  }} key={video._id}>
                    <a href={video.videoURL} target="_blank" rel="noopener noreferrer">
                      <div className="video">
                        <img className="videoImage" src={video.thumbnailURL} alt="Video Thumbnail" />
                        <div className="icons">
                          <div className="one">
                            <span className="eye">
                              <FaEye />
                            </span>
                            <span className="views">{formatViews(video.views)}</span>
                          </div>
                          <div className="two">
                            <span className="clock">
                              <FaClock />
                            </span>
                            <span className="duration">{video.duration}</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </Link>
                </button>
                  <div className="cardInfo">
                    <div className="cardLogo">
                      <img src={logo} alt="Channel Logo" />
                    </div>
                    <div className="cardTitle">
                      <span>{video.title}</span>
                    </div>
                    <div className="freeOrpaid">
                      <span>
                        {video.isPaid ? (
                          <FaDollarSign onClick={notifyPaidVideo} />
                        ) : (
                          <FaHeart onClick={notifyFreeVideo} />
                        )}
                      </span>
                    </div>  
                  </div>   
              </div>
            </div>
          ))

        ) : (
          videos.map((video) => (
            <div key={video._id}>
                  <div className="Card" key={video._id}>
                    <button
                      onClick={() => navigate(`/nextCard`, { state: { videoInfo: video } })}
                    >
                      <Link to={{
                        pathname: '/nextCard',
                        state: { videoInfo: video }
                      }} key={video._id}>
                          <a href={video.videoURL} target="_blank" rel="noopener noreferrer">
                            <div className="video">
                              <img className="videoImage" src={video.thumbnailURL} alt="Video Thumbnail" />
                              <div className="icons">
                                <div className="one">
                                  <span className="eye">
                                    <FaEye />
                                  </span>
                                  <span className="views">{formatViews(video.views)}</span>
                                </div>
                                <div className="two">
                                  <span className="clock">
                                    <FaClock />
                                  </span>
                                  <span className="duration">{video.duration}</span>
                                </div>
                              </div>
                            </div>
                          </a>
                      </Link>
                    </button>
                    <div className="cardInfo">
                      <div className="cardLogo">
                        <img src={logo} alt="Channel Logo" />
                      </div>
                      <div className="cardTitle">
                        <span>{video.title}</span>
                      </div>
                      <div className="freeOrpaid">
                        <span>
                          {video.isPaid ? (
                            <FaDollarSign onClick={notifyPaidVideo} />
                          ) : (
                            <FaHeart onClick={notifyFreeVideo} />
                          )}
                        </span>
                      </div>
                    </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>

    <ToastContainer />
  </>
);
};

export default Dinner;


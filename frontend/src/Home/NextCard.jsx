import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaShare, FaHeart, FaDollarSign, FaDownload } from 'react-icons/fa';
import logo from '../images/raj-removebg-preview.png';
import Header from '../Header/Header';
import { Link, useNavigate } from 'react-router-dom';
import "../index.css";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import Share from './Share';


const NextCard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [otherVideos, setOtherVideos] = useState([]);
  const [error, setError] = useState(null);
  const [hasShuffled, setHasShuffled] = useState(false);
  const [loadingVideos, setLoadingVideos] = useState(false);

  const toggleShareBox = () => {
    setIsShareModalOpen(!isShareModalOpen);
  };

  const handleVideoClick = (otherVideo) => {
    // Close the share modal when a video is clicked
    setIsShareModalOpen(false);

    // Navigate to the next card with the selected video
    navigate(`/nextCard`, { state: { videoInfo: otherVideo } });

    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const notifyDownloadVideo = () => {
    toast.info('Great choice! You successfully Download the video.', {
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
  };

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
     
  const formatViews = (views) => {
    if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + 'M';
    } else if (views >= 1000) {
      return (views / 1000).toFixed(1) + 'k';
    } else {
      return views?.toString();
    }
  };
  
  const formatLikes = (likes) => {
    if (likes >= 1000000) {
      return (likes / 1000000).toFixed(1) + 'M';
    } else if (likes >= 1000) {
      return (likes / 1000).toFixed(1) + 'k';
    } else {
      return likes?.toString();
    }
  };
  
  const extractVideoIdFromUrl = (url) => {
    // Example URL: https://www.youtube.com/watch?v=C5-AuvqFFys
    const match = url?.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/.*(?:\/|v=)([^&?]+)/i);
    return match ? match[1] : null;
  };

  const videoId = extractVideoIdFromUrl(location?.state?.videoInfo?.videoURL);

  const handleSubmit = (searchTerm) => {
    navigate('/',{state:{searchTerm}})
  }

  useEffect(() => {
    const fetchOtherVideos = async () => {
      if (!location?.state || !location?.state?.videoInfo) {
        console.log("IF called...");
        
        console.error("Video information not available.");
        navigate('/');
      } else {
        console.log("else called...");
        
        try {
          setLoadingVideos(true);
          const response = await fetch(`http://localhost:8000/api/v2/videos`);
          const data = await response.json();
          setError(null);
          setOtherVideos(data);
          setHasShuffled(false);
          setLoadingVideos(false);
        } catch (error) {
          setLoadingVideos(false);
          console.error('Error fetching videos:', error.message);
        }
      }
    };
  
    fetchOtherVideos();
  }, [location]);
  

  // Function to shuffle an array using Fisher-Yates algorithm
  const shuffleArray = (array) => {
    console.log("shuffleArray calledd....")
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Shuffle the array after it has been fetched and state is updated
  useEffect(() => {
    if (!hasShuffled && otherVideos.length > 0) {
      setOtherVideos((val) => shuffleArray(val));
      setHasShuffled(true); 
    }
  }, [hasShuffled, otherVideos]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
    <Header onSearch={handleSubmit} />
    <div className='NextPage'>
      <div className='nextCard'>
        <iframe
          title={location?.state?.videoInfo?.title}
          width="60%"
          height="400px"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
          frameBorder="0"
          allowFullScreen
        ></iframe>

        <div className='nextCardInfo'>
          <div className='nextCardIcon'>
            <img src={logo} alt='Logo' />
          </div>

          <div className='nextCardTitle'>
            <span>{location?.state?.videoInfo?.title}</span>
          </div>

          <div className='nextCardLike' title='Like' onClick={notifyFreeVideo}>
            <span>
              <FaHeart />
            </span>
            <span>{formatLikes(location?.state?.videoInfo?.likes)}</span>
          </div>

          <div className='nextCardShare' title='Share' onClick={toggleShareBox}>
            <span>
              <FaShare />
            </span>
            <span>Share</span>
          </div>

          <div className='nextCardDownload' title='Download' onClick={notifyDownloadVideo}>
            <span>
              <FaDownload />
            </span>
          </div>
        </div>

        <div className='nextCardDescription'>
          <div className='allSpans'>
            <span className='pSpan'>{formatViews(location?.state?.videoInfo?.views)} views</span>
            <br />
            <span  className='pSpan'>Description:</span>
            <span className='cSpan'>{location?.state?.videoInfo?.description}</span>
            <br />
            <span className='pSpan'>Language:</span>
            <span className='cSpan'>{location?.state?.videoInfo?.language}</span>
            <br />
            <span className='pSpan'>Category:</span>
            <span className='cSpan'>{location?.state?.videoInfo?.Category}</span>
            <br />
          </div>
        </div>

        {otherVideos.length > 0 && (
          <div className='otherCards'>
            {otherVideos.map((otherVideo, index) => (
              <div key={index} className='vd'>

                <button
                  onClick={() => handleVideoClick(otherVideo)}
                >

                  <Link to={{
                    pathname: '/nextCard',
                    state: { videoInfo: otherVideo }
                  }} key={otherVideo._id}>

                      <div className='othervideos'>
                        <div className='othervideosImage'>
                          <img src={otherVideo.thumbnailURL} alt="Video Thumbnail" />
                        </div>

                        <div className='othervideosinfo'>
                          <div className='othervideosTitle'>
                            <span>{otherVideo.title}</span>
                          </div>

                          <div className='divide'>
                            <div className='othervideosViews'>
                              <span>{formatViews(otherVideo.views)} views</span>
                            </div>

                            <div className="freeOrpaid2">
                              <span>
                                {otherVideo.isPaid ? <FaDollarSign /> : <FaHeart />}
                              </span>
                            </div>
                        </div>
                        
                        </div>
                      </div>
                    </Link>
                </button>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>

    {isShareModalOpen && (
        <div className="ShareBoxOverlay">
          <Share videoUrl={`https://www.youtube.com/watch?v=${videoId}`} />
        </div>
      )}
    <ToastContainer />
    </>
  );

};

export default NextCard;
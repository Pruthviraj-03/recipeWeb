import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import EmbedImage from "../images/Embed.png";
import WhatsappImage from "../images/Whatsap.webp";
import FacebookImage from "../images/facebook.png";
import XImage from "../images/X.webp";
import EmailImage from "../images/Email.png";
import LinkedinImage from "../images/Linedin.webp";
import { Bounce, ToastContainer, toast } from 'react-toastify';


const Share = ({ videoUrl }) => {
    const [urlText, setUrlText] = useState(videoUrl);
    const [isShareOpen, setIsShareOpen] = useState(true);

    const notifyCopyVideoURL = () => {
        toast.success('Great! Video URL is copied into the clipboard.', {
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
            background: "#4CAF50",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
            fontSize: "16px",
            fontWeight: "bold", 
          },
        });
        console.log('Copy done.');
      };
      

    const handleCopy = () => {
        try {
        navigator.clipboard.writeText(urlText);
        notifyCopyVideoURL()
        } catch (err) {
        console.error('Unable to copy URL', err);
        }
    };

    // const generateEmbedCode = () => {
    //     const embedCode = `<iframe width="560" height="315" src="${videoUrl}" frameborder="0" allowfullscreen></iframe>`;
    //     return embedCode;
    // };

    const handleShare = (platform) => {
        switch (platform) {
            // case 'embed':
                // const embedCode = generateEmbedCode();
                // setUrlText(embedCode);
                // break;
            case 'whatsapp':
                window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(videoUrl)}`, '_blank');
                break;
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(videoUrl)}`, '_blank');
                break;
            case 'x':
                window.open(`https://www.x.com/sharer/sharer.php?u=${encodeURIComponent(videoUrl)}`, '_blank');
                break;
            case 'email':
                window.open(`https://www.email.com/sharer/sharer.php?u=${encodeURIComponent(videoUrl)}`, '_blank');
                break;
            case 'linkedin':
                window.open(`https://www.linkedin.com/sharer/sharer.php?u=${encodeURIComponent(videoUrl)}`, '_blank');
                break;
            default:
                break;
        }
    };

    const handleClose = () => {
        setIsShareOpen(false);
        console.log('Share box closed');
    };

    return (
        <>
        {isShareOpen && (
            <div className='ShareBox'>
            <div className='ShareDiv'>
                <div className='ShareTop'>
                <span>Share</span>
                <div className="CloseButton" title='Close' onClick={handleClose}>
                    <FaTimes />
                </div>
                </div>

                <div className='ShareMid'>
                    <div className='EmbedShare' title='Embed' onClick={() => handleShare('embed')}>
                        <div className='EmbedImage'>
                        {/* <img src={EmbedImage} alt="Embed" /> */}
                        </div>
                        <span>Embed</span>
                    </div>
                    <div className='WhatsappShare' title='Whatsapp' onClick={() => handleShare('whatsapp')}>
                        <div className='WhatsappImage'>
                        {/* <img src={WhatsappImage} alt="WhatsApp" /> */}
                        </div>
                        <span>Whatsapp</span> 
                    </div>
                    <div className='FacebookShare' title='Facebook' onClick={() => handleShare('facebook')}>
                        <div className='FacebookImage'>
                        {/* <img src={FacebookImage} alt="Facebook" /> */}
                        </div>
                        <span>Facebook</span>
                    </div>
                    <div className='XShare' title='X' onClick={() => handleShare('x')}>
                        <div className='XImage'>
                        {/* <img src={XImage} alt="X" /> */}
                        </div>
                        <span>X</span>
                    </div>
                    <div className='EmailShare' title='Email' onClick={() => handleShare('email')}>
                        <div className='EmailImage'>
                        {/* <img src={EmailImage} alt="Email" /> */}
                        </div>
                        <span>Email</span>
                    </div>
                    <div className='LinkedinShare' title='Linkedin' onClick={() => handleShare('linkedin')}>
                        <div className='LinkedinImage'>
                        {/* <img src={LinkedinImage} alt="Linkedin" /> */}
                        </div>
                        <span>Linkedin</span>
                    </div>
                    </div>

                    <div className="ShareBottom">
                    <div className='ShareLinkBox'>
                        <span id="shareLink">{urlText}</span>
                        <button type='button' title='Copy' onClick={handleCopy}>
                            Copy
                        </button>
                    </div>
                </div>
            </div>
            </div>
        )}

        <ToastContainer />
        </>
    );
};

export default Share;

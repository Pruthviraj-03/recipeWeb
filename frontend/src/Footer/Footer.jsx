import React from 'react'
import {useNavigate, Link} from 'react-router-dom'
import logo from "./images/raj-removebg-preview.png"
import YT from "./images/yt.png"
import FB from "./images/facebook.png"
import INSTA from "./images/insta.png"
import LI from "./images/linkedin.png"
import "./index.css"

const Footer = () => {

    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/');
    }
    
  return (
    <>
        <div className='Footer'>

            <div className='col1'>

                <div className='imagelogo'>
                    <img src={logo} onClick={handleSubmit} alt="logo" />     
                </div>
                <div className='info'>
                    <p>
                        Explore a wide array of recipes, ranging from quick and easy meals

                        to gourmet dishes. We offer both free and premium recipe content, including step-by-step video tutorials

                        and detailed written instructions. Join us, elevate your cooking skills and let's cook up something amazing together!
                    </p>
                </div>

            </div>

            <div className='col2'>

                  <div className="quick-links">
                    <span>Quick links</span><br></br>
                    <ul>
                      <Link className='linktag3'  to="/login">Home</Link><br></br><br></br>
                      <Link className='linktag3'  to="/login">Category</Link><br></br><br></br>
                      <Link className='linktag3'  to="/login">Free</Link><br></br><br></br>
                      <Link className='linktag3'  to="/login">Scripts</Link><br></br><br></br>
                      <Link className='linktag3'  to="/login">About Us</Link><br></br><br></br>
                      <Link className='linktag3'  to="/login">Reviews</Link><br></br><br></br>
                    </ul>
                  </div>

            </div>

            <div className='col3'>

                <div className='contactus'>
                    <span>Contact Us</span>
                    <p>
                        Our company Recipe hub, was founded in 2024 by Kurane Brothers with a vision to revolutionize the cook industry. Currently,
                        Raj Kurane serves as the CEO, leading our dedicated team towards innovation and success. With a focus on cutting-edge
                        technology and exceptional customer service, we strive to provide the best solutions to our users. For any queries or
                        assistance, please feel free to reach out to us at <a className='email' href="mailto:recipehub@gmail.com">recipehub@gmail.com</a>. We're here to
                            assist you and address any concerns you may have.
                    </p>
                </div>
            </div>

            <div className='col4'>

                <div className='opinion'>
                    <span>Give your opinion and idea's</span>
                    <input type='text' name='opinion'></input>
                    <button className="btn-hover color-3" type="reset">Submit</button> 
                </div>

                <div className='followUs'>
                    <span>Follow Us On</span>

                    <div className='icons'>
                        <div className='social'>
                            <a href="https://www.youtube.com/account">
                            <img className='sy-image' src= {YT} alt="YT" />
                            </a>
                        </div>

                        <div className='social'>
                            <a href="https://www.facebook.com/campaign/landing.php?campaign_id=14884913640&extra_1=s%7Cc%7C589460569891%7Cb%7Csign%20in%20to%20facebook%7C&placement=&creative=589460569891&keyword=sign%20in%20to%20facebook&partner_id=googlesem&extra_2=campaignid%3D14884913640%26adgroupid%3D128696221832%26matchtype%3Db%26network%3Dg%26source%3Dnotmobile%26search_or_content%3Ds%26device%3Dc%26devicemodel%3D%26adposition%3D%26target%3D%26targetid%3Dkwd-11079269337%26loc_physical_ms%3D1007785%26loc_interest_ms%3D%26feeditemid%3D%26param1%3D%26param2%3D&gclid=CjwKCAjw69moBhBgEiwAUFCx2GryS2OfWN72NGfwO1YRC25n0VkM3J1uzaD5mO8ercdBvtBw-hFSUBoCsaIQAvD_BwE">
                            <img className='sf-image' src= {FB} alt="FB" />
                            </a>
                        </div>

                        <div className='social'>
                            <a href="https://www.instagram.com/accounts/login/?hl=en">
                            <img className='si-image' src= {INSTA} alt="INSTA" />
                            </a>
                        </div>

                        <div className='social'>
                            <a href="https://www.linkedin.com/login">
                            <img className='sl-image' src= {LI} alt="LI" />
                            </a>
                        </div>
                    </div>
                </div>

            </div>

            <div className='line'>
                <div className="simple-line"></div>
            </div>

            <div className='CP'>
                <p>© Recipe hub 2024</p>
                <ul>
                    <Link className='linktag2'  to="/termsofuse">Terms of Use</Link>
                    <br></br>
                    <Link className='linktag2' to="/privacypolicy">Privacy Policy</Link>
                </ul>
            </div>

        </div>
    </>
  )
}

export default Footer
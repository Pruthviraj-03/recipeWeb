import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FaDownload, FaHistory, FaMoon, FaSignOutAlt } from 'react-icons/fa';
import UserPhoto from "../images/logo2.png"

const UserProfile = () => {

    const navigate = useNavigate();

    const handleDownloadClick = () => {
        navigate('/downloads');
    };

    const handleHistoryClick = () => {
        navigate('/history');
    };

    const handleLogOutClick = () => {
        navigate('/');
    };


  return (
    <>
        <div className='UserProfile'>
            <div className='UPList'>

                <div className='UserData'>
                    <div className='PP'>
                        <img src={UserPhoto}></img>
                    </div>
                    <div className='UandE'>
                        <span name='Username'>Raj Kurane</span>
                        <span name='E-mail'>raj.kurane03@gmail.com</span>
                    </div>
                </div>

                <div className='Download' onClick={handleDownloadClick} title='Downloads'>
                    <span className='DI'><FaDownload /></span>
                    <span className='DW'>Downloads</span>
                </div>

                <div className='History' onClick={handleHistoryClick} title='History'>
                    <span className='HI'><FaHistory /></span>
                    <span className='HW'>History</span>
                </div>

                <div className='Appearance' title='Appearance'>
                    <span className='AI'><FaMoon /></span>
                    <span className='AW'>Appearance:</span>
                    <select>
                        <option value="dark">Dark</option>
                        <option value="light">Light</option>
                    </select>
                </div>

                <div className='LogOut' onClick={handleLogOutClick} title='Log out'>
                    <span className='LI'><FaSignOutAlt /></span>
                    <span className='LW'>Log out</span>
                </div>

            </div>
        </div>
    </>
  )
}

export default UserProfile
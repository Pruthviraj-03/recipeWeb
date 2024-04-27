import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import logo from "../images/raj-removebg-preview.png"
import { FaSearch, FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa'
import Like from "./Like"
import "../index.css"
import UserProfile from './UserProfile'
import AddToCart from './AddToCart'

const Header = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [likeListVisible, setLikeListVisible] = useState(false);
  const [userProfileVisible, setUserProfileVisible] = useState(false);
  const [addToCartVisible, setAddToCartVisible] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = () => {
    setSearchTerm("");
    navigate('/');
    handleRefreshClick();
  };

  const handleCategorySubmit = () => {
    setSearchTerm("");
    navigate('/category');
    handleRefreshClick();
  };

  const handleBreakfastSubmit = () => {
    setSearchTerm("");
    navigate('/category/breakfast');
    handleRefreshClick();
  };

  const handleLunchSubmit = () => {
    setSearchTerm("");
    navigate('/category/lunch');
    handleRefreshClick();
  };

  const handleSupperSubmit = () => {
    setSearchTerm("");
    navigate('/category/supper');
    handleRefreshClick();
  };

  const handleDinnerSubmit = () => {
    setSearchTerm("");
    navigate('/category/dinner');
    handleRefreshClick();
  };

  const handleFreeSubmit = () => {
    setSearchTerm("");
    navigate('/free');
    handleRefreshClick();
  };

  const handleScriptsSubmit = () => {
    setSearchTerm("");
    navigate('/scripts');
    handleRefreshClick();
  };

  const handleSchickenSubmit = () => {
    setSearchTerm("");
    navigate('/scripts/chicken');
    handleRefreshClick();
  };

  const handleSdessertSubmit = () => {
    setSearchTerm("");
    navigate('/scripts/dessert');
    handleRefreshClick();
  };

  const handleSseafoodSubmit = () => {
    setSearchTerm("");
    navigate('/scripts/seafood');
    handleRefreshClick();
  };

  const handleSbreakfastSubmit = () => {
    setSearchTerm("");
    navigate('/scripts/breakfast');
    handleRefreshClick();
  };

  const handleSvegetarianSubmit = () => {
    setSearchTerm("");
    navigate('/scripts/vegetarian');
    handleRefreshClick();
  };

  const handleSitalianSubmit = () => {
    setSearchTerm("");
    navigate('/scripts/italian');
    handleRefreshClick();
  };

  const handleSjapaneseSubmit = () => {
    setSearchTerm("");
    navigate('/scripts/japanese');
    handleRefreshClick();
  };

  const handleSmexicanSubmit = () => {
    setSearchTerm("");
    navigate('/scripts/mexican');
    handleRefreshClick();
  };

  const handleSfrenchSubmit = () => {
    setSearchTerm("");
    navigate('/scripts/french');
    handleRefreshClick();
  };

  const handleSindianSubmit = () => {
    setSearchTerm("");
    navigate('/scripts/indian');
    handleRefreshClick();
  };
  const handleReviewsSubmit = () => {
    setSearchTerm("");
    navigate('/reviews');
    handleRefreshClick();
  };

  const handleRefreshClick = () => {
    window.location.reload();
    setSearchTerm("");
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === '') {
      navigate('/not-found');
    }
      onSearch(searchTerm);
  }

  const toggleLikeList = () => {
    setLikeListVisible(!likeListVisible);
  };

  const toggleUserProfile = () => {
    setUserProfileVisible(!userProfileVisible)
  }

  const toggleAddToCart = () => {
    setAddToCartVisible(!addToCartVisible)
  }

  return (
    <>
      <div className='Header'>

        <div className='Headerlogo' title='Get Your Recipe' onClick={() => {  handleSubmit(); }}>
          <img src={logo} alt="logo" />    
        </div>

        <form onSubmit={handleSearch} className="search-bar">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleChange}
          />
          <div className='buttons' title='Search'>
            <button type='submit'>
              <FaSearch />
            </button>
          </div>
        </form>

        <div className="favIcon" onClick={toggleLikeList} title='Likelist'>
          <FaHeart className="icon" />
        </div>

        <div className="ATCicon" onClick={toggleAddToCart} title='Cartlist'>
          <FaShoppingCart className="icon" />
        </div>

        <div className="ProfileIcon" onClick={toggleUserProfile} title='Profile'>
          <FaUser className="icon" />
        </div>

        <nav className="navbar">
          <ul>
            <li><Link onClick={() => { handleRefreshClick(); handleSubmit(); }} to="/" title='Home'>Home</Link></li>

            <li><Link onClick={handleCategorySubmit} to="/category" title='Category'>Category</Link>
              <div className="Category-drawer">
                <Link onClick={handleBreakfastSubmit} to="/category/breakfast">Breakfast</Link>
                <Link onClick={handleLunchSubmit} to="/category/lunch">Lunch</Link>
                <Link onClick={handleSupperSubmit} to="/category/supper">Supper</Link>
                <Link onClick={handleDinnerSubmit} to="/category/dinner">Dinner</Link>
              </div>
            </li>

            <li><Link onClick={handleFreeSubmit} to="/free" title='Free'>Free</Link></li>

            <li>
              <Link onClick={handleScriptsSubmit} to="/scripts" title='Scripts'>Scripts</Link>
              <div className='Scripts-drawer'>
                <div className='ScriptsCategory-drawer'>
                  <Link>Category</Link>
                  <div className='Cuisine-links'>
                  <Link onClick={handleSchickenSubmit} to="/scripts/chicken">Chicken</Link>
                  <Link onClick={handleSdessertSubmit} to="/scripts/dessert">Dessert</Link>
                  <Link onClick={handleSseafoodSubmit} to="/scripts/seafood">Seafood</Link>
                  <Link onClick={handleSbreakfastSubmit} to="/scripts/breakfast">Breakfast</Link>
                  <Link onClick={handleSvegetarianSubmit} to="/scripts/vegetarian">Vegetarian</Link>
                  </div>
                </div>
                <div className='ScriptsArea-drawer'>
                  <Link>Area</Link>
                  <div className='Cuisine-links'>
                  <Link onClick={handleSitalianSubmit} to="/scripts/italian">Italian</Link>
                  <Link onClick={handleSjapaneseSubmit} to="/scripts/japanese">Japanese</Link>
                  <Link onClick={handleSmexicanSubmit} to="/scripts/mexican">Mexican</Link>
                  <Link onClick={handleSfrenchSubmit} to="/scripts/french">French</Link>
                  <Link onClick={handleSindianSubmit} to="/scripts/indian">Indian</Link>
                  </div>
                </div>
              </div>
            </li>

            <li><Link onClick={handleReviewsSubmit} to="/reviews" title='Reviews'>Reviews</Link></li>
          </ul>
        </nav>

      </div>

      {likeListVisible && (
        <div className="likeListOverlay">
          <Like />
        </div>
      )}

      {addToCartVisible && (
        <div className="AddToCartOverlay">
          <AddToCart />
        </div>
      )}

      {userProfileVisible && (
        <div className="UserProfileOverlay">
          <UserProfile />
        </div>
      )}

    </>
  )
}


export default Header

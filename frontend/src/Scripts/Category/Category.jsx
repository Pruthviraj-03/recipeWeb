import React, { useState, useEffect } from 'react';
import Header from '../../Header/Header';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../images/raj-removebg-preview.png';
import axios from 'axios';

const Category = ({ category }) => {
    const location = useLocation();
    const [searchResults, setSearchResults] = useState([]);
    const [scripts, setScripts] = useState([]);
    const [hasShuffled, setHasShuffled] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/scriptOpen");
    };

    useEffect(() => {
      const fetchAllRecipes = async () => {
          try {
              const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
              setScripts(response.data);
              setHasShuffled(false);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };
  
      fetchAllRecipes();
  }, []);
  

    const shuffleArray = (array) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    useEffect(() => {
        if (!hasShuffled && scripts.length > 0) {
            setScripts((prevOtherScripts) => shuffleArray(prevOtherScripts));
            setHasShuffled(true);
        }
    }, [hasShuffled, scripts]);

    const handleSearch = (searchTerm) => {
        if (searchTerm && scripts && scripts.length > 0) {
            const filteredResults = scripts.filter((script) =>
                script.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchResults(filteredResults);
        } else {
            setSearchResults([]);
        }
    };

    useEffect(() => {
        if (location && location.state) {
            let searchTerm = location?.state?.searchTerm;
            handleSearch(searchTerm);
        }
    }, [location, scripts]);

    return (
        <>
            <Header onSearch={handleSearch} />
            <div className='ScriptPage'>
                {(searchResults.length > 0 ? searchResults : scripts).map(script => (
                    <div key={script.idMeal} className='ScriptBox'>
                        <div className='ScriptImage'>
                            <img src={script.strMealThumb} alt={script.strMeal} />
                        </div>
                        <div className='ScriptInfo'>
                            <div className='ScriptFirst'>
                                <img src={logo} alt='Logo' />
                                <span className='ScriptTitle'>{script.strMeal}</span>
                            </div>
                            <div className='ScriptSecond'>
                                <span>Discover the secret ingredients and step-by-step instructions for this delicious recipe! Click here to unveil the culinary magic.</span>
                                <Link onClick={handleClick} className='ScriptNext'>See more...</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Category;

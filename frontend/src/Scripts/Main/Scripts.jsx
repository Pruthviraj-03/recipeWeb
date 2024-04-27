import React, { useState, useEffect, useCallback } from 'react';
import Header from '../../Header/Header';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../images/raj-removebg-preview.png';
// import logo2 from '../../images/logo.jpg';
import axios from 'axios';


const Scripts = () => {
    const location = useLocation();
    const [searchResults, setSearchResults] = useState([]);
    const [scripts, setScripts] = useState([]);
    const [hasShuffled, setHasShuffled] = useState(false);
    const navigate = useNavigate();
    
    const handleClick = (script) => {
        console.log("Script clicked:", script);
        navigate(`/scriptOpen/${script.idMeal}`);
    };

    const handleSearch = useCallback((searchTerm) => {
        if (searchTerm && scripts && scripts.length > 0) {
            const filteredResults = scripts.filter((script) =>
                script.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchResults(filteredResults);
        } else {
            setSearchResults([]);
        }
    }, [scripts]); 

    useEffect(() => {
        const fetchAllRecipes = async () => {
            try {
                const allRecipes = [];
                const categories = ["Beef", "Chicken", "Dessert", "Lamb", "Miscellaneous", "Pasta", "Pork", "Seafood", "Side", "Starter", "Vegan", "Vegetarian", "Breakfast", "Goat"];
                for (const category of categories) {
                    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
                    allRecipes.push(...response.data?.meals);
                }
                setScripts(allRecipes);
                setHasShuffled(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchAllRecipes();
    }, []);

    useEffect(() => {
        if (!hasShuffled && scripts.length > 0) {
            setScripts((prevOtherScripts) => shuffleArray(prevOtherScripts));
            setHasShuffled(true);
        }
    }, [hasShuffled, scripts]);

    useEffect(() => {
        if (location && location.state) {
            let searchTerm = location?.state?.searchTerm;
            handleSearch(searchTerm);
        }
    }, [location, handleSearch]);

    const shuffleArray = (array) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

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
                                {/* <img className='hover-img' src={logo2} alt='Logo' /> */}
                                <span className='ScriptTitle'>{script.strMeal}</span>
                            </div>
                            <div className='ScriptSecond'>
                                <span>Discover the secret ingredients and step-by-step instructions for this delicious recipe! Click here to unveil the culinary magic.</span>
                                <Link onClick={() => handleClick(script)} className='ScriptNext'>See more...</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Scripts;

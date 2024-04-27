import React, { useState, useEffect } from 'react';
import Header from '../../Header/Header';
import logo from '../../images/raj-removebg-preview.png';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ScriptOpen = () => {
    const { id } = useParams();
    const [scriptDetails, setScriptDetails] = useState(null);

    useEffect(() => {
        const fetchScriptDetails = async () => {
            try {
                const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                setScriptDetails(response.data.meals[0]);
            } catch (error) {
                console.error('Error fetching script details:', error);
            }
        };

        fetchScriptDetails();
    }, [id]);

    if (!scriptDetails) {
        return <div>Loading...</div>;
    }
  return (
    <>
      <Header />

      <div className='scriptOpen'></div>
        <div className='openBox'>

          <div className='TopOpen'>
            <img src={logo} alt='Logo' />
            <span>Chicken Biryani</span>
          </div>

          <div className='MidOpen'>
            <div className='DishImage'>
              <img src="" />
            </div>
            <div className='DishInstructions'>
              <span>Instructions</span><br></br>
              <span>In 5 min</span>
            </div>
          </div>

          <div className='BottomOpen'>
            <div className='OpenIngrediennts'>
              <span></span>
            </div>
          </div>

        </div>
    </>
  )
}

export default ScriptOpen
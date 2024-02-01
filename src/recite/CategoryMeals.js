import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from './Action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './GlobalStyles.css';

function CategoryMeals  () {
  const { categoryName } = useParams();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMealsByCategory = () => {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
        .then((response) => response.json())
        .then((data) => {
          setMeals(data.meals);
          setLoading(false); 
        })
       
    };
  
    fetchMealsByCategory();
  }, [categoryName]);
  

  if (loading) {
    return <div className='loading'>Loading...</div>;
  }

  const handleToggleFavorites = (mealId) => {
    const isMealInFavorites = favorites.some((meal) => meal.idMeal === mealId);

    if (isMealInFavorites) {
      dispatch(removeFromFavorites(mealId));
    } else {
      const selectedMeal = meals.find((meal) => meal.idMeal === mealId);
      dispatch(addToFavorites(selectedMeal));
    }
  };

  return (
    <div>
      <h2>Meals in {categoryName}</h2>
      <ul>
        {meals.map((meal) => (
          <li key={meal.idMeal}>
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <h3>{meal.strMeal}</h3>
            <button>
              <Link className="button" to={`/details/${meal.idMeal}`}>
                Show recipe
              </Link>
            </button>
            <button className="chercher" onClick={() => handleToggleFavorites(meal.idMeal)}>
              <FontAwesomeIcon
                icon={faHeart}
                color={favorites.some((favMeal) => favMeal.idMeal === meal.idMeal) ? 'red' : 'gray'}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryMeals;

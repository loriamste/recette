import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './GlobalStyles.css';
const Home = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
   
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then(response => response.json())
        .then(data => setMeals(data.meals));
 }, []);

  return (
    <div className="container">
      <h1>Current Recipes</h1>
      <ul>
        {meals.map((meal) => (
          <li key={meal.idMeal}>
            <Link to={`/details/${meal.idMeal}`}>
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <h5>{meal.strMeal}</h5>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

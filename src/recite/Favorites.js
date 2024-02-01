import React, { useState } from "react";
import { useSelector } from "react-redux";
import './GlobalStyles.css';
import { Link } from "react-router-dom";
const Favorites = () => {
  const { favorites } = useSelector((state) => state);

  const numberOfFavorites = favorites.length;

  if (!favorites || numberOfFavorites === 0) {
    return (
      <div className="div">
        <h2>Your list is empty</h2>
        <img src="/favoris.png" alt="Description de l'image" />
      </div>
    );
  }

  
  return (
    <div>
      <h2>Favorites</h2>
      <ul >
      {favorites.map((meal, index) => (
        <Link to={`/details/${meal.idMeal}`}>
        <li  key={index}>
            <img src={meal.strMealThumb} alt="meal" />
          <h2>{meal.strMeal}</h2>
        
        </li>
        </Link>
      ))}
      </ul>
     
    </div>
  );
};

export default Favorites;

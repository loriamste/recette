import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "./Action";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Mealitem = ({ data }) => {
  const [showRecipe, setShowRecipe] = useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const isMealInFavorites = favorites.some((meal) => meal.idMeal === data.idMeal);

  const handleToggleFavorites = () => {
    if (isMealInFavorites) {
      dispatch(removeFromFavorites(data.idMeal));
    } else {
      dispatch(addToFavorites(data));
    }
  };

  return (
    <div className="card">
      <Link to={`/details/${data.idMeal}`}>
        <img src={data.strMealThumb} alt="meal" />
      </Link>
      <div className="info">
        <h2>{data.strMeal}</h2>
        <p>{data.strArea} food</p>
        <button className="chercher"><Link className ="button"to={`/details/${data.idMeal}`}>Show recipe</Link></button>
        <button className="chercher" onClick={handleToggleFavorites}>
          <FontAwesomeIcon
            icon={faHeart}
            color={isMealInFavorites ? "red" : "gray"}
          />
        </button>

      </div>
      {showRecipe && (
        <div className="recipe">
          <h2>Recipe</h2>
          <p>{data.strInstructions}</p>
          {data.strSource && <a href={data.strSource}>Watch video</a>}
        </div>
      )}
    </div>
  );
};

export default Mealitem;

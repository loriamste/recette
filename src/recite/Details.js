import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "./Action";
import styles from './Details.css';

function Details () {
  const { idMeal } = useParams();
  const [mealDetails, setMealDetails] = useState(null);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
 const isMealInFavorites = favorites.some((meal) => meal.idMeal === idMeal);


  const handleToggleFavorites = () => {
   if (isMealInFavorites) {
      dispatch(removeFromFavorites(mealDetails.idMeal));
    } else {
      dispatch(addToFavorites(mealDetails));
    }
  };

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
      .then((response) => response.json())
      .then((data) => setMealDetails(data.meals[0]))
  }, [idMeal]);
  

  return (
    <div className={styles.detailsContainer}>
      {mealDetails ? (
        <div>
          <h2 className={styles.detailsTitle}>{mealDetails.strMeal}</h2>
          <img src={mealDetails.strMealThumb} alt={mealDetails.strMeal} />
          <br />
          <button className={styles.detailsButton} onClick={handleToggleFavorites}>
  {isMealInFavorites ? "Remove from favorites" : "Add to favorites"}
</button>
          <h4 className={styles.detailsIngredients}>Ingredients:</h4>
          <ul>
            {Array.from({ length: 20 }, (_, index) => index + 1)
              .map((ingredientIndex) => {
                const ingredientKey = `strIngredient${ingredientIndex}`;
                const measureKey = `strMeasure${ingredientIndex}`;
                const ingredient = mealDetails[ingredientKey];
                const measure = mealDetails[measureKey];

                return ingredient ? (
                  <li key={ingredientKey}>
                    {measure ? `${measure} of ${ingredient}` : ingredient}
                  </li>
                ) : null;
              })}
          </ul>
          <h4 className={styles.detailsInstructions}>Instructions:</h4>
          <p>{mealDetails.strInstructions}</p>
          
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Details;

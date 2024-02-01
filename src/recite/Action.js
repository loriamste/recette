export const addToFavorites = (meal) => {
  return {
    type: "ADD_TO_FAVORITES",
    payload: meal,
  };
};

export const removeFromFavorites = (mealId) => {
  return {
    type:"REMOVE_FROM_FAVORITES",
    payload: mealId,
  };
};

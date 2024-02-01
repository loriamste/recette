const initialState = {
  favorites: [],
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_FAVORITES":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case "REMOVE_FROM_FAVORITES":
      return {
        ...state,
        favorites: state.favorites.filter(
          (meal) => meal.idMeal !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default Reducer;

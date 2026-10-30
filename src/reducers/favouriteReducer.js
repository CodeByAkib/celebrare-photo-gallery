export const initialState = {
  favorites: [],
  isLoaded: false,
};

function favouriteReducer(state, action) {
  switch (action.type) {

    case "LOAD_FAVORITES":
      return {
        ...state,
        favorites: action.payload,
        isLoaded: true,
      };

    case "TOGGLE_FAVORITE": {
      const isFavorite = state.favorites.some(
        (photo) => photo.id === action.payload.id
      );

      const updatedFavorites = isFavorite
        ? state.favorites.filter(
            (photo) => photo.id !== action.payload.id
          )
        : [...state.favorites, action.payload];

      return {
        ...state,
        favorites: updatedFavorites,
      };
    }

    default:
      return state;
  }
}

export default favouriteReducer;
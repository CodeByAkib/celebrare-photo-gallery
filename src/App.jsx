import {
useState,
useCallback,
useMemo,
useReducer,
useEffect,
} from "react";

import useFetchPhotos from "./hooks/useFetchPhotos";

import favouriteReducer, {
initialState,
} from "./reducers/favouriteReducer";

function App() {
// Fetch photos using custom hook
const { photos, loading, error } = useFetchPhotos();

// Search state
const [searchTerm, setSearchTerm] = useState("");

// Favourite state using useReducer
const [state, dispatch] = useReducer(
favouriteReducer,
initialState
);

const { favorites, isLoaded } = state;


useEffect(() => {
try {
const savedFavorites = JSON.parse(
localStorage.getItem("favorites") || "[]"
);


  dispatch({
    type: "LOAD_FAVORITES",
    payload: Array.isArray(savedFavorites)
      ? savedFavorites
      : [],
  });
} catch {
  dispatch({
    type: "LOAD_FAVORITES",
    payload: [],
  });
}


}, []);


useEffect(() => {
if (isLoaded) {
localStorage.setItem(
"favorites",
JSON.stringify(favorites)
);
}
}, [favorites, isLoaded]);


const handleSearch = useCallback((event) => {
setSearchTerm(event.target.value);
}, []);


const filteredPhotos = useMemo(() => {
return photos.filter((photo) =>
photo.author
.toLowerCase()
.includes(searchTerm.toLowerCase())
);
}, [photos, searchTerm]);


const toggleFavorite = (photo) => {
dispatch({
type: "TOGGLE_FAVORITE",
payload: photo,
});
};


if (loading) {
return ( <div className="min-h-screen flex flex-col items-center justify-center gap-4"> <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>


    <p className="text-gray-600 font-medium">
      Loading photos...
    </p>
  </div>
);


}


if (error) {
return ( <div className="min-h-screen flex items-center justify-center"> <p className="text-red-500 text-xl">
{error} </p> </div>
);
}

return ( <div className="min-h-screen bg-gray-100 p-6">


  
  <h1 className="text-3xl font-bold text-center mb-6">
    Photo Gallery
  </h1>

  {/* Search Bar */}
  <div className="max-w-md mx-auto mb-8">
    <input
      type="text"
      placeholder="Search photos by author..."
      value={searchTerm}
      onChange={handleSearch}
      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Photo Grid */}
  {filteredPhotos.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

      {filteredPhotos.map((photo) => {
        const isFavorite = favorites.some(
          (favorite) => favorite.id === photo.id
        );

        return (
          <div
            key={photo.id}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >

            
            <img
              src={`https://picsum.photos/id/${photo.id}/400/300`}
              alt={photo.author}
              className="w-full h-56 object-cover"
            />

            {/* Photo Details */}
            <div className="p-4 flex items-center justify-between">

              <h2 className="font-semibold text-lg">
                {photo.author}
              </h2>

             
              <button
                onClick={() => toggleFavorite(photo)}
                aria-label={
                  isFavorite
                    ? "Remove from favourites"
                    : "Add to favourites"
                }
                aria-pressed={isFavorite}
                className={`text-2xl transition-colors ${
                  isFavorite
                    ? "text-red-500"
                    : "text-gray-400 hover:text-red-500"
                }`}
              >
                {isFavorite ? "♥" : "♡"}
              </button>

            </div>
          </div>
        );
      })}

    </div>
  ) : (
    <p className="text-center text-gray-500 text-lg">
      No photos found.
    </p>
  )}

</div>


);
}

export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Chercher from './Chercher';
import Home from './Home';
import Favorites from './Favorites';
import Navbar from './Navbar';
import Details from './Details';
import CategoryMeals from './CategoryMeals';


function Search  ()  {
  const [toutRecittes, setToutRecittes] = useState([]);

  const handleSearch = (searchTerm) => {
    if (searchTerm) {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
        .then((response) => response.json())
        .then((data) => setToutRecittes(data.meals || []));
    }
  };

  return { toutRecittes, handleSearch };
};

function App  ()  {
  const { toutRecittes, handleSearch } = Search();

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Navbar onSearch={handleSearch} />

          <Routes>
           <Route path="/" element={<Home/>} />
           <Route path="/chercher" element={<Chercher toutRecittes={toutRecittes} />} />
           <Route path="/favorites" element={<Favorites />} />
           <Route path="/details/:idMeal" element={<Details/>}/>
           <Route path="/category/:categoryName" element={<CategoryMeals/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;

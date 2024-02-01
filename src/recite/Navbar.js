import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";
import "./Navbar.css"; 

const CustomDropdown = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="custom-dropdown">
      <div className="toggle-button" onClick={toggleDropdown}>
        <div className="initial-text">
         
            <FontAwesomeIcon icon={faBars} />
       
        </div>
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {categories.map((strCategory, index) => (
            <li key={index}>
              <Link to={`/category/${strCategory}`}>{strCategory}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

function Navbar({ onSearch }) {
  const [chercherItem, setChercherItem] = useState("");
  const { favorites } = useSelector((state) => state);
  const nombreFavoris = favorites.length;
  const [selectedOption, setSelectedOption] = useState("");
  const [categories, setCategories] = useState([]);

  const handleItemClick = (option) => {
    setSelectedOption(option);
  }

  const handleChercher = () => {
    onSearch(chercherItem);
  };

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((response) => response.json())
      .then((data) => setCategories(data.meals.map(category => category.strCategory)));
  }, []);

  return (
    <nav className="navbar-container"> 
      <Link to="/" className="nav-link">DeliciousCuisine</Link>

      <input
        type="search"
        placeholder="Search for recipes"
        onChange={(e) => setChercherItem(e.target.value)}
        value={chercherItem}
        className="search-input" 
      />

      <button onClick={handleChercher} className="search-button">
        <Link className="search-link" to="/chercher">Search</Link>
      </button>

      <button className="search-button">
        <Link to="/favorites" className="nav-link-f">Favorites({nombreFavoris})</Link>
      </button>

      <CustomDropdown categories={categories} />
    </nav>
  );
}

export default Navbar;

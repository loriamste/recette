import React from 'react';
import Mealitem from './Mealitem';
import './GlobalStyles.css';
const Chercher = ({ toutRecittes }) => {
  return (
    <div className="main">
      <div className="container">
        {toutRecittes.length === 0 ? (
          <div className='div'>
            <img src="/err.png" alt="Description de l'image" />
            <h1>Sorry, no results found .</h1>
            <p>Please modify your search terms or adjust the filters.</p>
          </div>
        ) : (
          <div className="container">
            <ul>
              {toutRecittes.map((res) => (
                <li key={res.idMeal}>
                  <Mealitem data={res} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chercher;

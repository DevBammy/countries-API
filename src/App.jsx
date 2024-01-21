import { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
// import Country from './comps/Country';

function App() {
  const [input, setInput] = useState('');
  const [country, setCountry] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const api = {
    url: 'https://api.api-ninjas.com/v1/country?name=',
    key: 'QJx+cB7jW6RrrT9ckJD/Nw==sldbQJe14wHefLnm',
  };
  const headers = {
    'Content-Type': 'application/json',
    'X-Api-Key': api.key,
  };

  const getCountry = (e) => {
    if (e.key === 'Enter' && input === '') {
      alert('Enter the name of a country you will like to search');
    }
    if (e.key === 'Enter' && input !== '') {
      fetch(`${api.url}${input}`, {
        method: 'GET',
        headers: headers,
      })
        .then((res) => {
          if (!res) {
            alert('Error!');
          }
          return res.json();
        })
        .then((data) => {
          setCountry(data[0]);
          setIsLoading(false);
          setInput('');
        });
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Countries</h1>

        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          onKeyPress={getCountry}
          placeholder="Enter a Country..."
        />
        <button className="btn" onClick={getCountry}>
          <FiSearch />
        </button>
      </header>

      <section>
        <div className="countryDetails">
          {isLoading ? (
            ''
          ) : (
            <div className="country">
              <div>name:{country.name}</div>
              <div>capital:{country.capital}</div>
              <div>region: {country.region}</div>
              <div>surface area: {country.surface_area} Km</div>
              <div>population: {country.population} Million</div>
              <div>urban population: {country.urban_population}%</div>
              <div>life expectancy male: {country.life_expectancy_male}Yrs</div>
              <div>
                life expectancy female: {country.life_expectancy_female}Yrs
              </div>
              <div>Internet Users: {country.internet_users}%</div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;

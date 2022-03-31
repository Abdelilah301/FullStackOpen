import axios from "axios";
import React, { useState, useEffect } from "react";
import Countries from "./components/Countries";
import Country from "./components/Country";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [inputValue, setInputValue] = useState('');


  const handleCountry = (event) => {
    setInputValue(event.target.value);
    //  console.log(event.target.value);
  }

  useEffect(() => {
    //console.log('effects');
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
        // console.log('axios', response.data)
      })
  }, []);
  

  let filteredCountries = [];
  let showFilterCountries = [];

  if (inputValue) {
    const str = `^${inputValue}`;
    const regex = new RegExp(str.toLowerCase());

    filteredCountries = countries.filter(country => regex.test(country.name.common.toLowerCase()));
    // console.log(filteredCountries);

    showFilterCountries = filteredCountries.length > 10 ? filteredCountries.slice(0, 10) : filteredCountries;
    //  console.log(showFilterCountries);

  }

  return (
    <div>
      <div>
        find Countries: <input value={inputValue} onChange={handleCountry} />
      </div>
      <ul>
        {filteredCountries.length === 1
          ? <Country filteredCountries={filteredCountries} />
          : showFilterCountries.map(country => <Countries key={country.name.common} filteredCountries={country} />)}
      </ul>

    </div>
  );
}

export default App;

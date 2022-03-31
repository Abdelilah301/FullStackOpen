import axios from "axios";
import React, { useState, useEffect } from "react";


const Country = ({ filteredCountries }) => {
    const [weather, setWeather] = useState([]);
    const [showWeather, setShowWeather] = useState(false);

    const api_key = "b07f6aa005da51b7c326303485f254c3";


    //  console.log(filteredCountries);
    useEffect(() => {
        //console.log('effects');
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${filteredCountries[0].capital}&appid=${api_key}`)
            .then(response => {
                setWeather(response.data);
                // console.log('axios', response.data);
                // console.log("capital", filteredCountries[0].capital)
            })
    }, []);


    const onShowWeather = () => {
        setShowWeather(!showWeather);
    }

    // const imgWeather = weather.weather.map(desc => desc.icon)
    return (
        <div>
            <h1>{filteredCountries[0].name.common}</h1>
            <div>Capital : {filteredCountries[0].capital}</div>
            <div>Area : {filteredCountries[0].area}</div>
            <h1>Languages:</h1>
            <ul>
                {Object.values(filteredCountries[0].languages).map(lang => <li key={lang}>{lang}</li>)}
            </ul>
            <br></br>
            <img src={filteredCountries[0].flags.png} alt="country Flag" width="120" height="100"></img>
            <div>

                <h1>Show weather in {weather.name}</h1>

                {showWeather ? <div>
                    {/* {console.log("state of weather",showWeather)} */}
                    <h3>Wind {weather.wind.speed}m/s</h3>
                    <h3>Temperature {Math.floor((weather.main.temp) / 10)} Celcius</h3>
                    <img src={`http://openweathermap.org/img/wn/${weather.weather.map(desc => desc.icon)}@2x.png`} alt="weather image" width="100" height="100"></img>
                    <h3>{weather.weather.map(desc => desc.description)}</h3>
                    <button onClick={onShowWeather}>Hide</button>
                </div>
                    : <button onClick={onShowWeather}>Show</button>}
                {/* <h3>Wind {windSpeed.speed}m/s</h3> */}
                {/* <div>temperature {weather.main.temp}</div> */}

            </div>

        </div>
    )

}

export default Country
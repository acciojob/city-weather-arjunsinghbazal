

import './../styles/App.css';
import React, { useEffect, useState } from "react";


let API_KEY = 'cbf6566e445cd4fdf49a39c8bbc0376c';
const Weather = () => {
    const [query, setQuery] = useState("");
    const [weather, setWeather] = useState(null);
  
    const search = async (e) => {
  if (e.key === "Enter") {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`
      );
      
      if (response.ok) {
        const data = await response.json();
        setWeather(data);
        setQuery("");
      } else {
        console.log('Request failed:', response.status);
        // Handle error here, maybe set an error state
      }
    } catch (error) {
      console.error('Fetch error:', error);
      // Handle error here, maybe set an error state
    }
  }
};

  
    const kelvinToFahrenheit = (k) => ((k - 273.15) * 9) / 5 + 32;
  
    return (
      <div className="app">
        <input
          type="text"
          className="search"
          placeholder="Enter a city"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={search}
        />
        {weather && (
          <div className="weather">
            <div className="city">{weather.name}</div>
            <div className="temperature">
              {Math.round(kelvinToFahrenheit(weather.main.temp))}°F
            </div>
            <div className="description">{weather.weather[0].description}</div>
            <div className="icon">
              <img
                src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                alt={weather.weather[0].description}
              />
            </div>
          </div>
        )}
      </div>
    );
}
const App = () => {
  return (
    <div>
        <Weather />
    </div>
  )
}

export default App

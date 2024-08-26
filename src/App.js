import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  
  const url = `https://api.weatherapi.com/v1/current.json?key=25c6efa0ecff4b3190c91556242508&q=${location}&aqi=no`;

  
  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
      });
      setLocation("");
    }
  };


  const useCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const currentLocationUrl = `https://api.weatherapi.com/v1/current.json?key=25c6efa0ecff4b3190c91556242508&q=${latitude},${longitude}&aqi=no`;

        axios.get(currentLocationUrl).then((response) => {
          setData(response.data);
        });
      },
      (error) => {
        alert("Failed to get current location.");
      }
    );
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          type="text"
          placeholder="Enter location"
        />
          <button onClick={useCurrentLocation}>Use Current Location</button>
      </div>
      
      <div className="container">
        <div className="top">
          <div className="location">
            {data.location && (
              <p>
              {data.location.name}, {data.location.country} <br />
              {data.location.localtime}
              </p>
            )}
          </div>
          <div className="temp">
            {data.current && <h1>{data.current.temp_c}°C🌡️</h1>}
          </div>
          <div className="description">
            {data.current && <p>{data.current.condition.text}</p>}
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            {data.current && (
              <p className="bold">{data.current.feelslike_c}°C</p>
            )}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data.current && <p className="bold">{data.current.humidity}%</p>}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.current && (
              <p className="bold">{data.current.wind_kph} km/h</p>
            )}
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    
    </div>
    
  );
}

export default App;

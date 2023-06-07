import React, { useState } from 'react';
import axios from 'axios';

const Meteo = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false); // Aggiunta variabile di stato per il caricamento

  const API_KEY = 'b3380c79856232d606657e94c23ecb41'; // Inserisci la tua chiave API qui

  const fetchWeather = async () => {
    setLoading(true); // Imposta lo stato di caricamento su true

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      setWeather(response.data);
    } catch (error) {
      console.error(error);
    }

    setLoading(false); // Imposta lo stato di caricamento su false dopo aver ottenuto la risposta
  };

  const getWeatherIconUrl = (iconCode) => {
    return `http://openweathermap.org/img/w/${iconCode}.png`;
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <h1 className="my-4">Weather App</h1>
          <input
            type="text"
            className="form-control"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="btn btn-primary mt-3" onClick={fetchWeather} disabled={loading}>
            {loading ? 'Loading...' : 'Show Weather'}
          </button>

          {weather && (
           <div className="mt-4 card" style={{ backgroundImage: `url('https://cdn.pixabay.com/photo/2016/12/26/09/41/landscape-1931729_1280.jpg')` }}>

              <div className="card-body">
                <h2>{weather.name}</h2>
                <p>Temperature: {Math.round(weather.main.temp - 273.15)}°C</p>
                <p>Description: {weather.weather[0].description}</p>
                <img
                  src={getWeatherIconUrl(weather.weather[0].icon)}
                  alt="Weather Icon"
                />
                <p>Base: {weather.base}</p>
                <p>Clouds: {weather.clouds.all}</p>
                <p>Timestamp: {weather.dt}</p>
                <p>ID: {weather.id}</p>
                <p>Sys: {weather.sys.country}</p>
                <p>Timezone: {weather.timezone}</p>
                <p>Wind: {weather.wind.speed} m/s</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Meteo;

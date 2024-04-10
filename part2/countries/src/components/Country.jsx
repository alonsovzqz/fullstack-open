import { useEffect, useState } from "react";

import weatherService from "../services/weather";

const Country = ({ country }) => {
  const [weatherInfo, setWeatherInfo] = useState();

  useEffect(() => {
    weatherService
      .getOne(country.latlng[0], country.latlng[0])
      .then((response) => {
        setWeatherInfo(response.data);
      });
  }, [country]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <br />
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <br />
      <h4>languages:</h4>
      <br />
      <ul>
        {Object.keys(country.languages).map((lang) => (
          <li key={lang}>{country.languages[lang]}</li>
        ))}
      </ul>
      <br />
      <img src={country.flags.png} alt={country.flags.alt} />
      <br />
      <h4>Weather in {country.name.common}</h4>
      {weatherInfo && (
        <>
          <p>temperature {weatherInfo.main.temp} Celcius</p>
          <br />
          <img
            src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}
            alt={weatherInfo.weather[0].description}
          />
          <p>wind {weatherInfo.wind.speed} m/s</p>
        </>
      )}
    </div>
  );
};

export default Country;

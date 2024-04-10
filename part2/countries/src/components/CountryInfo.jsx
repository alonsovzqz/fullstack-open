import { useState } from "react";
import Country from "./Country";

const CountryInfo = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState();

  const handleSelectCountry = (countryData) => {
    setSelectedCountry(countryData);
  };

  if (selectedCountry) {
    return <Country country={selectedCountry} />
  }

  return countries.length === 1
    ? countries.map((country) => (
        <Country key={country.name.common} country={country} />
      ))
    : countries.map((country) => (
        <p key={country.name.common}>
          {country.name.common}{" "}
          <button onClick={() => handleSelectCountry(country)}>show</button>
        </p>
      ));
};

export default CountryInfo;

import { useEffect, useState } from "react";

import countryService from "./services/countries";
import CountryInfo from "./components/CountryInfo";

function App() {
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);

  const filteredCountries = country
    ? countries.filter((c) =>
        c.name.common.toLowerCase().includes(country.toLowerCase())
      )
    : [];

  useEffect(() => {
    countryService.getAll().then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleChange = (event) => {
    setCountry(event.target.value);
  };

  return (
    <div>
      find countries <input value={country} onChange={handleChange} />
      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        <CountryInfo countries={filteredCountries} />
      )}
    </div>
  );
}

export default App;

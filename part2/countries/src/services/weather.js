import axios from "axios";

const baseUrl = "https://api.openweathermap.org/data/2.5/weather"
const apiKey = import.meta.env.VITE_OPENWEATHER

const getOne = (lat, lon) => axios.get(`${baseUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)

export default { getOne }

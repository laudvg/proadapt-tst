import {weatherTypes} from "../types/weatherTypes"
const urlbase = 'https://api.openweathermap.org/data/2.5/';

export const getWeather = async (lat: number, lon: number): Promise <weatherTypes> => 
  await fetch(`${urlbase}weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.VUE_APP_OPEN_WEATHER_KEY}`)
  .then(res => {
    return res.json();
  })
 .catch((error) => console.log("error", error));
import {weatherTypes} from "../types/weatherTypes"
const urlbase = 'https://api.openweathermap.org/data/2.5/';

export const searchtWeather = async (query: string): Promise <weatherTypes> => 
  await fetch(`${urlbase}weather?q=${query}&units=metric&APPID=${process.env.VUE_APP_OPEN_WEATHER_KEY}`)
  .then(res => {return res.json()})
  .catch((error) => console.log("error", error));

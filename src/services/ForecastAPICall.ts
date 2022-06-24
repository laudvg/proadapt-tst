import {forecast} from '@/types/forecast';
const urlbase = 'https://api.openweathermap.org/data/2.5/';

export const getForecast = async (lat: number, lon: number): Promise <forecast> => 
  await fetch(`${urlbase}onecall?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.VUE_APP_OPEN_WEATHER_KEY}`)
  .then(res => {
    return res.json();
  })
  .catch((error) => console.log("error", error));
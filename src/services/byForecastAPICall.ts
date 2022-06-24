import {forecastTypes} from '@/types/forecastTypes';
const urlbase = 'https://api.openweathermap.org/data/2.5/';

export const getForecast = async (lat: number, lon: number): Promise <forecastTypes> => 
  await fetch(`${urlbase}forecast?lat=${lat}&lon=${lon}&units=metric&cnt=3&appid=${process.env.VUE_APP_OPEN_WEATHER_KEY}`)
  .then(res => {
    return res.json();
  })
  .catch((error) => console.log("error", error));
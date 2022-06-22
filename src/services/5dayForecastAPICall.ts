import {forecast5Types} from '@/types/forecast5Types';
const urlbase = 'https://api.openweathermap.org/data/2.5/';

export const get5DaysForecast = async (lat: number, lon: number): Promise <forecast5Types> => 
  await fetch(`${urlbase}onecall?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.VUE_APP_OPEN_WEATHER_KEY}`)
  .then(res => {
    return res.json();
  })
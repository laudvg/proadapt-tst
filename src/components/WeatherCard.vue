<template>
  <div class="card weather-now-card bg-primary">
    <div class="container weather-now">
      <div class="row">
        <div class="col d-flex flex-column align-items-center">
          <div class="row">
              <div class="today-date mt-2 mb-0">
                <h4>{{data.name}}, {{data.sys?.country}}</h4>
              </div>
          </div>
        </div>
      </div>
      <time-and-date></time-and-date>
      <div class="row">
        <div class="col d-flex flex-column align-items-center" style="height: 10rem;">
          <h1 class="temperature-now ml-3" style="height: 8rem;">{{Math.round(data.main?.temp)}}&deg;</h1>
        </div>
      </div>
      <div class="info mt-4">
        <div class="row weather-description" style="margin-right:.02rem;">
          <div class="d-flex justify-content-end">
            <h6>Humidity {{data.main?.humidity}}&nbsp;%</h6>
            <span class="material-icons-outlined md-14">water_drop</span>
          </div>
          <div class="d-flex justify-content-end">
            <h6>Feels like {{Math.round(data.main?.feels_like)}}&deg;</h6>
            <span class="material-icons-outlined md-14">landscape</span>
          </div>
          <div class="d-flex justify-content-end">
            <h6>Max {{Math.round(data.main?.temp_max)}}&deg;</h6>
            <span class="material-icons-outlined md-14">arrow_upward</span>
          </div>
          <div class="d-flex justify-content-end">
            <h6>Sunrise&nbsp;{{setSunrise()}}h.</h6>
            <span class="material-icons-outlined md-14">wb_twilight</span>
          </div>
        </div>
        <div class="row weather-description" style="margin-left:.02rem;">
          <div class="d-flex justify-content-beggining">
            <span class="material-icons-outlined md-14">compare_arrows</span>
            <h6>Press. {{data.main?.pressure}}&nbsp;hPa</h6>
          </div>
          <div class="d-flex justify-content-beggining">
            <span class="material-icons-outlined md-14">cloud</span>
            <h6>Clouds {{data.clouds?.all}}&nbsp;%</h6>
          </div>
          <div class="d-flex justify-content-beggining">
            <span class="material-icons-outlined md-14">arrow_downward</span>
            <h6>Min {{Math.round(data.main?.temp_min)}}&deg;</h6>
          </div>
          <div class="d-flex justify-content-beggining">
            <span class="material-icons-outlined md-14">nights_stay</span>
            <h6>Sunset&nbsp;{{setSunset()}}h.</h6>
          </div>
        </div>
      </div>
    </div>
    <h6 style="font-size:.75rem">Next Days Forecast</h6>
    <div class="forecast-cards">
    </div>
    <div class="d-flex flex-row" :class="{'flex-row-reverse':reverseOrder === false}" >
      <forecast5days
        :tempAve="forecasts.temp.day"
        :dateForecast="forecasts.dt"
        :tempMin="forecasts.temp.min"
        :tempMax="forecasts.temp.max"
        v-for="forecasts in forecast5daysData.daily?.slice(1,6)" v-bind:key="forecasts.dt"
      ></forecast5days>
    </div>
    <div class="order-buttons my-2">
        <h6 class="mx-2" style="font-size:.75rem">Order forecast by date:</h6>
        <button type="button" class="mx-2 btn btn-light btn-sm" style="font-size:.75rem" @click="reverseOrder = true">Ascendante</button>
        <button type="button" class="mx-2 btn btn-light btn-sm" style="font-size:.75rem" @click="reverseOrder = false">Descendant</button>
    </div>
  </div>
  <div class="mt-2">
    <button type="button" class="btn btn-outline-primary btn-sm" @click="currentLocation()">
          Go to the weather of your current location
        <span class="material-icons-outlined md-16">place</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {weatherTypes} from '../types/weatherTypes';
import { getWeather } from '../services/byLocationAPICall';
import { searchtWeather } from '../services/bySearchAPICall';
import TimeAndDate from './TimeAndDate.vue';
import Forecast5days from './Forecast5days.vue';
import {getForecast} from '../services/ForecastAPICall'
import {forecast} from '../types/forecast';

export default defineComponent({
  name: 'DefaultWeather',
  components: {
    TimeAndDate,
    Forecast5days
},
  data() {
    return {
      date:'',
      hour:'',
      description: '',
      data: {} as weatherTypes,
      forecast5daysData: {} as forecast,
      reverseOrder: true,
    }
  },
  props: {
    cityQuery: {
      type: String,
      default: 'Berlin',
    },
    latitude: {
      type: Number,
      default: 1,
    },
    longitude: {
      type: Number,
      default: 1,
    }
  },
  created(){
    this.asignGeolocalization();
  },
  methods: {
    asignGeolocalization(): void {
      this.getWeather();
      this.search5daysForecast(this.latitude, this.longitude);
    },

    async getWeather():Promise<void>{
      const value = await getWeather(this.latitude, this.longitude);
      this.data = value;
      console.log(this.data);
    },

    async searchWeather():Promise<void>{
      const value = await searchtWeather(this.cityQuery);
      this.data = value;
      this.search5daysForecast(value.coord.lat, value.coord.lon);
    },

    async search5daysForecast(latitude:number, longitude: number):Promise<void>{
      const value = await getForecast(latitude, longitude);
      this.forecast5daysData = value;
    },

    currentLocation() {
      this.getWeather();
    },

    formatHours(timestamp: number){
      const date = new Date(timestamp * 1000);
      const hours = date.getHours();
      const minutes = "0" + date.getMinutes();
      const formattedTime = hours + ':' + minutes.slice(-2);
      return formattedTime;
    },

    setSunrise(){
      const sunrise = this.data.sys?.sunrise;
      return this.formatHours(sunrise);
    },

    setSunset(){
      const sunset = this.data.sys?.sunset;
      return this.formatHours(sunset);
    },
  },
  watch: {
    longitude: {
      deep: true,
      handler: 'getWeather',
    },
    latitude: {
      deep: true,
      handler: 'getWeather',
    },
    cityQuery: {
      deep: true,
      handler: 'searchWeather',
    },
  },
});
</script>

<style scoped>

.weather-now-card{
  width: 25rem;
  height:38rem;
  color: #ffffff;
  font-size: 1rem;
  font-family: Poppins;
}

.weather-now{
  height: 20rem;
  height: 30rem;
  border-radius: 5%;
}

.weather-description{
  width: 15rem;
  font-weight: 500;
}

.today-date{
  font-weight: 600;
}

.temperature-now{
  font-size: 8rem;
}

.forecast-cards{
  display: flex;
  justify-content: space-evenly;
}

.material-icons-outlined.md-18 { 
  font-size: 18px;
}

.material-icons-outlined.md-16 { 
  font-size: 16px;
}

.material-icons-outlined.md-14 { 
  font-size: 14px;
  margin: 0rem .75rem 1rem .75rem;
}

.info{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: center;
}
</style>
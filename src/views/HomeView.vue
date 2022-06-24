<template>
  <div class="home">
    <input-search-weather :getCity="getNewCity"></input-search-weather>
    <weather-card :cityQuery="searchCity" :latitude="lat" :longitude="lng"></weather-card>
  </div>
  
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WeatherCard from '@/components/WeatherCard.vue';
import InputSearchWeather from '@/components/InputSearchWeather.vue';


export default defineComponent({
  name: 'HomeView',
  components: {
    WeatherCard,
    InputSearchWeather,
},
  data(){
    return {
      searchCity: '',
      lat: 1,
      lng: 1,
    }
  },
  methods:{
    getNewCity(city: string): void{
      this.searchCity = city;
    },
    getGeolocalization(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.asignGeolocalization);
    } else {
      alert("The app requieres the Geolocation to continue");
    }
    },
    asignGeolocalization(position: any): void {
      console.log(typeof(position))
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;
      this.lat = lat;
      this.lng = lng;
    },
  },
  created(){
    this.getGeolocalization();
  },
});
</script>

<style scoped>
.home{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>

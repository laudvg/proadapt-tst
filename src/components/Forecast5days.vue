<template>
  <div class="card forecast-card bg-primary mb-2">
      <h6 class="temp">{{Math.round(tempAve)}}&deg;</h6>
    <div class="min-max-val">
    <h6 class="min-max">Min{{Math.round(tempMin)}}&deg;</h6>
    <h6 class="min-max">Max{{Math.round(tempMax) }}&deg;</h6>
    </div>
    <h6 class="min-max">{{date}}</h6>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name:'ForecastCard',
  props: {
    tempAve : Number,
    tempMin: Number,
    tempMax: Number,
    dateForecast: Number,
  },
  data(){
    return {
      formatedHour: '',
      date:'',
    }
  },
  methods: {
    setDate(timestamp: any) {
      const dates = new Date(timestamp * 1000);
      const dateOptions: object = {
        weekday: 'long',
      };
      const dateLocale = dates.toLocaleDateString('en-US', dateOptions);
      this.date = dateLocale;
    },

    formatHours(timestamp: any){
      const date = new Date(timestamp * 1000);
      const hours = date.getHours();
      const minutes = "0" + date.getMinutes();
      const formattedTime = hours + ':' + minutes.slice(-2);
      this.formatedHour = formattedTime;
    },
  },
  mounted(){
    this.formatHours(this.dateForecast);
    this.setDate(this.dateForecast);
  }
})
</script>

<style> 
  .min-max{
    font-size: .5rem;
  }
  .temp{
    font-size: 2rem;
    margin-left: 1rem;
    padding-right:.5rem;
    margin-top: .5rem;
  }
  .single-card{
    display: flex;
  }
  .forecast-card{
    width: 7rem;
    display: flex;
    flex-direction:row;
    justify-content: center;
    align-content: center;
  }
  .material-icons-outlined.md-12 { 
    font-size: 12px;
    margin-top: .1rem;
  }
  .min-max-val{
    display: flex;
    flex-direction:row;
    justify-content: center;
    align-content: center;
  }

</style>
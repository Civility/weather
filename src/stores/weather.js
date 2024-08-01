import { defineStore } from 'pinia'
import { useMainStore } from './main'
import OpenWeatherMap from 'openweathermap-ts'
const openWeather = new OpenWeatherMap({
  apiKey: env.WEATHER_API_KEY
})
openWeather.setLanguage('ru')
openWeather.setUnits('metric')

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    CITY: 'Салоники',
    WEATHER: null,
    WEATHERDAY: null
  }),
  actions: {
    async fetchWeatherCurrent() {
      const main = useMainStore()
      try {
        main.LOADER = true
        // openWeather.clearLocation();

        const data = await openWeather.getCurrentWeatherByCityName({
          cityName: this.CITY
        })
        this.WEATHER = data
      } catch (error) {
        console.error(error)
      } finally {
        main.LOADER = false
      }
    },
    async fetchWeatherDay() {
      const main = useMainStore()
      try {
        main.LOADER = true

        const data = await openWeather.getThreeHourForecastByCityName({
          cityName: this.CITY
        })
        this.WEATHERDAY = data
      } catch (error) {
        console.error(error)
      } finally {
        main.LOADER = false
      }
    }
  }
})

import { defineStore } from 'pinia'
import { useMainStore } from './main'
import OpenWeatherMap from 'openweathermap-ts'

const openWeather = new OpenWeatherMap({
  apiKey: import.meta.env.VITE_WEATHER_API_KEY
})

openWeather.setUnits('metric')

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    WEATHER: null,
    WEATHERDAY: null
  }),
  getters: {
    mainCity: () => {
      const main = useMainStore()
      return main.CITY.match(/^\w+/)[0] // 1 слово из названия города
    },
    iconUrl: (state) => {
      return state.WEATHER.weather && state.WEATHER.weather[0].icon
        ? `http://openweathermap.org/img/wn/${state.WEATHER.weather[0].icon}@2x.png`
        : ''
    }, // icon weather
    iconContry: (state) => {
      return state.WEATHER.sys && state.WEATHER.sys.country
        ? `fi fi-${state.WEATHER.sys.country.toLowerCase()} `
        : 'fi fi-en'
    } // icon flag
  },
  actions: {
    async fetchWeatherCurrent() {
      const main = useMainStore()

      try {
        main.LOADER = true
        // openWeather.clearLocation();
        openWeather.setLanguage(main.LOCALE)
        const data = await openWeather.getCurrentWeatherByCityName({
          cityName: this.mainCity
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
        openWeather.setLanguage(main.LOCALE)
        const data = await openWeather.getThreeHourForecastByCityName({
          cityName: this.mainCity
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

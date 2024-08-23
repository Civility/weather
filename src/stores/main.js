import { defineStore } from 'pinia'
import { format } from 'date-fns'
import { ru, enUS } from 'date-fns/locale'
import opencage from 'opencage-api-client'
// import { useWeatherStore } from '@/stores/weather'
export const useMainStore = defineStore('main', {
  state: () => ({
    LOADER: false,
    LOCALE: '',
    // COUNTRY: '',
    CITY: '',
    ISDARKMODE: false
  }),
  getters: {
    isRus: (state) => state.LOCALE === 'ru',
    currentDateFormatted() {
      // Выбор локали в зависимости от состояния LOCALE
      const locale = this.LOCALE === 'ru' ? ru : enUS
      return format(new Date(), 'PPP', { locale })
    }
  },
  actions: {
    // search geo location
    async getLocaleByCoords(latitude, longitude) {
      try {
        const data = await opencage.geocode({
          q: `${latitude},${longitude}`,
          key: env.LOCAL_API_KEY,
          language: this.LOCALE === 'ru' ? 'ru' : 'en'
        })
        const components = data.results[0].components
        const countryCode = components.country_code.toUpperCase()
        const city =
          components.city ||
          components.town ||
          components.village ||
          components.city_district ||
          components.suburb
        // const city =
        //   (this.LOCALE === 'ru' ? components.county : components.city) ||
        //   components.town ||
        //   components.village
        return { countryCode, city }
      } catch (error) {
        console.error(error)
      }
    },
    async setLocale() {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          const location = await this.getLocaleByCoords(latitude, longitude)
          this.LOCALE = location.countryCode === 'RU' ? 'ru' : 'en'
          // this.COUNTRY = location.countryCode
          this.CITY = location.city
          // this.CITY = 'Moscow'
        },
        (error) => {
          console.error(error)
          this.LOCALE = 'ru' // По умолчанию
        }
      )
    },
    switchLocale(locale) {
      this.LOCALE = locale
      // const weatherStore = useWeatherStore()
      // weatherStore.fetchWeatherCurrent()
      // weatherStore.fetchWeatherDay()
    },
    // dark-mode
    toggleDarkMode() {
      this.ISDARKMODE = !this.ISDARKMODE
      if (this.ISDARKMODE) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
    },
    initializeTheme() {
      if (
        localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        document.documentElement.classList.add('dark')
        this.ISDARKMODE = true
      } else {
        document.documentElement.classList.remove('dark')
        this.ISDARKMODE = false
      }
    }
  }
})

import { defineStore } from 'pinia'
import { format } from 'date-fns'
import { ru, enUS } from 'date-fns/locale'
import opencage from 'opencage-api-client'

export const useMainStore = defineStore('main', {
	state: () => ({
		LOADER: false,
		LOCALE: 'ru',
		COUNTRY: 'RU'
	}),
	getters: {
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
					key: env.LOCAL_API_KEY
				})
				const countryCode = data.results[0].components.country_code.toUpperCase()
				console.log('countryCode', countryCode)
				return countryCode
			} catch (error) {
				console.error(error)
			}
		},
		async setLocale() {
			navigator.geolocation.getCurrentPosition(
				async (position) => {
					const { latitude, longitude } = position.coords
					const countryCode = await this.getLocaleByCoords(latitude, longitude)
					this.LOCALE = countryCode === 'RU' ? 'ru' : 'en'
					this.COUNTRY = countryCode
				},
				(error) => {
					console.error(error)
					this.LOCALE = 'ru' // По умолчанию
				}
			)
		},
		switchLocale(locale) {
			this.LOCALE = locale
		}
	}
})

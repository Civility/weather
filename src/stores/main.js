import { defineStore } from 'pinia';
import { format } from 'date-fns';
import { ru, enUS } from 'date-fns/locale';

export const useMainStore = defineStore('main', {
	state: () => ({
		LOADER: false,
		LOCALE: 'ru'
	}),
	getters: {
		currentDateFormatted() {
			// Выбор локали в зависимости от состояния LOCALE
			const locale = this.LOCALE === 'ru' ? ru : enUS;
			return format(new Date(), 'PPP', { locale });
		}
	},
	actions: {
		// search geo location
		async getLocaleByCoords(latitude, longitude) {
			try {
				const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key= API_KEY`);
				const data = await response.json();
				const countryCode = data.results[0].components.country_code.toUpperCase();
				return countryCode;
			} catch (error) {
				console.error(error);
			}
		},
		async setLocale() {
			navigator.geolocation.getCurrentPosition(async (position) => {
				const { latitude, longitude } = position.coords;
				const countryCode = await this.getLocaleByCoords(latitude, longitude);
				this.locale = countryCode === 'RU' ? 'ru' : 'en';
			}, (error) => {
				console.error(error);
				this.locale = 'ru'; // По умолчанию
			});
		},
		switchLocale(locale) {
			this.LOCALE = locale;
		}
	},
});
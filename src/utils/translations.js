export const translations = {
  en: {
    description: 'Description',
    humidity: 'Humidity',
    windSpeed: 'Wind Speed',
    realFeel: 'Real feel',
    forecast: '5 day forecast'
  },
  ru: {
    description: 'Описание',
    humidity: 'Влажность',
    windSpeed: 'Скорость ветра',
    realFeel: 'Ощущается как',
    forecast: 'Прогноз на 5 дней'
  }
}
export function translate(key, locale) {
  const translation = translations[locale]
  return translation ? translation[key] : key
}

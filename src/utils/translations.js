export const translations = {
  en: {
    description: 'Description',
    humidity: 'Humidity',
    windSpeed: 'Wind Speed',
    realFeel: 'Real feel'
  },
  ru: {
    description: 'Описание',
    humidity: 'Влажность',
    windSpeed: 'Скорость ветра',
    realFeel: 'Ощущается как'
  }
}
export function translate(key, locale) {
  const translation = translations[locale]
  return translation ? translation[key] : key
}

<script setup>
import { onMounted, computed } from 'vue'
// import SvgLoader from '@/components/Svg.vue'
// import logoIcon from '@svg/logo.svg'
// components
import Btn from '@/components/Btn.vue'
import Loader from '@/components/Loader.vue'
// pinia
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main'
import { useWeatherStore } from '@/stores/weather'
const { fetchWeatherCurrent, fetchWeatherDay } = useWeatherStore()
const { CITY, WEATHER, WEATHERDAY } = storeToRefs(useWeatherStore())
const { switchLocale } = useMainStore()
const { LOADER, currentDateFormatted, LOCALE } = storeToRefs(useMainStore())

onMounted(() => {
  fetchWeatherCurrent()
})
// icon weather
const iconUrl = computed(() => {
  return WEATHER ? `http://openweathermap.org/img/wn/${WEATHER.value.weather[0].icon}.png` : ''
})
// icon flag
const iconContry = computed(() => {
  return WEATHER ? `fi fi-${WEATHER.value.sys.country.toLowerCase()} ` : ''
})
// locale
const isEnglish = computed(() => LOCALE.value === 'ru')
const toggleLocale = () => {
  switchLocale(isEnglish.value ? 'en' : 'ru')
}
</script>

<template>
  <main class="">
    <!-- <span class="col-span-1">
      <SvgLoader :svg="logoIcon" />
    </span> -->
    <div v-if="WEATHER" class="grid grid-cols-4 gap-4">
      <div class="col-span-full flex justify-between">
        <span class="">{{ currentDateFormatted }}</span>
        <label class="inline-flex items-center cursor-pointer">
          <input type="checkbox" :checked="isEnglish" @change="toggleLocale" class="sr-only peer" />
          <span class="mr-3 text-sm font-medium">EN</span>
          <div
            class="relative w-11 h-6 bg-blue-500 rounded-full peer dark:bg-blue-800 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-cyan-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-blue-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-cyan-500"
          ></div>
          <span class="ml-3 text-sm font-medium">RU</span>
        </label>
      </div>

      <h1 class="col-span-full text-2xl font-bold text-center">
        <span :class="iconContry" class="fi inline-block" /> {{ CITY }}
      </h1>

      <div class="col-span-full grid grid-cols-6 gap-0">
        <div class="col-span-2 col-start-4 inline-flex leading-[0.3]">
          <strong class="text-7xl col-span-2">{{ Math.round(WEATHER.main.temp) }} </strong>
          <span class="font-semibold text-3xl">°C</span>
        </div>
        <div class="col-span-2 col-start-4 leading-none">
          <small class="block">Real feel {{ Math.round(WEATHER.main.feels_like) }} °C</small>
        </div>
      </div>

      <div class="col-span-full">
        <p>Описание: {{ WEATHER.weather[0].description }}</p>
        <p>Влажность: {{ WEATHER.main.humidity }}%</p>
        <p>Скорость ветра: {{ WEATHER.wind.speed }} м/с</p>
        <p>Icon: <img :src="iconUrl" alt="Weather Icon" /></p>
      </div>

      <!-- <pre>{{ WEATHER }}</pre> -->

      <div class="col-span-full">
        <Btn main @click="fetchWeatherDay()">Прогноз на 5 дней</Btn>
      </div>
    </div>
    <div v-if="WEATHERDAY">
      <pre>{{ WEATHERDAY }}</pre>
    </div>
    <Loader v-else-if="LOADER" />
  </main>
</template>

<style scoped></style>

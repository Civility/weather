<script setup>
import { onMounted, reactive, computed, watch } from 'vue'
// import SvgLoader from '@/components/Svg.vue'
// import logoIcon from '@svg/logo.svg'
// components
import Btn from '@/components/Btn.vue'
import Loader from '@/components/Loader.vue'
import Hear from '@/components/Hear.vue'
// pinia
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main'
import { useWeatherStore } from '@/stores/weather'
import { translate } from '@/utils/translations'
const { fetchWeatherCurrent, fetchWeatherDay } = useWeatherStore()
const { WEATHER, WEATHERDAY, iconUrl, iconContry } = storeToRefs(useWeatherStore())
const { setLocale, initializeTheme } = useMainStore()
const { CITY, LOADER, isRus } = storeToRefs(useMainStore())
// Наблюдаем за изменениями CITY
watch(CITY, (newCity) => {
  if (newCity) {
    fetchWeatherCurrent()
  }
})
onMounted(() => {
  initializeTheme()
  setLocale()
})
const containers = reactive({
  container: JSON.parse(localStorage.getItem('container')) || [
    { type: 'description' },
    { type: 'humidity' },
    { type: 'windSpeed' }
  ]
})
let draggedItem = null
let draggedFrom = null

const onDragStart = (item, fromContainer) => {
  draggedItem = item
  draggedFrom = fromContainer
}

const onDrop = (toContainer) => {
  if (draggedFrom && draggedItem) {
    // Удаляем элемент из предыдущего контейнера
    containers[draggedFrom] = containers[draggedFrom].filter((i) => i !== draggedItem)
    // Добавляем элемент в новый контейнер
    containers[toContainer].push(draggedItem)
    // перевод
    localStorage.setItem('container', JSON.stringify(containers.container))
    // Сбрасываем значения
    draggedItem = null
    draggedFrom = null

    // Сохраняем новые позиции в localStorage
    localStorage.setItem('container', JSON.stringify(containers.container))
  }
}

// Вычисляемое свойство для текущего языка
const currentLocale = computed(() => (isRus.value ? 'ru' : 'en'))
</script>

<template>
  <Hear />
  <main class="">
    <!-- <span class="col-span-1">
      <SvgLoader :svg="logoIcon" />
    </span> -->
    <div v-if="WEATHER" class="flex flex-col gap-4">
      <section class="grid grid-cols-6 gap-0">
        <h1 class="col-span-full text-left text-2xl font-bold">
          <span :class="iconContry" class="fi inline-block" /> {{ CITY }}
        </h1>
        <span v-if="WEATHER.weather" class="col-span-2 col-start-2"
          ><img :src="iconUrl" :alt="WEATHER.weather.description"
        /></span>
        <div class="col-span-2 col-start-4 leading-[0.3]">
          <div v-if="WEATHER.main" class="inline-flex">
            <strong class="text-7xl">{{ Math.round(WEATHER.main.temp) }} </strong>
            <span class="text-3xl font-semibold">°C</span>
          </div>
          <div v-if="WEATHER.main" class="leading-none flex w-full">
            <small class="block"
              >{{ translate('realFeel', currentLocale) }}
              {{ Math.round(WEATHER.main.feels_like) }} °C</small
            >
          </div>
        </div>
      </section>

      <section class=" " @dragover.prevent @drop="onDrop('container')">
        <div
          v-for="(item, index) in containers.container"
          :key="`container-item-${index}`"
          draggable="true"
          class="cursor-grab active:cursor-grabbing active:underline"
          @dragstart="onDragStart(item, 'container')"
        >
          <p v-if="item.type === 'description' && WEATHER?.weather">
            &equiv; {{ translate('description', currentLocale) }}:
            {{ WEATHER.weather[0].description }}
          </p>
          <p v-if="item.type === 'humidity' && WEATHER?.main">
            &equiv; {{ translate('humidity', currentLocale) }}: {{ WEATHER.main.humidity }}%
          </p>

          <p v-if="item.type === 'windSpeed' && WEATHER?.wind">
            &equiv; {{ translate('windSpeed', currentLocale) }}: {{ WEATHER.wind.speed }} м/с
          </p>
        </div>
      </section>

      <section class=" ">
        <Btn main @click="fetchWeatherDay()"> {{ translate('forecast', currentLocale) }}</Btn>
      </section>
    </div>
    <div v-if="WEATHERDAY">
      <pre>{{ WEATHERDAY }}</pre>
    </div>
    <Loader v-else-if="LOADER" />
  </main>
</template>

<style scoped></style>

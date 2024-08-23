<script setup>
// pinia
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main'
const { switchLocale, toggleDarkMode } = useMainStore()
const { currentDateFormatted, isRus, ISDARKMODE } = storeToRefs(useMainStore())
// locale
const toggleLocale = () => {
  switchLocale(isRus.value ? 'en' : 'ru')
}
</script>
<template>
  <header class="flex justify-between">
    <span class="">{{ currentDateFormatted }}</span>

    <label class="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" class="sr-only peer" @change="toggleDarkMode" :checked="ISDARKMODE" />
      <svg
        v-if="!ISDARKMODE"
        class="w-6 h-6 text-orange-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          fill-rule="evenodd"
          d="M13 3a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0V3ZM6.343 4.929A1 1 0 0 0 4.93 6.343l1.414 1.414a1 1 0 0 0 1.414-1.414L6.343 4.929Zm12.728 1.414a1 1 0 0 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 1.414 1.414l1.414-1.414ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm-9 4a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H3Zm16 0a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2ZM7.757 17.657a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414Zm9.9-1.414a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM13 19a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2Z"
          clip-rule="evenodd"
        />
      </svg>
      <svg
        v-else
        class="w-6 h-6 dark:text-gray-800"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          fill-rule="evenodd"
          d="M11.675 2.015a.998.998 0 0 0-.403.011C6.09 2.4 2 6.722 2 12c0 5.523 4.477 10 10 10 4.356 0 8.058-2.784 9.43-6.667a1 1 0 0 0-1.02-1.33c-.08.006-.105.005-.127.005h-.001l-.028-.002A5.227 5.227 0 0 0 20 14a8 8 0 0 1-8-8c0-.952.121-1.752.404-2.558a.996.996 0 0 0 .096-.428V3a1 1 0 0 0-.825-.985Z"
          clip-rule="evenodd"
        />
      </svg>
    </label>
    <label class="inline-flex cursor-pointer items-center">
      <input type="checkbox" :checked="isRus" class="peer sr-only" @change="toggleLocale" />
      <span class="mr-3 text-sm font-medium">EN</span>
      <div
        class="peer relative h-6 w-11 rounded-full bg-blue-500 after:absolute after:left-0.5 after:top-0.5 after:size-5 after:rounded-full after:border after:border-blue-500 after:bg-white after:transition-all after:content-[''] peer-checked:bg-cyan-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-purple-300 dark:border-gray-600 dark:bg-blue-800 dark:peer-focus:ring-cyan-800"
      />
      <span class="ml-3 text-sm font-medium">RU</span>
    </label>
  </header>
</template>
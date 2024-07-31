<script setup>
import { resolveComponent, computed } from 'vue'
const isLink = resolveComponent('RouterLink')
const props = defineProps({
  to: {
    type: [String, Object],
    default: null
  },
  main: Boolean,
  sec: Boolean,
  border: Boolean,
  next: Boolean,
  prev: Boolean,
  clear: Boolean,
  disabled: Boolean
})
const isComponent = computed(() => (props.to ? isLink : 'button'))
const isType = computed(() => (isComponent.value != 'button' ? null : 'button'))
const isClass = computed(() => {
  return {
    btn__main: props.main,
    btn__sec: props.sec,
    btn__next: props.next,
    btn__prev: props.prev,
    btn__clear: props.clear,
    btn__link: props.to,
    btn__disabled: props.disabled
  }
})
</script>
<template>
  <KeepAlive>
    <component
      :is="isComponent"
      :type="isType"
      :disabled="disabled ? true : null"
      :to="to"
      class="btn"
      :class="[{ group: next || prev }, isClass]"
      :aria-disabled="disabled ? true : null"
    >
      <slot />
    </component>
  </KeepAlive>
</template>
<style lang="postcss" scoped>
.btn {
  @apply inline-flex items-center justify-center gap-1.5;
  @apply py-1.5 px-3;
  @apply w-full md:w-auto;
  @apply text-base shadow font-normal;
  @apply transition-all duration-300;
  @apply disabled:isolate disabled:opacity-70 disabled:pointer-events-none disabled:cursor-not-allowed;
  @apply hover:text-black;
  &__disabled {
    @apply disabled:isolate disabled:opacity-70 disabled:pointer-events-none disabled:cursor-not-allowed;
    @apply opacity-70 pointer-events-none;
  }
  &__main {
    @apply text-white hover:text-white;
    @apply border border-solid;
    @apply bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800;

    @apply rounded-md;
  }

  &__sec {
    @apply bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800;
    @apply border border-solid;

    @apply rounded-md;
  }

  &__prev,
  &__next {
    @apply gap-x-1;
  }

  &__clear {
    @apply w-auto shadow-none;
  }
}
</style>

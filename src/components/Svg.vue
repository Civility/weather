<script setup>
defineProps({
  svg: {
    type: Boolean,
    default: false
  }
})
</script>
<template>
  <component :is="svg" class="fill-white" role="img" />
</template>

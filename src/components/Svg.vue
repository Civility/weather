<script setup>
defineProps({
  svg: Object
})
</script>
<template>
  <component :is="svg" class="fill-white" role="img" />
</template>

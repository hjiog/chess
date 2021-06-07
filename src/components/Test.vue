<template>
  <h1>Test</h1>
  <div>{{ a }}</div>
  <div>{{ props.a }}</div>
</template>

<script setup lang='ts'>
import { inject, defineProps } from 'vue'
const a = inject<{value: number}>('a')
const props = defineProps({ a: Number })
console.log(a, props, '99999')
</script>

<script setup>
import { ref } from 'vue'

const printedText = ref('')

window.setPrintedText = (text) => {
  printedText.value = text
}
</script>

<template>
  <div>{{ printedText }}</div>
  <h1>hi</h1>
</template>

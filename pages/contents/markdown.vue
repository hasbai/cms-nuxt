<template>
  <main>
    <textarea v-model="text"></textarea>
    <div>{{ result }}</div>
  </main>
</template>

<script setup lang="ts">
import MarkdownIt from 'markdown-it'

definePageMeta({
  keepalive: true
})

let md: any = new MarkdownIt().disable('escape')
const text = ref(`# Hello, Markdown!`)
const result = computed(() => md.render(text.value))
</script>


<style scoped>


</style>
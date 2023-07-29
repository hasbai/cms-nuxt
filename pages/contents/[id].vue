<template>
  <main>
    <h1 class="h1 text-center">{{ content.title }}</h1>
    <div class="flex flex-wrap space-x-2 space-y-0.5 items-center mb-4">
      <TagBadge v-for="tag in content.tags" :key="tag.id" :tag="tag"/>
    </div>
    <article class="prose prose-slate pb-16" v-html="result"></article>
    <nuxt-link :to="`/edit/${route.params.id}`"
               class="fixed bottom-8 right-8 btn btn-lg btn-circle btn-primary">
      <Icon name="fa:pencil" size="1.5rem"/>
    </nuxt-link>
  </main>
</template>

<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import {getSingle, myFetch} from "@/composables/myFetch";
import {Content} from "@/models";
import TagBadge from "@/components/TagBadge.vue";

let md: any = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
  highlight: (str: string, lang: string) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre><code class="language-${lang} hljs">` +
            hljs.highlight(str, {language: lang, ignoreIllegals: true}).value +
            '</code></pre>';
      } catch (__) {
      }
    }

    return '<pre><code class="language-none hljs">' + md.utils.escapeHtml(str) + '</code></pre>';
  }
})
const route = useRoute()
const {data} = await myFetch<Content>(`/contents`, {
  headers: getSingle,
  query: {
    id: `eq.${route.params.id}`,
    select: '*,tags(*)'
  }
})
const content = data.value as Content
const result = md.render(content.text)
</script>


<style scoped>

</style>
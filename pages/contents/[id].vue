<template>
  <main>
    <div class="flex flex-wrap space-x-2 space-y-0.5 items-center">
      <TagBadge v-for="tag in content.tags" :key="tag.id" :tag="tag"/>
    </div>
    <h1 class="h1 text-center">{{ content.title }}</h1>
    <AuthorCard class="mb-8" :author="toRaw(content.authors!)"></AuthorCard>
    <article class="prose prose-slate pb-16" v-html="result"></article>
    <nuxt-link :to="`/edit/${route.params.id}`"
               class="fix btn btn-lg btn-circle btn-primary">
      <Icon name="ic:baseline-edit" size="1.5rem"/>
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
    select: '*,tags(*),authors(*)'
  }
})

const content = toRaw<Content>(data.value!)
const result = md.render(content.text)
</script>


<style scoped>


</style>
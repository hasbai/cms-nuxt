<template>
  <main>
    <transition-group name="list">
      <ContentCard
          v-for="content in store.contents"
          :key="content.id"
          :content="content"
      />
    </transition-group>
    <nuxt-link to="/edit">
      <button class="fix btn btn-lg btn-circle btn-primary">
        <Icon name="ic:baseline-edit" size="1.5rem"/>
      </button>
    </nuxt-link>
  </main>
</template>

<script lang="ts" setup>
import {mainStore} from "@/utils/store";
import {myFetch} from "@/composables/myFetch";
import {Content} from "@/models";

const store = mainStore()
// onMounted(() => {
//   // if (store.contents.length > 0) return
//   store.loadContents()
//   console.log('mounted', store.contents)
// })

const {data} = await myFetch('/contents?order=id.desc')
store.contents = toRaw(data.value) as Content[]

</script>

<style scoped>

</style>

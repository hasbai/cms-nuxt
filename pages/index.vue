<template>
  <main>
    <transition-group name="list">
      <ContentCard
          v-for="content in store.contents"
          :key="content.id"
          :content="content"
      />
    </transition-group>
    <!--        <nuxt-link to="/edit">-->
    <!--          <v-btn class="fixed-btn" icon size="large">-->
    <!--            <mdi-pencil-outline/>-->
    <!--          </v-btn>-->
    <!--        </nuxt-link>-->
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

<template>
  <div class="flex flex-row items-center">
    <div class="avatar placeholder w-12 rounded-full">
      <div v-if="success">
        <img class="rounded-full" :src="gravatar" alt="avatar" @error="onError"/>
      </div>
      <div v-else class="w-16 items-center bg-neutral-focus text-neutral-content rounded-full">
        <div class="text-2xl whitespace-nowrap">{{ author?.name }}</div>
      </div>
    </div>
    <div class="text-center ml-2">
      <span>{{ author?.name }}</span>
      <br>
      <span class="lowercase">{{ author?.email }}</span>
    </div>
  </div>
</template>


<script setup lang="ts">
import type {Author} from "@/models";
import md5 from 'md5'

const {author} = defineProps<{ author: Author }>()
const gravatar = computed(() => `https://www.gravatar.com/avatar/${md5(author.email)}?d=404`)

const success = ref(true)

const onError = () => {
  success.value = false
}
</script>

<style scoped>

</style>
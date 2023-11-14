<template>
  <div class="flex flex-row my-6 w-full">
    <div class="date mr-4">
      <div class="day">
        {{ cratedAt.substring(8, 10) }}
      </div>
      <div class="small">
        {{ cratedAt.substring(5, 7) }}/{{ cratedAt.substring(2, 4) }}
      </div>
    </div>
    <div class="content-container relative flex flex-1">
      <nuxt-link
          :to="`/contents/${content.id}`"
          :style="{transform: `translateX(${translateX}px)`}"
          class="content relative z-10 flex flex-1 items-center hover:shadow-lg"
          @touchend="onMove" @touchmove="onMove" @touchstart="onMove"
      >
        <div class="line-clamp-3">
          {{ content.text }}
        </div>
      </nuxt-link>
      <div :class="{'delete': isDelete, 'archive': isArchive}"
           class="bottom flex justify-between items-center">
        <Icon name="mdi:delete-outline" size="1.5rem" v-if="isDelete"/>
        <div v-else></div>
        <Icon name="mdi:archive-arrow-down-outline" size="1.5rem" v-if="isArchive"/>
        <div v-else></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {Content} from '@/models'
import {computed} from "vue";
import {mainStore} from "@/utils/store";

const {content} = defineProps<{ content: Content }>()
const cratedAt = new Date(content.created_at).toISOString()

const translateX = ref(0)
let startX = 0
let width = ref(0)
const isDelete = computed(() => translateX.value > 0)
const isArchive = computed(() => translateX.value < 0)

function onMove(e: TouchEvent) {
  switch (e.type) {
    case 'touchstart':
      startX = e.touches[0].clientX
      width.value = document.querySelector('.content')!.clientWidth
      break
    case 'touchmove':
      translateX.value = e.touches[0].clientX - startX
      break
    case 'touchend':
      if (translateX.value > width.value / 2) {
        deleteContent()
      } else if (translateX.value < -width.value / 2) {
        archiveContent()
      } else {
        translateX.value = 0
      }
      break
  }
}

const store = mainStore()

async function deleteContent() {
  const timer = setInterval(() => {
    translateX.value += 1
  }, 10)
  await store.deleteContent(content.id!)
  clearInterval(timer)
}

async function archiveContent() {
  await store.archiveContent(content.id!)
  translateX.value = 0
}


</script>

<style scoped>
.day {
  font-size: 1.25em;
  font-weight: bold;
}

.small {
  font-size: 0.9em;
  color: rgb(128, 128, 128);
}

@media (min-width: 768px) {
  .content-container:hover .hover {
    display: flex;
  }
}

.hover button {
  height: 2.5rem;
  width: 2.5rem;
}

.content {
  background: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  white-space: pre-wrap;
}

.delete {
  background: rgb(255, 0, 0, 0.2);
}

.archive {
  background: rgb(0, 255, 0, 0.2);
}

.bottom {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 0 1rem;
  border-radius: 0.5rem;
}

.bottom svg {
  font-size: 1.2rem;
}
</style>
<template>
  <div class="tag-input">
    <div class="flex flex-wrap items-center mb-2">
      <TagBadge class="mx-0.5 my-0.5 cursor-pointer" @click.stop="select(tag, true)"
                v-for="tag in selectedTags" :key="tag.id" :tag="tag" cnt/>
      <button class="btn btn-xs" @click.stop="showInputCallback">
        Add Tag
      </button>
    </div>
    <Transition name="fade">
      <div v-show="showInput" class="relative">
        <div class="absolute w-full">
          <input type="text" v-model="query" @click.stop
                 class="input w-full" @keyup.enter.stop="addTag"
          >
          <Icon name="material-symbols:search" size="1.5em" class="absolute right-3 top-3"/>
          <TransitionGroup name="list" tag="ul"
                           class="max-h-60 w-full overflow-auto no-scrollbar rounded-lg bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 sm:text-sm"
          >
            <li v-if="filteredTags.length === 0 && query !== ''">
              <div @click.stop="addTag">
                Press <kbd class="kbd kbd-sm">Enter</kbd> to create a new tag.
              </div>
            </li>
            <li
                v-for="tag in filteredTags"
                :key="tag.id"
            >
              <div @click.stop="select(tag)" class="cursor-pointer w-full">
                <TagBadge :tag="tag" cnt/>
              </div>
            </li>
          </TransitionGroup>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import {type Tag} from "@/models";
import TagBadge from "@/components/TagBadge.vue";
import {returnSingle} from "@/composables/myFetch";

const tags = await $myFetch<Tag[]>('/tags')

const emit = defineEmits(["update:modelValue"])
const {modelValue} = defineProps<{ modelValue: Tag[] }>();
const selectedTags = reactive(new Set(modelValue))
const selected = (tag: Tag) => selectedTags.has(tag)
const select = (tag: Tag, del = false) => {
  if (del || selected(tag)) {
    selectedTags.delete(tag)
  } else {
    selectedTags.add(tag)
  }
  emit('update:modelValue', Array.from(selectedTags))
}

const query = ref('')
const filteredTags = computed(() => query.value
    ? tags.filter((tag) => !selectedTags.has(tag) && tag.name.includes(query.value))
    : tags.filter((tag) => !selectedTags.has(tag))
)

const showInput = ref(false)
const showInputCallback = () => {
  showInput.value = !showInput.value
  if (showInput.value) {
    nextTick(
        () => document.querySelector<HTMLInputElement>('.tag-input input')?.focus()
    )
  }
}
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (showInput.value) {
      showInput.value = false
    }
  })
})
const addTag = async () => {
  const {data} = await myFetch('/tags', {
    method: 'POST',
    body: JSON.stringify({
      name: query.value,
    }),
    headers: returnSingle
  })
  const tag = data.value as Tag
  tags.push(tag)
  select(tag)
  query.value = ''
}
</script>
